import { Command } from '@sapphire/framework';
import { Message } from 'discord.js';

export class PingCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'ping',
            aliases: ['pong'],
            description: 'ping pong',
            preconditions: ['AntiLinkPrecondition']
        });
    }
    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName(this.name).setDescription(this.description)
        );
    }
    public async messageRun(message: Message) {
        return message.reply("Pong!")
    }
    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        return await interaction.reply("Pong!")
    }
}