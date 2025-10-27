import type { SvelteComponent } from "svelte";

export type ComponentType = new (...args: any[]) => SvelteComponent;
export default interface ModulePage {

    /**
     *
     */
    id: string;

    /**
     *
     */
    component: ComponentType;

    /**
     * 参数
     */
    params?: any;

}