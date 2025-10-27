<script lang="ts">

    import {onDestroy, onMount} from "svelte";
    import type ModulePage from "$lib/module/ModulePage";
    import {fade} from 'svelte/transition';
    import modUtils from "$lib/module/ModUtils";
    import InvalidPage from "$lib/pages/InvalidPage.svelte";
    import type {PageLoader} from "$lib/module/PageLoader";
    import AppModule from "$lib/module/AppModule";
    import type {ModuleInitialize} from "$lib/common/ModuleInitialize";
    import ModuleErrorPage from "$lib/pages/ModuleErrorPage.svelte";
    import i18nRes from "$lib/i18nRes";
    
    export let style: string = "";
    export let routes: Record<string, PageLoader>;
    export let initializeModule: ModuleInitialize;

    let homePage: any;

    let pages: Array<ModulePage> = [];

    let params: any = {};
    let query: any = {};
    const buildHomePage = async () => {
        let hashStr = decodeURIComponent(window.location.hash);
        console.debug('route hash:', hashStr);
        let result = modUtils.parseHash(hashStr);
        console.debug('route to', result);
        let route = modUtils.parseRoute(routes, result.path);
        if (route.loader != null) {
            homePage = (await route.loader())?.default;
            params = route.params;
            query = result.query;
        } else {
            homePage = InvalidPage;
            params = {hash: hashStr}
            query = result.query;
        }
    }

    const onPagesChange = (list: Array<ModulePage>) => {
        pages = [...list];
        console.log(pages)
    }

    const handleHashChangeEvent = (event: HashChangeEvent) => {
        buildHomePage();
    }

    onMount(async () => {
        window.Indicator.show(i18nRes.microFrame.indicatorLoadModule)
        try {
            await initializeModule?.();
            AppModule.initialize(onPagesChange);
            window.addEventListener('hashchange', handleHashChangeEvent);
            await buildHomePage();
        } catch (ex) {
            console.error('Module loading with error', ex);
            homePage = ModuleErrorPage;
            params = {ex}
        } finally {
            window.Indicator.hide();
        }
    });

    onDestroy(() => {
        window.removeEventListener('hashchange', handleHashChangeEvent);
    });

</script>
<div class="uniface-micro-frame-board" {style}>
    <div class="module-home-page" style="width: 100%; height: 100%">
        {#if homePage}
            <svelte:component this={homePage} {...params} {...query}/>
        {/if}
    </div>
    {#each pages as page}
        <div class="module-stack-board" transition:fade>
            <div>
                <svelte:component this={page.component} {...page.params}/>
            </div>
        </div>
    {/each}
</div>