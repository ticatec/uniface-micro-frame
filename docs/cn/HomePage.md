# HomePage (主页)

`HomePage.svelte` 组件是一个专用的入口点，用于加载到 `iframe` 内的微前端模块。它负责处理与宿主应用集成所需的初始通信和设置。

**注意:** `AppModule` 是一个单例，应该在您应用的根部进行初始化，而不是由该组件创建。`HomePage` 的作用是接收初始数据并触发首次页面导航。

## 设计目的

当一个微前端在 `iframe` 中运行时，`HomePage` 帮助实现：
1.  从父窗口（宿主）接收初始数据负载。
2.  通知宿主它已成功加载。
3.  使用初始数据显示第一个相关页面，这通过全局的 `AppModule` 完成。

## 工作原理

1.  组件监听来自父窗口的 `message` 事件。
2.  它期望消息的 `data` 中包含要显示的页面和使用的参数等信息。
3.  它调用 `AppModule.showPage()` 将第一个页面推入堆栈。
4.  它向宿主发回一条消息，以确认初始化已完成。

## 如何使用

`HomePage` 通常用作 `iframe` 主入口点路由的根组件。

```svelte
<!-- src/routes/my-module-main/+page.svelte -->
<script lang="ts">
    import HomePage from '@ticatec/uniface-micro-frame/HomePage';
    import AppModule from '@ticatec/uniface-micro-frame/AppModule';
    import UserDetailPage from './UserDetailPage.svelte';

    // 此函数将来自宿主的页面名称映射到实际的组件
    function getComponent(pageName: string) {
        if (pageName === 'USER_DETAIL') {
            return UserDetailPage;
        }
        return null;
    }

    // HomePage 接收到消息后会调用此函数
    function handleHostMessage(props: any) {
        const component = getComponent(props.page);
        if (component) {
            // 使用全局的 AppModule 来显示第一个页面
            AppModule.showPage(component, props.params);
        }
    }
</script>

<!--
  onMessage prop 是一个回调函数，
  当从宿主应用发送的数据到达时将被触发。
-->
<HomePage onMessage={handleHostMessage} />
```

在这个设置中：
-   宿主应用在一个 `iframe` 中加载此页面。
-   宿主发送一条消息，例如 `{ page: 'USER_DETAIL', params: { id: '123' } }`。
-   `HomePage` 接收到消息并调用 `handleHostMessage`。
-   `handleHostMessage` 找到正确的组件，并使用全局的 `AppModule` 来显示它。

## 组件属性 (Props)

-   `onMessage: (props: any) => void`: 一个回调函数，当从宿主应用接收到数据时被触发。**(必需)**
-   `indicator?: string`: 在模块等待宿主初始消息时显示的提示信息。