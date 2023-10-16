import { Args, Command } from '@sapphire/framework';
import { APIActionRowComponent, APIMessageActionRowComponent, Message, SlashCommandStringOption } from 'discord.js';
import { EmbedTemplate } from '../utils/embedTemplates';

export class TemplateCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: "template",
            description: "sends an embed using a specified template",
            requiredUserPermissions: ['Administrator'],
            requiredClientPermissions: ['EmbedLinks'],
            preconditions: ['AntiLinkPrecondition']
        });
    }
    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName(this.name).setDescription(this.description)
                .addStringOption(new SlashCommandStringOption()
                    .setName("template_id")
                    .addChoices({
                        name: "Ticket Embed",
                        value: "Ticket"
                    })
                    .setDescription("The ID matching the template you want to send")
                )
        );
    }
    public async messageRun(message: Message, args: Args) {
        const id = await args.pick("string")
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
        const id = interaction.options.getString("template_id", true) ?? "error_invalid_args"
        switch (id.toLowerCase()) {
            case "ticket":
                return await interaction.reply({
                    embeds: [EmbedTemplate.TicketSelect],
                    components: [EmbedTemplate.TicketSelectMenu as unknown as APIActionRowComponent<APIMessageActionRowComponent>]
                })
            default:
                return await interaction.reply({
                    embeds: [EmbedTemplate.InvalidTemplateError(id)]
                })
        }
    }
}