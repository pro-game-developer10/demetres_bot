import { Command } from '@sapphire/framework';
import { EmbedTemplate } from '../utils/embedTemplates';
import { ApplicationCommandType } from 'discord.js';
import { SuggestionUtils } from '../utils/suggestionUtils';

export class SuggestionApproveCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: "Approve Suggestion",
            requiredUserPermissions: ['Administrator'],
            requiredClientPermissions: ['EmbedLinks'],
            preconditions: ['SuggestionEmbedPrecondition']
        });
    }
    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerContextMenuCommand(builder => {
            builder.setName(this.name)
                .setType(ApplicationCommandType.Message)
        }, { idHints: ["1165266390039670814"] })
    }
    public override async contextMenuRun(interaction: Command.ContextMenuCommandInteraction) {
        if (!interaction.isMessageContextMenuCommand()) return
        const embed = interaction.targetMessage.embeds[0]
        await interaction.targetMessage.edit({
            embeds: [EmbedTemplate.UserSuggestion(await SuggestionUtils.parseMemberFromSuggestionEmbed(interaction.targetMessage),embed.description!,SuggestionUtils.SuggestionStatus.Approved)]
        })
        return await interaction.reply({ content: "Suggestion marked as approved!", ephemeral: true })
    }
}
