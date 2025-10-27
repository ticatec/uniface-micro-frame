<script lang="ts">


    import i18nRes from "$lib/i18nRes";

    export let canBeClosed: boolean;

    export let error: any;

</script>

<div style="position: relative; top: 50%; transform: translateY(-50%); text-align: center">
    <div>
        <span>{i18nRes.microFrame.moduleError}</span>
    </div>
    <div>
        <span>{error?.message ?? error}</span>
    </div>

</div>