import { Events, Listener, type MessageCommandDeniedPayload, type ChatInputCommandDeniedPayload, type ContextMenuCommandDeniedPayload, type UserError } from '@sapphire/framework';
import { AntiLinkResults } from '../preconditions/AntiLinkPrecondition';
import { MessageAdapter } from '../utils/messageAdapter';
import { EmbedTemplate } from '../utils/embedTemplates';
// import { EmbedTemplate } from '../utils/embedTemplates';

interface MessageDenyErrorContextProps {
    action: AntiLinkResults,
    actionExecutable: () => Promise<MessageAdapter>
}

export class MessageCommandDenied extends Listener<typeof Events.MessageCommandDenied> {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            name: 'messageCommandDeny',
            once: false,
            event: 'messageCommandDenied'
        })
    }
    public async run(error: UserError, { message ,context }: MessageCommandDeniedPayload) {
        if (context["isTicketValidationError"])
            return await message.reply({ embeds: [EmbedTemplate.NotATicketErrorEmbed] })
        let executeAction = (error.context as MessageDenyErrorContextProps).actionExecutable
        if (executeAction)
            return await executeAction()
        if (!message.author.dmChannel)
            message.author.createDM().then(dm => { dm.send(error.message) })
        message.author.dmChannel?.send(error.message)
        if (message.deletable)
            return await message.delete()
        return message
    }
}

export class ChatInputCommandDenied extends Listener<typeof Events.ChatInputCommandDenied> {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            name: 'chatInputCommandDeny',
            once: false,
            event: 'chatInputCommandDenied'
        })
    }
    public async run(error: UserError, { interaction ,context }: ChatInputCommandDeniedPayload) {
        if (context["isTicketValidationError"])
            return await interaction.reply({ embeds: [EmbedTemplate.NotATicketErrorEmbed] })
        let executeAction = (error.context as MessageDenyErrorContextProps).actionExecutable
        if (executeAction)
            return await executeAction()
        if (interaction.deferred || interaction.replied) {
            return await interaction.editReply({
                content: error.message
            });
        }

        return await interaction.reply({
            content: error.message,
            ephemeral: true
        });
    }
}

export class ContextMenuCommandDenied extends Listener<typeof Events.ContextMenuCommandDenied> {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            name: 'contextMenuCommandDeny',
            once: false,
            event: 'contextMenuCommandDenied'
        })
    }
    public async run(error: UserError, { interaction ,context }: ContextMenuCommandDeniedPayload) {
        if (context["isTicketValidationError"])
            return await interaction.reply({ embeds: [EmbedTemplate.NotATicketErrorEmbed] })
        if (interaction.deferred || interaction.replied)
            return await interaction.editReply({
                content: error.message
            })

        return await interaction.reply({
            content: error.message,
            ephemeral: true
        });
    }
}