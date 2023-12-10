import { Command } from "@sapphire/framework";
import { EmbedTemplate } from "../utils/embedTemplates";
import { ApplicationCommandType } from "discord.js";
import { SuggestionUtils } from "../utils/suggestionUtils";

export class SuggestionRejectCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name: "Reject Suggestion",
            requiredUserPermissions: ["Administrator"],
            requiredClientPermissions: ["EmbedLinks"],
            preconditions: ["SuggestionEmbedPrecondition"],
        });
    }
    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerContextMenuCommand(
            (builder) => {
                builder
                    .setName(this.name)
                    .setType(ApplicationCommandType.Message);
            },
            { idHints: ["1165275380844871802"] }
        );
    }
    public override async contextMenuRun(
        interaction: Command.ContextMenuCommandInteraction
    ) {
        if (!interaction.isMessageContextMenuCommand()) return;
        const embed = interaction.targetMessage.embeds[0];
        await interaction.targetMessage.edit({
            embeds: [
                EmbedTemplate.UserSuggestion(
                    await SuggestionUtils.parseMemberFromSuggestionEmbed(
                        interaction.targetMessage
                    ),
                    embed.description!,
                    SuggestionUtils.SuggestionStatus.Rejected
                ),
            ],
        });
        return await interaction.reply({
            content: "Suggestion marked as rejected!",
            ephemeral: true,
        });
    }
}
