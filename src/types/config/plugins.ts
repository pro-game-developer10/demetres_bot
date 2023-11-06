/**
 * @file plugins.json
 * @main
 */
export default interface PluginsConfig {
    root: string;
    experimentalSupport?: boolean;
    plugins: Array<string | Plugin>;
}
/**
 * Other utility types used by the main interface
 * @secondary
 */
interface Plugin {
    id: string;
    flags?: string[] | Record<string, boolean>;
    config?: Partial<PluginConfig>
}
interface BasePluginConfig {
    disabled?: boolean
}
type PluginConfig = BasePluginConfig & Record<string, unknown>;
