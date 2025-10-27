# Uniface 微前端框架

[![npm version](https://badge.fury.io/js/@ticatec%2Funifacemicro-frame.svg)](https://www.npmjs.com/package/@ticatec/uniface-micro-frame)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

基于 Svelte 5 构建的强大微前端框架，专为开发具有 iframe 微前端架构的模块化 Web 应用程序而设计。

## 概述

Uniface 微前端框架提供了：
- **微前端支持** - 应用程序在 iframe 容器中运行
- **动态路由** - 基于哈希的单页应用程序路由系统
- **模块管理** - 基于栈的页面管理与生命周期控制
- **UI 组件** - 预构建的页面布局和表单组件
- **国际化** - 内置 i18n 支持
- **类型安全** - 完整的 TypeScript 支持

## 安装

```bash
npm install @ticatec/uniface-micro-frame
```

## 快速开始

### 1. 基础设置

```typescript
import HomePage from '@ticatec/uniface-micro-frame';
import type { ModuleInitialize } from '@ticatec/uniface-micro-frame';

// 定义你的路由
const routes = {
  '/': () => import('./components/Dashboard.svelte'),
  '/users': () => import('./components/UserList.svelte'),
  '/settings': () => import('./components/Settings.svelte')
};

// 可选的模块初始化
const initializeModule: ModuleInitialize = async () => {
  // 在此处初始化你的模块
  console.log('模块已初始化');
};
```

### 2. 应用组件

```svelte
<script lang="ts">
  import HomePage from '@ticatec/uniface-micro-frame';
  
  export let routes;
  export let initializeModule;
</script>

<HomePage {routes} {initializeModule} />
```

## 核心功能

### 页面管理

框架通过 `AppModule` 类提供基于栈的页面管理系统：

```typescript
import { AppModule } from '@ticatec/uniface-micro-frame/module';

// 显示新页面
AppModule.showPage(MyComponent, { param1: 'value' });

// 关闭当前页面
AppModule.closeActivePage();
```

### 页面组件

#### CommonPage
具有页眉、内容区域和可选侧边栏的基本页面布局：

```svelte
<script>
  import { CommonPage } from '@ticatec/uniface-micro-frame';
  
  const pageAttrs = {
    title: '我的页面',
    comment: '页面描述'
  };
</script>

<CommonPage {pageAttrs} canBeClosed={true}>
  <div slot="sidebar">
    <!-- 侧边栏内容 -->
  </div>
  
  <div slot="header-ext">
    <!-- 页眉扩展 -->
  </div>
  
  <!-- 主要内容 -->
  <div>页面内容在这里</div>
</CommonPage>
```

#### CommonFormPage
带有内置操作栏的增强表单页面布局：

```svelte
<script>
  import { CommonFormPage } from '@ticatec/uniface-micro-frame/CommonFormPage';
  
  const pageAttrs = {
    title: '编辑表单',
    comment: '编辑用户信息'
  };
  
  const actions = [
    { label: '保存', type: 'primary', handler: saveForm },
    { label: '重置', type: 'secondary', handler: resetForm }
  ];
</script>

<CommonFormPage {pageAttrs} {actions}>
  <!-- 表单内容 -->
  <form>
    <!-- 表单字段 -->
  </form>
</CommonFormPage>
```

### 路由系统

框架使用基于哈希的路由和动态导入：

```typescript
// 带参数的路由定义
const routes = {
  '/users/:id': () => import('./UserDetail.svelte'),
  '/posts/:category/:slug': () => import('./PostView.svelte')
};

// 在组件中访问路由参数
export let id; // 路由参数
export let category; // 路由参数
export let slug; // 路由参数
```

### 模块初始化

实现 `ModuleInitialize` 接口进行自定义模块设置：

```typescript
import type { ModuleInitialize } from '@ticatec/uniface-micro-frame';

const initializeModule: ModuleInitialize = async () => {
  // 设置 API 客户端
  await setupApiClient();
  
  // 初始化存储
  initializeGlobalStores();
  
  // 配置第三方库
  configureLibraries();
};
```

## 架构

### 框架结构

```
src/lib/
├── HomePage.svelte          # 主入口组件
├── common/                  # 通用工具和类型
│   ├── ModuleInitialize.ts  # 模块初始化接口
│   ├── PageAttrs.ts         # 页面属性类型
│   └── PageInitialize.ts    # 页面初始化工具
├── module/                  # 模块管理
│   ├── AppModule.ts         # 核心模块管理器
│   ├── ModuleHome.svelte    # 模块主容器
│   └── PageLoader.ts        # 动态页面加载器
├── pages/                   # 预构建页面组件
│   ├── CommonPage.svelte    # 基本页面布局
│   ├── CommonFormPage.svelte # 表单页面布局
│   ├── InvalidPage.svelte   # 404 错误页面
│   └── NotInFramePage.svelte # 框架检测页面
└── i18nRes/                 # 国际化
    └── i18nRes.ts          # 资源定义
```

### 关键概念

1. **基于 Iframe 的架构**：应用程序设计为在 iframe 容器中运行以实现真正的隔离
2. **基于栈的页面**：页面在栈中管理，允许类似模态框的覆盖效果
3. **动态加载**：根据路由动态加载组件
4. **类型安全**：完整的 TypeScript 支持和适当的类型定义

## 样式

导入框架的 CSS 以获得正确的样式：

```css
@import '@ticatec/uniface-micro-frame/uniface-micro-frame.css';
```

或使用 SCSS 源码进行自定义：

```scss
@import '@ticatec/uniface-micro-frame/src/lib/uniface-micro-frame.scss';
```

## 依赖项

### 对等依赖
- **Svelte 5.x** - 框架为 Svelte 5 构建

### 核心依赖
框架与 Uniface 生态系统集成：
- `@ticatec/uniface-element` - UI 组件库
- `@ticatec/i18n` - 国际化工具
- `@ticatec/enhanced-utils` - 增强工具函数

## 开发

### 构建包

```bash
npm run build
```

### 开发服务器

```bash
npm run dev
```

### 类型检查

```bash
npm run check
```

## 许可证

MIT

## 作者

Henry Feng

---

有关更多信息和高级使用示例，请参考包中包含的源代码和类型定义。