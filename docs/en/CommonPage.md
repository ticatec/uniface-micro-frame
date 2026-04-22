# CommonPage

The `CommonPage.svelte` component provides a foundational layout for application pages. It serves as the base component for other specialized page types like `CommonFormPage` and offers consistent page structure with title management, navigation, and close confirmation functionality.

## Purpose

This component provides:

-   **Standard Page Layout**: Built on top of the `Page` component from `@ticatec/uniface-element`
-   **Title and Comment Display**: Configurable page title with optional subtitle/comment
-   **Close Functionality**: Optional back/close navigation with confirmation support
-   **Flexible Content Areas**: Main content area with optional sidebar support
-   **Header Extensions**: Extensible header area for custom controls and actions
-   **Custom Styling**: Support for page-specific CSS styles

## Usage Example

```svelte
<script lang="ts">
    import CommonPage from '@ticatec/uniface-micro-frame/CommonPage';
    import type { PageAttrs } from '@ticatec/uniface-micro-frame/common';
    import AppModule from '@ticatec/uniface-micro-frame/AppModule';

    const page$attrs: PageAttrs = {
        title: "Settings",
        comment: "Manage your application preferences",
        style: "background-color: #f5f5f5;"
    };

    const closeConfirm = async (): Promise<boolean> => {
        // Check for unsaved changes
        return confirm('Are you sure you want to leave this page?');
    };

    function handleClose() {
        // Use AppModule to close this page
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
        <!-- Optional sidebar content -->
        <nav>
            <ul>
                <li>General</li>
                <li>Security</li>
                <li>Privacy</li>
            </ul>
        </nav>
    </div>

    <div slot="header-ext">
        <!-- Optional header extensions -->
        <button>Help</button>
    </div>

    <!-- Main content -->
    <div class="page-content">
        <h2>General Settings</h2>
        <p>Configure your basic preferences here.</p>
    </div>
</CommonPage>

<style>
    .page-content {
        padding: 20px;
    }
</style>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `page$attrs` | `PageAttrs` | - | ✓ | Page configuration including title, comment, and styles |
| `content$style` | `string` | `''` | ✗ | Custom CSS styles for the main content area |
| `canBeClosed` | `boolean` | `false` | ✗ | Whether to show back/close button and enable close functionality |
| `closeConfirm` | `CloseConfirm \| null` | `null` | ✗ | Async function called before closing the page |
| `reload` | `any` | `null` | ✗ | Reload functionality (passed to underlying Page component) |
| `round` | `boolean` | `false` | ✗ | Whether to apply rounded corners to the page |
| `shadow` | `boolean` | `false` | ✗ | Whether to apply shadow effect to the page |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Main page content area with flexible layout |
| `sidebar` | Optional sidebar content positioned on the left side |
| `header-ext` | Header extension area for custom controls and actions |

## Methods

### `closePage()`
Internal method that handles the close confirmation process. This method is called automatically when the user attempts to close the page through the back/close button. It should not be called directly from application code.

**Note**: To programmatically close pages, use `AppModule.closeActivePage()` instead of calling this method directly.

```ts
// Correct way to close a page programmatically
import AppModule from '@ticatec/uniface-micro-frame/AppModule';
AppModule.closeActivePage();
```

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
- Useful for checking unsaved changes or other confirmation logic

## Component Structure

The component renders the following layout structure:

1. **Page Container** - Base `Page` component with title and navigation
2. **Sidebar** (optional) - Fixed-width left sidebar with overflow hidden
3. **Main Content Area** - Flexible content area that takes remaining space
4. **Header Extension** - Positioned in the page header for additional controls

## Layout Details

- **Sidebar**: `flex: 0 0 auto` - Fixed size, no grow/shrink, positioned on the left
- **Main Content**: `flex: 1 1 auto` - Grows to fill available space, can shrink if needed
- **Header Extension**: Positioned with `flex: 0 0 auto` and aligned with other header elements

## Integration with AppModule

The component integrates with AppModule for page management:

- When `canBeClosed` is true, the page displays a back/close button
- Clicking the back/close button triggers the internal `closePage()` method
- If `closeConfirm` is provided, it's called first to confirm the action
- After confirmation, `AppModule.closeActivePage()` is called to remove the page from the stack
- **Important**: Application code should use `AppModule.closeActivePage()` directly, not call the component's `closePage()` method

## Inheritance

This component serves as the foundation for other page components:
- `CommonFormPage` extends this component to add form-specific functionality
- Other specialized page types can be built on top of this base component

## Styling Notes

- The component uses `box-sizing: border-box` for consistent sizing
- Content areas are configured with `overflow: hidden` for proper layout containment
- Custom styles can be applied via the `page$attrs.style` property
- Additional content styling can be applied via the `content$style` prop