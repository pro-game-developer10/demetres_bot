import { Args, Command } from '@sapphire/framework';
import { APIActionRowComponent, APIMessageActionRowComponent, Message } from 'discord.js';
import { EmbedTemplate } from '../utils/embedTemplates';

export class TemplateCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: 'template',
            description: 'sends an embed using a specified template'
        });
    }
    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName(this.name).setDescription(this.description)
        );
    }
    public async messageRun(message: Message, args: Args) {
        const id = await args.pick("string").catch(() => "error_invalid_args")
        switch (id.toLowerCase()) {
            case "ticket":
                return await message.channel.send({
                    embeds: [EmbedTemplate.TicketSelect],
                    components: [EmbedTemplate.TicketSelectMenu as unknown as APIActionRowComponent<APIMessageActionRowComponent>]
                })
            default:
                return await message.channel.send({
                    embeds: [EmbedTemplate.InvalidTemplateError(id)]
                })
        }
    }
    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        
    }
}