import { Args } from "@sapphire/framework";
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
    MessageResolvable,
    InteractionEditReplyOptions,
    MessagePayload,
    InteractionReplyOptions,
    MessageEditOptions,
    Guild,
    AnySelectMenuInteraction,
    AutocompleteInteraction,
    ButtonInteraction,
    ChannelSelectMenuInteraction,
    CommandInteraction,
    ContextMenuCommandInteraction,
    MentionableSelectMenuInteraction,
    MessageComponentInteraction,
    MessageContextMenuCommandInteraction,
    RepliableInteraction,
    RoleSelectMenuInteraction,
    StringSelectMenuInteraction,
    UserContextMenuCommandInteraction,
    UserSelectMenuInteraction,
    APIModalInteractionResponseCallbackData,
    JSONEncodable,
    ModalComponentData,
} from "discord.js";

export class MessageAdapter implements Omit<ChatInputCommandInteraction, "options" | "webhook" | "awaitModalSubmit"> {
    public readonly subject: Message | ChatInputCommandInteraction;
    public readonly isInteractionInstance: boolean;
    public readonly args: Args | undefined
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
    public constructor(subject: ChatInputCommandInteraction | Message, args?: Args) {
        this.isInteractionInstance = !(subject instanceof Message)
        this.subject = subject
        this.args = args
        this.appPermissions = (this.subject as ChatInputCommandInteraction).appPermissions ?? (this.subject as Message).member?.permissions ?? null
        this.applicationId = this.subject.applicationId!
        this.channelId = this.subject.channelId
        this.client = subject.client
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
            let interaction = (this.subject as ChatInputCommandInteraction)
            return await interaction.awaitModalSubmit(options)
        }
        return null
    }
    public get channel(): TextBasedChannel | null {
        return this.subject.channel
    }
    public get command(): ApplicationCommand<{}> | ApplicationCommand<{ guild: GuildResolvable; }> | null {
        if (this.isInteractionInstance) {
            let interaction = this.subject as ChatInputCommandInteraction
            return interaction.command
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
        if (this.isInteractionInstance) {
            let interaction = this.subject as ChatInputCommandInteraction
            return await interaction.deferReply(options!)
        }
        let msg = this.subject as Message
        await msg.channel.sendTyping()
        return msg
    }
    public async deleteReply(message?: MessageResolvable | undefined): Promise<void> {
        if (this.isInteractionInstance) {
            let interaction = this.subject as ChatInputCommandInteraction
            return await interaction.deleteReply(message)
        }
        let msg = this.subject as Message
        if (msg.deletable) await msg.delete()
    }
    public async editReply(options: string | MessagePayload | InteractionEditReplyOptions): Promise<Message<boolean>> {
        if (this.isInteractionInstance) {
            let interaction = this.subject as ChatInputCommandInteraction
            return await interaction.editReply(options)
        }
        let msg = this.subject as Message
        return await msg.edit(options)
    }
    public async fetchReply(message?: string | undefined): Promise<Message<boolean>> {
        if (this.isInteractionInstance) {
            let interaction = this.subject as ChatInputCommandInteraction
            return await interaction.fetchReply(message)
        }
        let msg = this.subject as Message
        return await msg.fetch()
    }
    public async followUp(options: string | MessagePayload | InteractionReplyOptions): Promise<Message<boolean>> {
        if (this.isInteractionInstance) {
            let interaction = this.subject as ChatInputCommandInteraction
            return await interaction.followUp(options)
        }
        let msg = this.subject as Message
        return await msg.fetch()
    }
    public get guild(): Guild | null {
        return this.subject.guild
    }
    public inCachedGuild(): this is ChatInputCommandInteraction<"cached"> {
        if (this.isInteractionInstance) {
            let interaction = this.subject as ChatInputCommandInteraction
            return interaction.inCachedGuild()
        }
        let msg = this.subject as Message
        return false
    }
    public inGuild(): this is ChatInputCommandInteraction<"cached" | "raw"> {
        if (this.isInteractionInstance) {
            let interaction = this.subject as ChatInputCommandInteraction
            return interaction.inGuild()
        }
        let msg = this.subject as Message
        return msg.inGuild()
    }
    public inRawGuild(): this is ChatInputCommandInteraction<"raw"> {
        if (this.isInteractionInstance) {
            let interaction = this.subject as ChatInputCommandInteraction
            return interaction.inRawGuild()
        }
        let msg = this.subject as Message
        return true
    }
    public isAnySelectMenu(): this is AnySelectMenuInteraction<CacheType> {
        return false
    }
    public isAutocomplete(): this is AutocompleteInteraction<CacheType> {
        return false
    }
    public isButton(): this is ButtonInteraction<CacheType> {
        return false
    }
    public isChannelSelectMenu(): this is ChannelSelectMenuInteraction<CacheType> {
        return false
    }
    public isChatInputCommand(): this is ChatInputCommandInteraction<CacheType> {
        return true
    }
    public isCommand(): this is CommandInteraction<CacheType> {
        return true
    }
    public isContextMenuCommand(): this is ContextMenuCommandInteraction<CacheType> {
        return false
    }
    public isMentionableSelectMenu(): this is MentionableSelectMenuInteraction<CacheType> {
        return false
    }
    public isMessageComponent(): this is MessageComponentInteraction<CacheType> {
        return false
    }
    public isMessageContextMenuCommand(): this is MessageContextMenuCommandInteraction<CacheType> {
        return false
    }
    public isModalSubmit(): this is ModalSubmitInteraction<CacheType> {
        return false
    }
    public isRepliable(): this is RepliableInteraction<CacheType> {
        return true
    }
    public isRoleSelectMenu(): this is RoleSelectMenuInteraction<CacheType> {
        return false
    }
    public isStringSelectMenu(): this is StringSelectMenuInteraction<CacheType> {
        return false
    }
    public isUserContextMenuCommand(): this is UserContextMenuCommandInteraction<CacheType> {
        return false
    }
    public isUserSelectMenu(): this is UserSelectMenuInteraction<CacheType> {
        return false
    }
    public async reply(options: InteractionReplyOptions & { fetchReply: true; reply: true; }): Promise<Message<boolean>>;
    public async reply(options: string | InteractionReplyOptions & { fetchReply: true; reply: true; } | MessagePayload & { fetchReply: true; reply: true; }): Promise<InteractionResponse<boolean>>;
    public async reply(options: unknown): Promise<Message<boolean> | InteractionResponse<boolean>> {
        if (this.isInteractionInstance) {
            let interaction = this.subject as ChatInputCommandInteraction
            return await interaction.reply(options!)
        }
        let msg = this.subject as Message
        if ((options as (typeof options & {reply: boolean})).reply) return await msg.reply(options!)
        return await msg.channel.send(options!)
    }
    public async showModal(modal: APIModalInteractionResponseCallbackData | ModalComponentData | JSONEncodable<APIModalInteractionResponseCallbackData>): Promise<void> {
        if (this.isInteractionInstance) {
            let interaction = this.subject as ChatInputCommandInteraction
            return await interaction.showModal(modal)
        }
    }
    public toJSON(...props: Record<string, string | boolean>[]): unknown {
        return this.subject.toJSON()
    }
    public toString(): string {
        return this.subject.toString()
    }
    public valueOf(): string {
        return this.subject.valueOf()
    }
    /**
     * @deprecated
     */
    public isSelectMenu(): this is StringSelectMenuInteraction<CacheType> {
        return false
    }
}