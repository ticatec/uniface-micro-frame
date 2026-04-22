# CommonPage

`CommonPage.svelte` 组件为应用程序页面提供基础布局。它作为其他专用页面类型（如 `CommonFormPage`）的基础组件，提供一致的页面结构，包括标题管理、导航和关闭确认功能。

## 用途

此组件提供：

-   **标准页面布局**：基于 `@ticatec/uniface-element` 的 `Page` 组件构建
-   **标题和注释显示**：可配置的页面标题和可选的副标题/注释
-   **关闭功能**：可选的返回/关闭导航，支持确认功能
-   **灵活的内容区域**：主内容区域和可选的侧边栏支持
-   **标题扩展**：可扩展的标题区域，用于自定义控件和操作
-   **自定义样式**：支持页面特定的 CSS 样式

## 使用示例

```svelte
<script lang="ts">
    import CommonPage from '@ticatec/uniface-micro-frame/CommonPage';
    import type { PageAttrs } from '@ticatec/uniface-micro-frame/common';
    import AppModule from '@ticatec/uniface-micro-frame/AppModule';

    const page$attrs: PageAttrs = {
        title: "设置",
        comment: "管理您的应用程序偏好设置",
        style: "background-color: #f5f5f5;"
    };

    const closeConfirm = async (): Promise<boolean> => {
        // 检查未保存的更改
        return confirm('确定要离开此页面吗？');
    };

    function handleClose() {
        // 使用 AppModule 关闭此页面
        AppModule.closeActivePage();
    }
</script>

<CommonPage 
    {page$attrs}
    canBeClosed={true}
    {closeConfirm}
    round={true}
    shadow={true}
>
    <div slot="sidebar">
        <!-- 可选的侧边栏内容 -->
        <nav>
            <ul>
                <li>常规</li>
                <li>安全</li>
                <li>隐私</li>
            </ul>
        </nav>
    </div>

    <div slot="header-ext">
        <!-- 可选的标题扩展 -->
        <button>帮助</button>
    </div>

    <!-- 主内容 -->
    <div class="page-content">
        <h2>常规设置</h2>
        <p>在此配置您的基本偏好设置。</p>
    </div>
</CommonPage>

<style>
    .page-content {
        padding: 20px;
    }
</style>
```

## 属性

| 属性 | 类型 | 默认值 | 必需 | 描述 |
|------|------|---------|----------|-------------|
| `page$attrs` | `PageAttrs` | - | ✓ | 页面配置，包括标题、注释和样式 |
| `content$style` | `string` | `''` | ✗ | 主内容区域的自定义 CSS 样式 |
| `canBeClosed` | `boolean` | `false` | ✗ | 是否显示返回/关闭按钮并启用关闭功能 |
| `closeConfirm` | `CloseConfirm \| null` | `null` | ✗ | 关闭页面前调用的异步函数 |
| `reload` | `any` | `null` | ✗ | 重新加载功能（传递给底层 Page 组件） |
| `round` | `boolean` | `false` | ✗ | 是否为页面应用圆角 |
| `shadow` | `boolean` | `false` | ✗ | 是否为页面应用阴影效果 |

## 插槽

| 插槽 | 描述 |
|------|-------------|
| `default` | 具有灵活布局的主页面内容区域 |
| `sidebar` | 位于左侧的可选侧边栏内容 |
| `header-ext` | 用于自定义控件和操作的标题扩展区域 |

## 方法

### `closePage()`
处理关闭确认过程的内部方法。当用户尝试通过返回/关闭按钮关闭页面时，会自动调用此方法。不应从应用程序代码直接调用。

**注意**：要以编程方式关闭页面，请使用 `AppModule.closeActivePage()` 而不是直接调用此方法。

```ts
// 以编程方式关闭页面的正确方法
import AppModule from '@ticatec/uniface-micro-frame/AppModule';
AppModule.closeActivePage();
```

## 类型定义

### PageAttrs
```ts
interface PageAttrs {
    style?: string;     // 页面的自定义 CSS 样式
    title: string;      // 页面标题（必需）
    comment?: string;   // 可选的副标题/描述
}
```

### CloseConfirm
```ts
type CloseConfirm = () => Promise<boolean>;
```
- 返回 `Promise<boolean>`，其中 `true` 允许关闭，`false` 阻止关闭
- 当用户尝试关闭页面时调用
- 用于检查未保存的更改或其他确认逻辑

## 组件结构

组件渲染以下布局结构：

1. **页面容器** - 带有标题和导航的基础 `Page` 组件
2. **侧边栏**（可选）- 固定宽度的左侧边栏，隐藏溢出内容
3. **主内容区域** - 占用剩余空间的灵活内容区域
4. **标题扩展** - 位于页面标题中，用于附加控件

## 布局详情

- **侧边栏**：`flex: 0 0 auto` - 固定大小，不增长/缩小，位于左侧
- **主内容**：`flex: 1 1 auto` - 增长以填充可用空间，如有需要可缩小
- **标题扩展**：使用 `flex: 0 0 auto` 定位并与其他标题元素对齐

## 与 AppModule 的集成

组件与 AppModule 集成进行页面管理：

- 当 `canBeClosed` 为 true 时，页面显示返回/关闭按钮
- 点击返回/关闭按钮触发内部 `closePage()` 方法
- 如果提供了 `closeConfirm`，会首先调用它来确认操作
- 确认后，调用 `AppModule.closeActivePage()` 从栈中移除页面
- **重要**：应用程序代码应直接使用 `AppModule.closeActivePage()`，而不是调用组件的 `closePage()` 方法

## 继承

此组件作为其他页面组件的基础：
- `CommonFormPage` 扩展此组件以添加表单特定功能
- 其他专用页面类型可以基于此基础组件构建

## 样式说明

- 组件使用 `box-sizing: border-box` 以确保一致的尺寸
- 内容区域配置为 `overflow: hidden` 以确保正确的布局约束
- 可通过 `page$attrs.style` 属性应用自定义样式
- 可通过 `content$style` 属性应用额外的内容样式