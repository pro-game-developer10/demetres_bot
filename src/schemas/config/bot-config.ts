import { z } from "zod";
/**
 * @file bot-config.json
 * @main
 */
export default interface BotConfig {
    root: string;
    prefix: string | {
        nonSlash: string;
        slashEnabled?: boolean; // FIXME: property not implemented yet
    };
    dotenvOverride?: Omit<ConfigFile, "type">;
}
/**
 * Other utility types used by the main interface
 * @secondary
 */
export const botConfigSchema = () =>
    z.object({
        root: z.string(),
        prefix: z.string().or(z.object({
            nonSlash: z.string(),
            slashEnabled: z.boolean().optional().default(true)
        })),
        dotenvOverride: z
            .object({
                fileType: z.enum(["env", "json", "yml"]).optional(),
                path: z.string(),
            })
            .optional(),
    });
export interface ConfigFile {
    type?: string;
    fileType?: "env" | "json" | "yml";
    path: string;
}
