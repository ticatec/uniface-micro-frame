# CommonFormPage

The `CommonFormPage.svelte` component provides a standardized layout for form pages with built-in action bar functionality. It extends `CommonPage` to add form-specific features including action buttons and close confirmation.

## Purpose

This component is designed to wrap form content and provides:

-   **Consistent Layout**: Built on `CommonPage` with title bar and scrollable content area
-   **Action Bar Integration**: Displays action buttons in the header extension slot using `ActionBar` component
-   **Close Button Management**: Automatically adds a close button when `canBeClosed` is true
-   **Close Confirmation**: Supports async confirmation before closing to prevent data loss
-   **Scrollable Content**: Main content area with automatic overflow handling

## Usage Example

```svelte
<script lang="ts">
    import CommonFormPage from '@ticatec/uniface-micro-frame/CommonFormPage';
    import type { ButtonActions } from '@ticatec/uniface-element/ActionBar';
    import type { PageAttrs } from '@ticatec/uniface-micro-frame/common';
    import AppModule from '@ticatec/uniface-micro-frame/AppModule';

    let name = '';
    let email = '';
    let isDirty = false;

    $: isDirty = name !== '' || email !== '';

    const page$attrs: PageAttrs = {
        title: "Create New User",
        comment: "Fill in basic user information"
    };

    const actions: ButtonActions = [
        {
            label: 'Save',
            type: 'primary',
            handler: handleSave
        },
        {
            label: 'Reset',
            type: 'secondary', 
            handler: handleReset
        }
    ];

    function handleSave() {
        // Save logic here
        console.log('Saving:', { name, email });
        isDirty = false;
        // Optionally close the form after saving
        AppModule.closeActivePage();
    }

    function handleReset() {
        name = '';
        email = '';
        isDirty = false;
    }

    function handleCancel() {
        // Close the form without saving
        AppModule.closeActivePage();
    }

    const closeConfirm = async (): Promise<boolean> => {
        if (isDirty) {
            return confirm('You have unsaved changes. Are you sure you want to close?');
        }
        return true;
    };
</script>

<CommonFormPage 
    {page$attrs} 
    {actions} 
    {closeConfirm}
    canBeClosed={true}
    closeType="primary"
>
    <div class="form-content">
        <label for="name">Name:</label>
        <input type="text" id="name" bind:value={name} />

        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} />
    </div>
</CommonFormPage>

<style>
    .form-content {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
</style>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `page$attrs` | `PageAttrs` | - | ✓ | Page configuration including title, comment, and styles |
| `closeConfirm` | `CloseConfirm \| null` | `null` | ✗ | Async function called before closing the page |
| `canBeClosed` | `boolean` | `true` | ✗ | Whether to show close button in action bar |
| `closeType` | `ButtonType` | `'primary'` | ✗ | Style type for the close button |
| `actions` | `ButtonActions` | `[]` | ✗ | Array of custom action buttons |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Main form content area with automatic scrolling and 8px padding |

## Type Definitions

### PageAttrs
```ts
interface PageAttrs {
    style?: string;     // Custom CSS styles for the page
    title: string;      // Page title (required)
    comment?: string;   // Optional subtitle/description
}
```

### CloseConfirm
```ts
type CloseConfirm = () => Promise<boolean>;
```
- Returns `Promise<boolean>` where `true` allows closing, `false` prevents it
- Called when user attempts to close the page
- Useful for checking unsaved changes

## Component Structure

The component renders the following structure:

1. **CommonPage** - Base page layout with title and navigation
2. **ActionBar** - Positioned in header extension slot, contains:
   - Custom action buttons (from `actions` prop)
   - Close button (when `canBeClosed` is true)
3. **Content Area** - Scrollable container with 8px padding for form content

## Internationalization

The close button label is automatically localized using the internal `i18nRes.microFrame.btnClose` resource.

## Implementation Details

- The close button is automatically appended to the actions array when `canBeClosed` is true
- Close functionality is handled internally by the component and integrates with AppModule
- When the close button is clicked, the component handles confirmation (if provided) and calls `AppModule.closeActivePage()`
- Content area uses `box-sizing: border-box` and full width/height with overflow auto
- Action bar is positioned with flex layout and 8px column gap between buttons
- **Important**: Application code should use `AppModule.closeActivePage()` directly for programmatic navigation, not rely on component methods