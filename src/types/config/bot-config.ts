import { z } from 'zod'
/**
 * @file bot-config.json
 * @main
 */
export default interface BotConfig {
    root: string;
    dotenvOverride?: Omit<ConfigFile,"fileType" | "type">;
    // configPaths?: ConfigFile[];
}
/**
 * Other utility types used by the main interface
 * @secondary
*/
export const botConfigSchema = () => z.object({
    root: z.string(),
    dotenvOverride: z.object({
        type: z.string().optional(),
        fileType: z.enum(['env','json','yml']).optional(),
        path: z.string()
    }).optional()
})
interface ConfigFile {
    type?: string
    fileType?: 'env' | 'json' | 'yml';
    path: string;
}
