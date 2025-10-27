<script>

    import CommonPage from "$lib/pages/CommonPage.svelte";
    import Button from "@ticatec/uniface-element/Button"
    import DemoFormPage from "./DemoFormPage.svelte";
    import AppModule from "$lib/module/AppModule";

    let page$attrs = {
        title: "测试页面2",
        comment: "你的第二个测试页面"
    }

</script>

<CommonPage round shadow {page$attrs} canBeClosed>
    <div slot="sidebar"
         style="height: 100%; border-right: 1px solid var(--uniface-inside-border-color); width: 300px; ">

    </div>
    <div>
        <h1>页面2</h1>
        <Button label="打开" type="primary" onclick={()=>{AppModule.showPage(DemoFormPage, {})}}/>
    </div>
</CommonPage>
