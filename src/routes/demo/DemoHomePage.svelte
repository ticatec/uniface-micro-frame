<script>

    import CommonPage from "$lib/pages/CommonPage.svelte"

    let page$attrs = {
        title: "测试页面",
        comment:  "你的第一个测试页面"
    }

</script>

<CommonPage round shadow {page$attrs}>

</CommonPage>
