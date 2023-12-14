import { z } from "zod";
/**
 * @file mentionables.json
 * @main
 */
export default interface MentionablesConfig {
    items?: Mentionable[];
}
/**
 * Other utility types used by the main interface
 * @secondary
 */
export const mentionablesConfigSchema = () => z.object({
    items: z.array(
        z.object({
            id: z.string(),
            type: z.enum(["channel", "role"]),
            flags: z
                .array(z.string())
                .or(z.record(z.boolean()).optional())
                .optional(),
            options: z.record(z.unknown()).optional(),
        })
    ).optional()
});
interface Mentionable {
    id: string;
    type: "channel" | "role";
    flags?: string[] | Record<string, boolean>;
    options?: Partial<MentionableOptions>;
}
interface BaseMentionableOptions {
    disabled?: boolean;
}
type MentionableOptions = BaseMentionableOptions & Record<string, unknown>;
