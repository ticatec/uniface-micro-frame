<script lang="ts">


    import Page from "@ticatec/uniface-element/Page";
    import type PageAttrs from "$lib/common/PageAttrs";
    import AppModule from "../module/AppModule";
    import type {CloseConfirm} from "$lib/common/CloseConfirm";

    export let page$attrs: PageAttrs;
    export let content$style: string = '';
    export let canBeClosed: boolean = false;
    export let closeConfirm: CloseConfirm | null = null;
    export let reload: any = null;

    export let round: boolean = false;
    export let shadow: boolean = false;

    export const closePage = async () => {
        if (closeConfirm == null || await closeConfirm()) {
            AppModule.closeActivePage();
        }
    }

</script>

<Page {round} {reload} {shadow} title={page$attrs.title??'Title'} comment={page$attrs?.comment} goBack={ canBeClosed ? closePage : null}
      style={page$attrs?.style??''} content$style="width: 100; height: 100%; box-sizing: border-box; display: flex; flex-direction: row">
    {#if $$slots['sidebar']}
        <div style="height: 100%; flex: 0 0 auto; overflow: hidden;">
            <slot name="sidebar"/>
        </div>
    {/if}
    <div style="height: 100%; flex: 1 1 auto; overflow: hidden; {content$style}">
        <slot></slot>
    </div>

    <div slot="header-ext" style="flex: 0 0 auto; display: flex;position: relative; align-items: center; column-gap: 8px">
        <slot name="header-ext">

        </slot>
    </div>
</Page>