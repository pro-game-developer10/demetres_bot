import { Listener } from "@sapphire/framework";
import { Message } from "discord.js";
import { EmbedTemplate } from "../utils/embed/embedTemplates";
import { ConfigUtils } from "../utils/json/configUtils";

export class SuggestionListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            name: "suggestion",
            once: false,
            event: "messageCreate",
        });
    }
    public async run(msg: Message) {
        if (msg.member?.user.bot) return;
        if (
            !(
                msg.channelId ==
                ConfigUtils.findOneMentionableByFlags(
                    "channel",
                    "SUGGESTIONS_CHANNEL"
                ).id
            )
        )
            return;
        const suggestionEmbed = EmbedTemplate.UserSuggestion(
            msg.member!,
            msg.content
        );
        const suggestionMsg = await msg.channel.send({
            embeds: [suggestionEmbed],
        });
        await msg.delete();
        const reactionEmojiIDs = ["1156585378694832219", "1156585391550378084"];
        reactionEmojiIDs.forEach(
            async (emoji) => await suggestionMsg.react(emoji)
        );
    }
}
