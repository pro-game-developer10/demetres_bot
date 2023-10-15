import { 
    CacheType, 
    Message, 
    ChatInputCommandInteraction, 
    Client, 
    PermissionsBitField, 
    ApplicationCommandType,
    Locale,
    APIInteractionGuildMember,
    GuildMember,
    CommandInteractionOptionResolver,
    InteractionType,
    User,
    InteractionWebhook,
    AwaitModalSubmitOptions,
    ModalSubmitInteraction,
    TextBasedChannel,
    ApplicationCommand,
    GuildResolvable,
    InteractionDeferReplyOptions,
    InteractionResponse,
    MessageResolvable
} from "discord.js";

class MessageAdapter implements Omit<ChatInputCommandInteraction,"options" | "webhook" | "awaitModalSubmit"> {
    // Essential properties
    public readonly subject: Message | ChatInputCommandInteraction
    public readonly isInteractionInstance: boolean
    // Base Properties
    public appPermissions: Readonly<PermissionsBitField> | null;
    public applicationId: string;
    public channelId: string;
    public client: Client<true>;
    public commandGuildId: string | null;
    public commandId: string;
    public commandName: string;
    public commandType: ApplicationCommandType.ChatInput;
    public deferred: boolean;
    public ephemeral: boolean | null;
    public guildId: string | null;
    public guildLocale: Locale | null;
    public id: string;
    public locale: Locale;
    public member: GuildMember | APIInteractionGuildMember | null;
    public memberPermissions: Readonly<PermissionsBitField> | null;
    public options: Omit<CommandInteractionOptionResolver<CacheType>, "getMessage" | "getFocused"> | null;
    public replied: boolean;
    public token: string;
    public type: InteractionType.ApplicationCommand;
    public user: User;
    public version: number;
    public webhook: InteractionWebhook | null;
    // Overidden Constructor
    public constructor(subject: ChatInputCommandInteraction | Message) {
        this.isInteractionInstance = !(subject instanceof Message)
        this.subject = subject
        this.appPermissions = (this.subject as ChatInputCommandInteraction).appPermissions ?? (this.subject as Message).member?.permissions ?? null
        this.applicationId = this.subject.applicationId!
        this.channelId = this.subject.channelId
        this.commandGuildId = this.subject.guildId
        this.commandId = (this.subject as ChatInputCommandInteraction).commandId ?? this.subject.id
        this.commandName = (this.subject as ChatInputCommandInteraction).commandName ?? (this.subject as Message).content.split(" ")[0].replace("!", "")
        this.commandType = ApplicationCommandType.ChatInput
        this.deferred = (this.subject as ChatInputCommandInteraction).deferred ?? false
        this.ephemeral = (this.subject as ChatInputCommandInteraction).ephemeral ?? false
        this.guildId = this.subject.guildId
        this.guildLocale = (this.subject as ChatInputCommandInteraction).guildLocale ?? (this.subject as Message).guild?.preferredLocale ?? null
        this.id = this.subject.id
        this.locale = (this.subject as ChatInputCommandInteraction).locale ?? Locale.EnglishUS
        this.member = this.subject.member
        this.memberPermissions = (this.subject as ChatInputCommandInteraction).memberPermissions ?? (this.subject as Message).member?.permissions ?? null
        this.options = (this.subject as ChatInputCommandInteraction).options ?? null
        this.replied = (this.subject as ChatInputCommandInteraction).replied ?? false
        this.token = (this.subject as ChatInputCommandInteraction).token ?? (this.subject as Message).client.token
        this.type = InteractionType.ApplicationCommand
        this.user = (this.subject as ChatInputCommandInteraction).user ?? (this.subject as Message).author
        this.version = (this.subject as ChatInputCommandInteraction).version ?? 0
        this.webhook = (this.subject as ChatInputCommandInteraction).webhook ?? null
    }
    public async awaitModalSubmit(options: AwaitModalSubmitOptions<ModalSubmitInteraction<CacheType>>): Promise<ModalSubmitInteraction<CacheType> | null> {
        if (this.isInteractionInstance) {
            return (this.subject as ChatInputCommandInteraction).awaitModalSubmit(options)
        }
        return null
    }
    public get channel(): TextBasedChannel | null {
        return this.subject.channel
    }
    public get command(): ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable; }> | null {
        if (this.isInteractionInstance) {
            return (this.subject as ChatInputCommandInteraction).command
        }
        return null
    }
    public get createdAt(): Date {
        return this.subject.createdAt
    }
    public get createdTimestamp(): number {
        return this.subject.createdTimestamp
    }
    public async deferReply(options: InteractionDeferReplyOptions & { fetchReply: true; }): Promise<Message<boolean>>;
    public async deferReply(options?: InteractionDeferReplyOptions | undefined): Promise<InteractionResponse<boolean>>;
    public async deferReply(options?: unknown): Promise<Message<boolean> | import("discord.js").InteractionResponse<boolean>> {
        if (this.isInteractionInstance) return (this.subject as ChatInputCommandInteraction).deferReply(options!)
        return (this.subject as Message)
    }
    public async deleteReply(message?: MessageResolvable | undefined): Promise<void> {
        if (this.isInteractionInstance) return (this.subject as ChatInputCommandInteraction).deleteReply()
    }
}