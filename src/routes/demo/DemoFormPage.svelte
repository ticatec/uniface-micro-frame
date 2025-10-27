<script lang="ts">

    import CommonFormPage from "$lib/pages/CommonFormPage.svelte";
    import type {ButtonActions} from "@ticatec/uniface-element/ActionBar";

    let page$attrs = {
       title: "表单页面",
       comment: "填写表单"
    }

    let actions: ButtonActions = [
        {
            type: "primary",
            label: "保存",
            handler: async ()=> {}
        }
    ]

</script>
<CommonFormPage canBeClosed {page$attrs} {actions}>

</CommonFormPage>