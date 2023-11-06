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
