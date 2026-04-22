# CommonFormPage

`CommonFormPage.svelte` 组件为表单页面提供标准化布局，内置操作栏功能。它扩展了 `CommonPage`，增加了表单特定功能，包括操作按钮和关闭确认。

## 用途

此组件专为包装表单内容而设计，提供：

-   **一致的布局**：基于 `CommonPage` 构建，包含标题栏和可滚动内容区域
-   **操作栏集成**：使用 `ActionBar` 组件在标题扩展插槽中显示操作按钮
-   **关闭按钮管理**：当 `canBeClosed` 为 true 时自动添加关闭按钮
-   **关闭确认**：支持关闭前的异步确认，防止数据丢失
-   **可滚动内容**：主内容区域具有自动溢出处理功能

## 使用示例

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
        title: "创建新用户",
        comment: "填写基本用户信息"
    };

    const actions: ButtonActions = [
        {
            label: '保存',
            type: 'primary',
            handler: handleSave
        },
        {
            label: '重置',
            type: 'secondary', 
            handler: handleReset
        }
    ];

    function handleSave() {
        // 保存逻辑
        console.log('保存中:', { name, email });
        isDirty = false;
        // 保存后可选地关闭表单
        AppModule.closeActivePage();
    }

    function handleReset() {
        name = '';
        email = '';
        isDirty = false;
    }

    function handleCancel() {
        // 不保存直接关闭表单
        AppModule.closeActivePage();
    }

    const closeConfirm = async (): Promise<boolean> => {
        if (isDirty) {
            return confirm('您有未保存的更改。确定要关闭吗？');
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
        <label for="name">姓名：</label>
        <input type="text" id="name" bind:value={name} />

        <label for="email">邮箱：</label>
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

## 属性

| 属性 | 类型 | 默认值 | 必需 | 描述 |
|------|------|---------|----------|-------------|
| `page$attrs` | `PageAttrs` | - | ✓ | 页面配置，包括标题、注释和样式 |
| `closeConfirm` | `CloseConfirm \| null` | `null` | ✗ | 关闭页面前调用的异步函数 |
| `canBeClosed` | `boolean` | `true` | ✗ | 是否在操作栏中显示关闭按钮 |
| `closeType` | `ButtonType` | `'primary'` | ✗ | 关闭按钮的样式类型 |
| `actions` | `ButtonActions` | `[]` | ✗ | 自定义操作按钮数组 |

## 插槽

| 插槽 | 描述 |
|------|-------------|
| `default` | 主表单内容区域，具有自动滚动功能和 8px 内边距 |

## 类型定义

### PageAttrs
```ts
interface PageAttrs {
    style?: string;     // 页面的自定义 CSS 样式
    title: string;      // 页面标题（必需）
    comment?: string;   // 可选的副标题/描述
}
```

### CloseConfirm
```ts
type CloseConfirm = () => Promise<boolean>;
```
- 返回 `Promise<boolean>`，其中 `true` 允许关闭，`false` 阻止关闭
- 当用户尝试关闭页面时调用
- 用于检查未保存的更改

## 组件结构

组件渲染以下结构：

1. **CommonPage** - 基础页面布局，包含标题和导航
2. **ActionBar** - 位于标题扩展插槽中，包含：
   - 自定义操作按钮（来自 `actions` 属性）
   - 关闭按钮（当 `canBeClosed` 为 true 时）
3. **内容区域** - 可滚动容器，为表单内容提供 8px 内边距

## 国际化

关闭按钮标签使用内部 `i18nRes.microFrame.btnClose` 资源自动本地化。

## 实现细节

- 当 `canBeClosed` 为 true 时，关闭按钮会自动添加到操作按钮数组中
- 关闭功能由组件内部处理，并与 AppModule 集成
- 当点击关闭按钮时，组件处理确认（如果提供）并调用 `AppModule.closeActivePage()`
- 内容区域使用 `box-sizing: border-box` 以及全宽度/高度和自动溢出
- 操作栏使用弹性布局，按钮之间有 8px 列间距
- **重要**：应用程序代码应直接使用 `AppModule.closeActivePage()` 进行编程导航，而不是依赖组件方法