# 模块: ModuleHome (模块主页)

`module/ModuleHome.svelte` 组件是 `AppModule` 单例的主 UI 渲染器。它负责显示当前由 `AppModule` 管理的页面堆栈。

## 设计目的

`ModuleHome` 是页面堆栈的可视化表现。它被设计用来放置在您的主应用布局中。它会自动：
-   监听 `AppModule` 页面堆栈的变化。
-   渲染当前堆栈中每个页面的组件。
-   将来自 `AppModule.showPage()` 的任何参数作为 props 传递给相应的组件。

该组件有效地创建了用户所见的视觉导航堆栈。

## 如何使用

将 `ModuleHome` 放置在您应用布局的中心位置，例如根 `+layout.svelte`。它不需要任何 props，因为它直接从 `AppModule` 单例获取页面堆栈。

1.  **初始化 AppModule 并放置 ModuleHome**

    ```svelte
    <!-- src/routes/+layout.svelte -->
    <script lang="ts">
        import AppModule from '@ticatec/uniface-micro-frame/AppModule';
        import ModuleHome from '@ticatec/uniface-micro-frame/module/ModuleHome';

        // 在您应用的生命周期中初始化单例一次
        AppModule.initialize(pages => {
            console.log('页面已更改:', pages.length);
        });
    </script>

    <main>
        <!--
          ModuleHome 将在此处渲染页面堆栈。
          当您调用 AppModule.showPage() 时，新组件将出现。
          当您调用 AppModule.closeActivePage() 时，它们将被移除。
        -->
        <ModuleHome />
    </main>
    ```

2.  **从另一个组件进行导航**

    ```svelte
    <!-- src/components/MyButton.svelte -->
    <script lang="ts">
        import AppModule from '@ticatec/uniface-micro-frame/AppModule';
        import SomePageComponent from './SomePageComponent.svelte';
    </script>

    <button on:click={() => AppModule.showPage(SomePageComponent)}>
        显示页面
    </button>
    ```

## 组件属性 (Props)

该组件不接受任何 props。它直接与 `AppModule` 单例通信。