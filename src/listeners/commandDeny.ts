import { Events, Listener, type MessageCommandDeniedPayload, type ChatInputCommandDeniedPayload, type ContextMenuCommandDeniedPayload, type UserError } from '@sapphire/framework';

export class MessageCommandDenied extends Listener<typeof Events.MessageCommandDenied> {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            name: 'messageCommandDeny',
            once: false,
            event: 'messageCommandDenied'
        })
    }
    public async run(error: UserError, { message }: MessageCommandDeniedPayload) {
        if (!message.author.dmChannel) message.author.createDM().then(dm => { dm.send(error.message) })
        message.author.dmChannel?.send(error.message)
        if (message.deletable) return await message.delete()
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
    public run(error: UserError, { interaction }: ChatInputCommandDeniedPayload) {
        if (interaction.deferred || interaction.replied) {
        return interaction.editReply({
            content: error.message
        });
        }

        return interaction.reply({
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
    public run(error: UserError, { interaction }: ContextMenuCommandDeniedPayload) {
        if (interaction.deferred || interaction.replied) {
        return interaction.editReply({
            content: error.message
        });
        }

        return interaction.reply({
            content: error.message,
            ephemeral: true
        });
    }
}