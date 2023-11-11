import { z } from 'zod'
/**
 * @file channels.json
 * @main
 */
export default interface ChannelsConfig {
    channels: Array<string | Channel>;
}
/**
 * Other utility types used by the main interface
 * @secondary
 */
export const channelsConfigSchema = () => z.object({
    channels: z.array(z.string().or(z.object({
        id: z.string(),
        type: z.string(),
        flags: z.array(z.string()).or(z.record(z.boolean()).optional()).optional(),
        options: z.record(z.unknown()).optional()
    })))
})
interface Channel {
    id: string;
    type: string;
    flags?: string[] | Record<string, boolean>;
    options?: Partial<ChannelOptions>;
}
interface BaseChannelOptions {
    disabled?: boolean;
}
type ChannelOptions = BaseChannelOptions & Record<string,unknown>
