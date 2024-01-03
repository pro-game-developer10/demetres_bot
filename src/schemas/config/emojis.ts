import { z } from "zod";
/**
 * @file emojis.json
 * @main
 */
export default interface MentionablesConfig {
    enabled?: boolean
    emojis?: Emoji[];
}
/**
 * Other utility types used by the main interface
 * @secondary
 */
export const emojiConfigSchema = () => z.object({
    enabled: z.boolean().optional().default(true),
    emojis: z.array(
        z.object({
            type: z.string(),
            id: z.string().or(z.null()).optional(),
            name: z.string().or(z.null()).optional(), // FIXME: Not Implemented yet
            unicodeLiteral: z.string().length(1).or(z.null()).optional(),
            animated: z.boolean().optional().default(false)
        })
    ).optional()
});
interface Emoji {
    type: string,
    id?: string,
    name?: string,
    unicodeLiteral?: string,
    animated?: boolean
}
