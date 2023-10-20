import { Precondition } from '@sapphire/framework';

import { ChatInputCommandInteraction, ContextMenuCommandInteraction, GuildChannel, Message } from 'discord.js';
export class TicketChannelPrecondition extends Precondition {
    public override async messageRun(message: Message) {
        return this.checkChannel((message.channel as GuildChannel).name) ? this.ok() : this.error({ context: { isTicketValidationError: true } })
    }
    public override async chatInputRun(interaction: ChatInputCommandInteraction) {
        return this.checkChannel((interaction.channel as GuildChannel).name) ? this.ok() : this.error({ context: { isTicketValidationError: true } })
    }
    public override async contextMenuRun(interaction: ContextMenuCommandInteraction) {
        return this.checkChannel((interaction.channel as GuildChannel).name) ? this.ok() : this.error({ context: { isTicketValidationError: true } })
    }
    public checkChannel(name: string) {
        const ticketChannelNamingPattern = /([^a-z0-9])〢(ticket|donate|job|support)-([a-z0-9])+/
        return ticketChannelNamingPattern.test(name)
    }
}
declare module '@sapphire/framework' {
    interface Preconditions {
        TicketChannelPrecondition: never;
    }
}