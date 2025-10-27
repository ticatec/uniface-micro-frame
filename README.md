# Uniface Micro Frame

[![npm version](https://badge.fury.io/js/@ticatec%2Funifacemicro-frame.svg)](https://www.npmjs.com/package/@ticatec/uniface-micro-frame)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful micro-frontend framework built on Svelte 5, designed for developing modular web applications with iframe-based micro-frontend architecture.

## Overview

Uniface Micro Frame is a comprehensive framework that provides:
- **Micro-frontend support** - Applications run within iframe containers
- **Dynamic routing** - Hash-based routing system for single-page applications
- **Module management** - Stack-based page management with lifecycle controls
- **UI components** - Pre-built page layouts and form components
- **Internationalization** - Built-in i18n support
- **Type safety** - Full TypeScript support

## Installation

```bash
npm install @ticatec/uniface-micro-frame
```

## Quick Start

### 1. Basic Setup

```typescript
import HomePage from '@ticatec/uniface-micro-frame';
import type { ModuleInitialize } from '@ticatec/uniface-micro-frame';

// Define your routes
const routes = {
  '/': () => import('./components/Dashboard.svelte'),
  '/users': () => import('./components/UserList.svelte'),
  '/settings': () => import('./components/Settings.svelte')
};

// Optional module initialization
const initializeModule: ModuleInitialize = async () => {
  // Initialize your module here
  console.log('Module initialized');
};
```

### 2. App Component

```svelte
<script lang="ts">
  import HomePage from '@ticatec/uniface-micro-frame';
  
  export let routes;
  export let initializeModule;
</script>

<HomePage {routes} {initializeModule} />
```

## Core Features

### Page Management

The framework provides a stack-based page management system through the `AppModule` class:

```typescript
import { AppModule } from '@ticatec/uniface-micro-frame/module';

// Show a new page
AppModule.showPage(MyComponent, { param1: 'value' });

// Close the current page
AppModule.closeActivePage();
```

### Page Components

#### CommonPage
A basic page layout with header, content area, and optional sidebar:

```svelte
<script>
  import { CommonPage } from '@ticatec/uniface-micro-frame';
  
  const pageAttrs = {
    title: 'My Page',
    comment: 'Page description'
  };
</script>

<CommonPage {pageAttrs} canBeClosed={true}>
  <div slot="sidebar">
    <!-- Sidebar content -->
  </div>
  
  <div slot="header-ext">
    <!-- Header extensions -->
  </div>
  
  <!-- Main content -->
  <div>Page content goes here</div>
</CommonPage>
```

#### CommonFormPage
An enhanced page layout with built-in action bar for forms:

```svelte
<script>
  import { CommonFormPage } from '@ticatec/uniface-micro-frame/CommonFormPage';
  
  const pageAttrs = {
    title: 'Edit Form',
    comment: 'Edit user information'
  };
  
  const actions = [
    { label: 'Save', type: 'primary', handler: saveForm },
    { label: 'Reset', type: 'secondary', handler: resetForm }
  ];
</script>

<CommonFormPage {pageAttrs} {actions}>
  <!-- Form content -->
  <form>
    <!-- Form fields -->
  </form>
</CommonFormPage>
```

### Routing System

The framework uses hash-based routing with dynamic imports:

```typescript
// Route definition with parameters
const routes = {
  '/users/:id': () => import('./UserDetail.svelte'),
  '/posts/:category/:slug': () => import('./PostView.svelte')
};

// Access route parameters in components
export let id; // Route parameter
export let category; // Route parameter
export let slug; // Route parameter
```

### Module Initialization

Implement the `ModuleInitialize` interface for custom module setup:

```typescript
import type { ModuleInitialize } from '@ticatec/uniface-micro-frame';

const initializeModule: ModuleInitialize = async () => {
  // Setup API clients
  await setupApiClient();
  
  // Initialize stores
  initializeGlobalStores();
  
  // Configure third-party libraries
  configureLibraries();
};
```

## Architecture

### Framework Structure

```
src/lib/
├── HomePage.svelte          # Main entry component
├── common/                  # Common utilities and types
│   ├── ModuleInitialize.ts  # Module initialization interface
│   ├── PageAttrs.ts         # Page attribute types
│   └── PageInitialize.ts    # Page initialization utilities
├── module/                  # Module management
│   ├── AppModule.ts         # Core module manager
│   ├── ModuleHome.svelte    # Module home container
│   └── PageLoader.ts        # Dynamic page loader
├── pages/                   # Pre-built page components
│   ├── CommonPage.svelte    # Basic page layout
│   ├── CommonFormPage.svelte # Form page layout
│   ├── InvalidPage.svelte   # 404 error page
│   └── NotInFramePage.svelte # Frame detection page
└── i18nRes/                 # Internationalization
    └── i18nRes.ts          # Resource definitions
```

### Key Concepts

1. **Iframe-based Architecture**: Applications are designed to run within iframe containers for true isolation
2. **Stack-based Pages**: Pages are managed in a stack, allowing for modal-like overlays
3. **Dynamic Loading**: Components are loaded dynamically based on routes
4. **Type Safety**: Full TypeScript support with proper type definitions

## Styling

Import the framework's CSS for proper styling:

```css
@import '@ticatec/uniface-micro-frame/uniface-micro-frame.css';
```

Or customize using the SCSS source:

```scss
@import '@ticatec/uniface-micro-frame/src/lib/uniface-micro-frame.scss';
```

## Dependencies

### Peer Dependencies
- **Svelte 5.x** - The framework is built for Svelte 5

### Core Dependencies
The framework integrates with the Uniface ecosystem:
- `@ticatec/uniface-element` - UI component library
- `@ticatec/i18n` - Internationalization utilities
- `@ticatec/enhanced-utils` - Enhanced utility functions

## Development

### Building the Package

```bash
npm run build
```

### Development Server

```bash
npm run dev
```

### Type Checking

```bash
npm run check
```

## License

MIT

## Author

Henry Feng

---

For more information and advanced usage examples, please refer to the source code and type definitions included in the package.