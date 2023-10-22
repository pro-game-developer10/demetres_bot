import { Command } from '@sapphire/framework';
import { Message } from 'discord.js';

export class CloseTicketCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'close-ticket',
            aliases: ['closeticket'],
            description: 'Closes this ticket',
            preconditions: ['TicketChannelPrecondition'],
            requiredClientPermissions: ['ManageChannels']
        });
    }
    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName(this.name).setDescription(this.description)
        , { idHints: ["1164304745675104266"] });
    }
    public async messageRun(message: Message) {
        await message.channel.delete()
    }
    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        await interaction.channel?.delete()
    }
}