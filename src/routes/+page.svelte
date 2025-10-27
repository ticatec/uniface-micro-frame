<script lang="ts">

    import "@ticatec/uniface-element/ticatec-uniface-web.css"
    import "@ticatec/uniface-google-material-icons/google_material_icons.css"
    import "$lib/uniface-micro-frame.css"
    import "./app.css";
    import {onMount} from "svelte";

    import HomePage from "$lib/HomePage.svelte";
    import routes from "./routes";
    import i18n, {i18nUtils} from "@ticatec/i18n";


    const inFrame = window.frameElement !== null;
    let mainHome: any;
    let params: any;


    onMount(async () => {
        if (!inFrame) {
            mainHome = (await import('@ticatec/uniface-dev-shell')).default;
            params = {
                menu: (await import('./menu')).default,
                title: '应用组件展示'
            }
        } else {
            i18n.language = 'zh-CN';
            await i18nUtils.loadResources('/assets/uniface.json')
            mainHome = HomePage;
            params = {
                routes
            }

        }
    });



</script>

{#if mainHome}
    <svelte:component this={mainHome} {...params}/>
{/if}




