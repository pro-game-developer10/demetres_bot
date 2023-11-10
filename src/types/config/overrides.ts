import { z } from 'zod'
/**
 * @file overrides.json
 * @main
 */
export default interface OverridesConfig {
    root: string;
    configPaths?: ConfigFile[];
}
/**
 * Other utility types used by the main interface
 * @secondary
 */
export const overridesConfigSchema = () => z.object({
    root: z.string().optional(),
    configPaths: z.array(z.object({
        type: z.string(),
        fileType: z.enum(["env", "json", "yml"]),
        path: z.string()
    })).optional()
})
interface ConfigFile {
    type: string;
    fileType: "env" | "json" | "yml";
    path: string;
}
