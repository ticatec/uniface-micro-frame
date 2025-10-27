import type {ComponentType} from "./ModulePage";

export type PageLoader <T = any> = () => Promise<{
    default: ComponentType;
    metadata?: ComponentMetadata;
}>;

export interface ComponentMetadata {
    name?: string;
    version?: string;
    dependencies?: string[];
}
