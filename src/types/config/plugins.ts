import { z } from 'zod'
/**
 * @file plugins.json
 * @main
 */
export default interface PluginsConfig {
    root: string;
    experimentalSupport?: boolean;
    plugins?: Array<string | Plugin>;
}
/**
 * Other utility types used by the main interface
 * @secondary
 */
export const pluginsConfigSchema = () => z.object({
    root: z.string().optional(),
    experimentalSupport: z.boolean().optional(),
    plugins: z.array(z.string().or(z.object({
        id: z.string(),
        flags: z.array(z.string()).or(z.record(z.boolean()).optional()).optional(),
        config: z.union([z.object({
            disabled: z.boolean().optional()
        }),z.record(z.unknown())]).optional()
    }))).optional()
})
interface Plugin {
    id: string;
    flags?: string[] | Record<string, boolean>;
    config?: Partial<PluginConfig>
}
interface BasePluginConfig {
    disabled?: boolean
}
type PluginConfig = BasePluginConfig & Record<string, unknown>;
