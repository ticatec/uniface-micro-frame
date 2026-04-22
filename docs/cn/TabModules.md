# 多模块: TabModules (标签页模块)

`multiple-modules/TabModules.svelte` 组件提供了一个简单的标签页布局，用于显示不同的内容面板。

**注意:** 该组件最初是为一个已不存在的多模块系统设计的。它现在用作一个通用的标签页容器。

## 设计目的

使用此组件来创建一个标签页界面，其中每个标签页可以显示不同的 Svelte 组件或内容。它管理标签的视觉状态，但由您来控制为活动标签页显示哪个内容。

## 如何使用

您需要提供一个标签页定义的数组，然后使用 `activeTabId` 来条件性地渲染所选标签页的内容。

```svelte
<script lang="ts">
    import TabModules from '@ticatec/uniface-app-component/multiple-modules/TabModules.svelte';
    import UserTabContent from './UserTabContent.svelte';
    import ProductTabContent from './ProductTabContent.svelte';

    const tabs = [
        { id: 'users', title: '用户管理' },
        { id: 'products', title: '产品目录' }
    ];

    let activeTabId = 'users';
</script>

<TabModules
    {tabs}
    bind:activeTabId
/>

<div class="tab-content">
    {#if activeTabId === 'users'}
        <UserTabContent />
    {:else if activeTabId === 'products'}
        <ProductTabContent />
    {/if}
</div>
```

## 组件属性 (Props)

-   `tabs: { id: string, title: string }[]`: 标签页定义对象的数组。**(必需)**
-   `activeTabId: string`: 当前活动标签页的 `id`。可以与 `bind:` 配合使用，以控制或响应标签页的变化。**(必需)**
-   `closable?: boolean`: 如果为 `true`，每个标签页上将显示一个关闭图标。默认为 `false`。

## 事件 (Events)

-   `on:close`: 当用户点击标签页上的关闭图标时触发。事件的 `detail` 包含了要关闭的标签页的 `id`。您需要负责从 `tabs` 数组中移除相应的项目。