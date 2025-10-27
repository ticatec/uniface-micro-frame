<script lang="ts">

    import i18nRes from "$lib/i18nRes";
    export let message: string;

</script>
<div class="uniface-module-board">
    <div style="position: relative; top: 50%; transform: translateY(-50%); text-align: center">
        <div>
            <span>{i18nRes.microFrame.moduleError}</span>
        </div>
        <div>
            <span>{message}</span>
        </div>

    </div>
</div>