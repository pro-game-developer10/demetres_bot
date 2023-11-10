import { Precondition } from '@sapphire/framework';

import { ChatInputCommandInteraction, ContextMenuCommandInteraction, GuildChannel, Message } from 'discord.js';
export class TicketChannelPrecondition extends Precondition {
    public override async messageRun(message: Message) {
        return this.checkChannel(
            (message.channel as GuildChannel).name)
            ? this.ok()
            : this.error({
                message: "This is not a ticket channel",
                context: { isTicketValidationError: true, message }
            })
    }
    public override async chatInputRun(interaction: ChatInputCommandInteraction) {
        return this.checkChannel(
            (interaction.channel as GuildChannel).name)
            ? this.ok()
            : this.error({
                message: "This is not a ticket channel",
                context: { isTicketValidationError: true, interaction }
            })
    }
    public override async contextMenuRun(interaction: ContextMenuCommandInteraction) {
        return this.checkChannel(
            (interaction.channel as GuildChannel).name)
            ? this.ok()
            : this.error({
                message: "This is not a ticket channel",
                context: { isTicketValidationError: true, interaction }
            })
    }
    public checkChannel(name: string) {
        const ticketChannelNamingPattern = /([^a-z0-9])〢([a-z0-9])+-(ticket|donate|job|support)/
        return ticketChannelNamingPattern.test(name)
    }
}
declare module '@sapphire/framework' {
    interface Preconditions {
        TicketChannelPrecondition: never
    }
}
