# Module: ModuleHome

The `module/ModuleHome.svelte` component is the primary UI renderer for the `AppModule` singleton. It displays the current stack of pages being managed by `AppModule`.

## Purpose

`ModuleHome` is the visual representation of the page stack. It is designed to be placed in your main application layout. It automatically:
-   Listens for changes to the `AppModule`'s page stack.
-   Renders the component for each page currently in the stack.
-   Passes any parameters from `AppModule.showPage()` to the corresponding component as props.

This component effectively creates the visual navigation stack that the user sees.

## How to Use

Place `ModuleHome` in a central part of your application's layout, such as the root `+layout.svelte`. It does not require any props, as it gets the page stack directly from the `AppModule` singleton.

1.  **Initialize AppModule and place ModuleHome**

    ```svelte
    <!-- src/routes/+layout.svelte -->
    <script lang="ts">
        import AppModule from '@ticatec/uniface-micro-frame/AppModule';
        import ModuleHome from '@ticatec/uniface-micro-frame/module/ModuleHome';

        // Initialize the singleton once in your app's lifecycle
        AppModule.initialize(pages => {
            console.log('Pages changed:', pages.length);
        });
    </script>

    <main>
        <!--
          ModuleHome will render the stack of pages here.
          As you call AppModule.showPage(), new components will appear.
          As you call AppModule.closeActivePage(), they will be removed.
        -->
        <ModuleHome />
    </main>
    ```

2.  **Navigate from another component**

    ```svelte
    <!-- src/components/MyButton.svelte -->
    <script lang="ts">
        import AppModule from '@ticatec/uniface-micro-frame/AppModule';
        import SomePageComponent from './SomePageComponent.svelte';
    </script>

    <button on:click={() => AppModule.showPage(SomePageComponent)}>
        Show Page
    </button>
    ```

## Component Props

This component does not take any props. It communicates directly with the `AppModule` singleton.