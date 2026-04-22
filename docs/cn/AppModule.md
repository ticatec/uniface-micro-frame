# AppModule

`AppModule` 类是一个单例控制器，用于管理应用程序中的页面栈。它通过简单的基于栈的方法提供集中式导航控制，页面可以按照 LIFO（后进先出）的顺序添加和移除。

## 用途

- **集中式页面管理**：单例模式确保有一个全局可访问的实例来管理页面栈
- **基于栈的导航**：使用 `append` 和 `pop` 操作实现直观的导航流程（推入新页面，弹出返回）
- **变更通知**：当页面栈发生变化时自动通知监听器，支持响应式 UI 更新
- **唯一页面标识**：每个页面都获得一个唯一 ID 用于跟踪和管理

## 架构

该模块使用私有数组维护页面栈，并在栈发生变化时执行回调函数。页面被表示为包含 Svelte 组件、可选参数和唯一标识符的 `ModulePage` 对象。

## 初始化

`AppModule` 遵循单例模式，使用前必须初始化：

```typescript
import AppModule, { type PagesChangeListener } from '@ticatec/uniface-micro-frame/AppModule';

// 在应用程序根目录中初始化一次
const handlePageChange: PagesChangeListener = (pages) => {
    console.log('页面栈已更改:', pages);
    // 在此更新 UI 状态
};

AppModule.initialize(handlePageChange);
```

## 基本用法

### 添加页面

```typescript
import AppModule from '@ticatec/uniface-micro-frame/AppModule';
import MyComponent from './MyComponent.svelte';

// 静态方法 - 最常见的方法
AppModule.showPage(MyComponent, { userId: 123 });
```

### 移除页面

```typescript
// 移除最近的页面
AppModule.closeActivePage();
```

### 完整示例

```svelte
<script lang="ts">
    import AppModule from '@ticatec/uniface-micro-frame/AppModule';
    import UserDetailPage from './UserDetailPage.svelte';
    import SettingsPage from './SettingsPage.svelte';

    function openUserDetail() {
        AppModule.showPage(UserDetailPage, { 
            userId: 42,
            mode: 'edit' 
        });
    }

    function openSettings() {
        AppModule.showPage(SettingsPage);
    }

    function goBack() {
        AppModule.closeActivePage();
    }
</script>

<nav>
    <button on:click={openUserDetail}>查看用户</button>
    <button on:click={openSettings}>设置</button>
    <button on:click={goBack}>返回</button>
</nav>
```

## API 参考

### 静态方法

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `initialize()` | `onPageChange: PagesChangeListener` | `void` | 使用变更监听器初始化单例实例 |
| `getInstance()` | - | `AppModule` | 返回单例实例 |
| `showPage()` | `component: any, params?: any` | `void` | 向栈中添加新页面 |
| `closeActivePage()` | - | `void` | 从栈中移除最近的页面 |

### 实例方法

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `append()` | `component: any, params?: any` | `string` | 向栈中添加页面并返回唯一页面 ID |
| `pop()` | - | `void` | 从栈中移除顶部页面 |

## 类型定义

### PagesChangeListener
```typescript
type PagesChangeListener = (pages: Array<ModulePage>) => void;
```
在栈发生变化时接收更新的页面数组的回调函数。

### ModulePage
```typescript
interface ModulePage {
    id: string;                    // 唯一页面标识符
    component: ComponentType;      // Svelte 组件构造函数
    params?: any;                  // 传递给组件的可选参数
}
```

### ComponentType
```typescript
type ComponentType = new (...args: any[]) => SvelteComponent;
```
表示 Svelte 组件构造函数的类型。

## 实现详情

### 页面 ID 生成
每个页面都会收到使用以下模式生成的唯一 ID：
```typescript
`page_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
```

### 错误处理
- 如果没有为 `append()` 提供组件则抛出错误
- 在空栈上调用 `pop()` 是安全的（无操作）

### 内存管理
- 页面存储在简单的数组结构中
- 当页面被弹出时，它们会从内存中移除
- 每次栈修改后都会调用变更监听器

## 集成模式

### 与页面组件
页面组件通常通过其属性接收参数：

```svelte
<!-- UserDetailPage.svelte -->
<script lang="ts">
    export let userId: number;
    export let mode: string = 'view';
</script>

<h1>用户 {userId} - {mode} 模式</h1>
```

### 与导航守卫
您可以在变更监听器中实现导航守卫：

```typescript
const handlePageChange = (pages: ModulePage[]) => {
    if (pages.length > 10) {
        console.warn('检测到深层导航');
    }
    // 更新 UI 状态
    currentPages = pages;
};
```