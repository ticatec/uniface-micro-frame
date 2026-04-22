# HomePage

The `HomePage.svelte` component is a specialized entry point for a micro-frontend module that is loaded inside an `iframe`. It handles the initial communication and setup required to integrate the module with its host application.

**Note:** The `AppModule` is a singleton and should be initialized in the root of your application, not created by this component. `HomePage`'s role is to receive initial data and trigger the first page navigation.

## Purpose

When a micro-frontend is run inside an `iframe`, `HomePage` helps to:
1.  Receive an initial data payload from the parent window (the host).
2.  Signal to the host that it has loaded successfully.
3.  Use the initial data to show the first relevant page using the global `AppModule`.

## How It Works

1.  The component listens for a `message` event from the parent window.
2.  It expects the message `data` to contain information about what page to show and what parameters to use.
3.  It calls `AppModule.showPage()` to push the first page onto the stack.
4.  It sends a message back to the host to confirm that initialization is complete.

## How to Use

The `HomePage` is typically used as the root component of a route that serves as the main entry point for the `iframe`.

```svelte
<!-- src/routes/my-module-main/+page.svelte -->
<script lang="ts">
    import HomePage from '@ticatec/uniface-micro-frame/HomePage';
    import AppModule from '@ticatec/uniface-micro-frame/AppModule';
    import UserDetailPage from './UserDetailPage.svelte';

    // This function maps a page name from the host to an actual component
    function getComponent(pageName: string) {
        if (pageName === 'USER_DETAIL') {
            return UserDetailPage;
        }
        return null;
    }

    // This function is called by HomePage after it receives the message
    function handleHostMessage(props: any) {
        const component = getComponent(props.page);
        if (component) {
            // Use the global AppModule to show the first page
            AppModule.showPage(component, props.params);
        }
    }
</script>

<!--
  The onMessage prop is the callback that will be triggered
  with the data sent from the host application.
-->
<HomePage onMessage={handleHostMessage} />

```

In this setup:
-   The host application loads this page in an `iframe`.
-   The host posts a message, e.g., `{ page: 'USER_DETAIL', params: { id: '123' } }`.
-   `HomePage` receives the message and calls `handleHostMessage`.
-   `handleHostMessage` finds the correct component and uses the global `AppModule` to display it.

## Component Props

-   `onMessage: (props: any) => void`: A callback function that is triggered with the data received from the host application. **(Required)**
-   `indicator?: string`: A message to display while the module is waiting for the host's initial message.