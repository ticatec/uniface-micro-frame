# Multiple Modules: TabModules

The `multiple-modules/TabModules.svelte` component provides a simple, tabbed layout for displaying different content panes.

**Note:** This component was originally designed for a multi-module system that is no longer present. It now functions as a generic tab container.

## Purpose

Use this component to create a tabbed interface where each tab can display different Svelte components or content. It manages the visual state of the tabs, but you control which content is shown for the active tab.

## How to Use

You provide an array of tab definitions and then use the `activeTabId` to conditionally render the content for the selected tab.

```svelte
<script lang="ts">
    import TabModules from '@ticatec/uniface-app-component/multiple-modules/TabModules.svelte';
    import UserTabContent from './UserTabContent.svelte';
    import ProductTabContent from './ProductTabContent.svelte';

    const tabs = [
        { id: 'users', title: 'User Management' },
        { id: 'products', title: 'Product Catalog' }
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

## Component Props

-   `tabs: { id: string, title: string }[]`: An array of tab definition objects. **(Required)**
-   `activeTabId: string`: The `id` of the currently active tab. This can be used with `bind:` to control or respond to tab changes. **(Required)**
-   `closable?: boolean`: If `true`, a close icon will appear on each tab. Defaults to `false`.

## Events

-   `on:close`: Fired when a user clicks the close icon on a tab. The event `detail` contains the `id` of the tab to be closed. You are responsible for removing the corresponding item from the `tabs` array.