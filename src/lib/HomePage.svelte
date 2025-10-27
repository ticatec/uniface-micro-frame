<script lang="ts">

    import MessageBoxBoard from "@ticatec/uniface-element/MessageBox";
    import ToastBoard from "@ticatec/uniface-element/ToastBoard";
    import DialogBoard from "@ticatec/uniface-element/DialogBoard";
    import IndicatorBoard from "@ticatec/uniface-element/IndicatorBoard";
    import PopupHint from "@ticatec/uniface-element/PopupHint";
    import {onMount} from "svelte";
    import ModuleHome from "./module/ModuleHome.svelte";
    import type {PageLoader} from "./module/PageLoader";
    import type {ModuleInitialize} from "./common/ModuleInitialize";
    import NotInFramePage from "./pages/NotInFramePage.svelte";

    export let routes: Record<string, PageLoader>;
    export let initializeModule: ModuleInitialize = null as unknown as ModuleInitialize;

    export let style: string = ''

    let inFrame = window.self !== window.top;

    let loaded: boolean = false;

    const sleep = (n: number) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(null)
            }, n * 1000);
        })
    }

    onMount(async () => {
        while (!window.Indicator) {
            await sleep(1);
        }
        loaded = true;
    })

</script>
{#if inFrame}
    {#if loaded}
        <ModuleHome {routes} {style} {initializeModule}>

        </ModuleHome>
    {/if}
    <DialogBoard/>
    <MessageBoxBoard/>
    <PopupHint/>
    <ToastBoard/>
    <IndicatorBoard/>
{:else }
    <NotInFramePage/>
{/if}