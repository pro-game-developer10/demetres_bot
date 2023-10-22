import { Command } from '@sapphire/framework';
import { EmbedTemplate } from '../utils/embedTemplates';
import { ApplicationCommandType } from 'discord.js';
import { dotenv } from '../utils/dotenv';
import { SuggestionStatus, parseMemberFromSuggestionEmbed, parseSuggestionStatusFromColor } from '../utils/suggestionUtils';

export class SuggestionRejectCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: "Reject Suggestion",
            requiredUserPermissions: ['Administrator'],
            requiredClientPermissions: ['EmbedLinks']
        });
    }
    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerContextMenuCommand(builder => {
            builder.setName(this.name)
                .setType(ApplicationCommandType.Message)
        }, { idHints: ["1165275380844871802"] })
    }
    public override async contextMenuRun(interaction: Command.ContextMenuCommandInteraction) {
        // TODO: remove boilerplate code (rejectSuggestion.ts)
        // TODO: use SuggestionEmbedPrecondition (rejectSuggestion.ts)
        if (
            !interaction.isMessageContextMenuCommand() ||
            interaction.channelId != dotenv("SUGGESTIONS_CHANNEL_ID") ||
            interaction.targetMessage.author.id != interaction.client.user.id
        ) return await interaction.reply({ content: "This message is not a suggestion", ephemeral: true })
        const embed = interaction.targetMessage.embeds[0]
        if (parseSuggestionStatusFromColor(embed) == SuggestionStatus.Rejected) return await interaction.reply({ content: "This suggestion is already rejected", ephemeral: true })
        if (!interaction.targetMessage.editable) return await interaction.reply({ content: "This suggestion cannot be marked as rejected by the bot because it doesn't have the appropriate permissions", ephemeral: true })
        await interaction.targetMessage.edit({
            embeds: [EmbedTemplate.UserSuggestion(await parseMemberFromSuggestionEmbed(interaction.targetMessage),embed.description!,SuggestionStatus.Rejected)]
        })
        return await interaction.reply({ content: "Suggestion marked as rejected!", ephemeral: true })
    }
}