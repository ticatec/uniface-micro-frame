# AppModule

The `AppModule` class is a singleton controller that manages a stack of pages within an application. It provides centralized navigation control through a simple stack-based approach where pages can be added and removed in LIFO (Last In, First Out) order.

## Purpose

- **Centralized Page Management**: Singleton pattern ensures a single, globally accessible instance for managing the page stack
- **Stack-Based Navigation**: Uses `append` and `pop` operations for intuitive navigation flow (push new pages, pop to go back)
- **Change Notifications**: Automatically notifies listeners when the page stack changes, enabling reactive UI updates
- **Unique Page Identification**: Each page gets a unique ID for tracking and management

## Architecture

The module uses a private array to maintain the page stack and executes a callback function whenever the stack changes. Pages are represented as `ModulePage` objects containing a Svelte component, optional parameters, and a unique identifier.

## Initialization

`AppModule` follows the singleton pattern and must be initialized before use:

```typescript
import AppModule, { type PagesChangeListener } from '@ticatec/uniface-micro-frame/AppModule';

// Initialize once in your app's root
const handlePageChange: PagesChangeListener = (pages) => {
    console.log('Page stack changed:', pages);
    // Update your UI state here
};

AppModule.initialize(handlePageChange);
```

## Basic Usage

### Adding Pages

```typescript
import AppModule from '@ticatec/uniface-micro-frame/AppModule';
import MyComponent from './MyComponent.svelte';

// Static method - most common approach
AppModule.showPage(MyComponent, { userId: 123 });
```

### Removing Pages

```typescript
// Remove the most recent page
AppModule.closeActivePage();
```

### Complete Example

```svelte
<script lang="ts">
    import AppModule from '@ticatec/uniface-micro-frame/AppModule';
    import UserDetailPage from './UserDetailPage.svelte';
    import SettingsPage from './SettingsPage.svelte';

    function openUserDetail() {
        AppModule.showPage(UserDetailPage, { 
            userId: 42,
            mode: 'edit' 
        });
    }

    function openSettings() {
        AppModule.showPage(SettingsPage);
    }

    function goBack() {
        AppModule.closeActivePage();
    }
</script>

<nav>
    <button on:click={openUserDetail}>View User</button>
    <button on:click={openSettings}>Settings</button>
    <button on:click={goBack}>Back</button>
</nav>
```

## API Reference

### Static Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `initialize()` | `onPageChange: PagesChangeListener` | `void` | Initializes the singleton instance with change listener |
| `getInstance()` | - | `AppModule` | Returns the singleton instance |
| `showPage()` | `component: any, params?: any` | `void` | Adds a new page to the stack |
| `closeActivePage()` | - | `void` | Removes the most recent page from the stack |

### Instance Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `append()` | `component: any, params?: any` | `string` | Adds page to stack and returns unique page ID |
| `pop()` | - | `void` | Removes the top page from the stack |

## Type Definitions

### PagesChangeListener
```typescript
type PagesChangeListener = (pages: Array<ModulePage>) => void;
```
Callback function that receives the updated page array whenever the stack changes.

### ModulePage
```typescript
interface ModulePage {
    id: string;                    // Unique page identifier
    component: ComponentType;      // Svelte component constructor
    params?: any;                  // Optional parameters passed to component
}
```

### ComponentType
```typescript
type ComponentType = new (...args: any[]) => SvelteComponent;
```
Type representing a Svelte component constructor.

## Implementation Details

### Page ID Generation
Each page receives a unique ID generated using the pattern:
```typescript
`page_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
```

### Error Handling
- Throws an error if no component is provided to `append()`
- Safe to call `pop()` on empty stack (no-op)

### Memory Management
- Pages are stored in a simple array structure
- When pages are popped, they are removed from memory
- The change listener is called after every stack modification

## Integration Patterns

### With Page Components
Page components typically receive parameters through their props:

```svelte
<!-- UserDetailPage.svelte -->
<script lang="ts">
    export let userId: number;
    export let mode: string = 'view';
</script>

<h1>User {userId} - {mode} mode</h1>
```

### With Navigation Guards
You can implement navigation guards in your change listener:

```typescript
const handlePageChange = (pages: ModulePage[]) => {
    if (pages.length > 10) {
        console.warn('Deep navigation detected');
    }
    // Update UI state
    currentPages = pages;
};
```