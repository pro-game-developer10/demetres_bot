import { Embed, EmbedBuilder, GuildMember, Message } from "discord.js"

export namespace SuggestionUtils {
    export enum SuggestionStatus {
        Rejected = 'Απορρίφθηκε',
        Approved = 'Εγκρίθηκε',
        Pending = 'Εκκρεμεί ανασκόπηση',
        UnderReview = 'Υπό ανασκόπηση'
    }
    export function suggestionStatusColor(status: SuggestionStatus) {
        switch (status) {
            case SuggestionStatus.Rejected:
                return 0xff4500
            case SuggestionStatus.Approved:
                return 0x10ff45
            case SuggestionStatus.Pending:
                return 0x2a9bf2
            case SuggestionStatus.UnderReview:
                return 0xffaa00
            default:
                return 0x2a9bf2
        }
    }
    export function parseSuggestionStatusFromColor(embed: Embed | EmbedBuilder): SuggestionStatus {
        switch (embed.data.color) {
            case 0xff4500:
                return SuggestionStatus.Rejected
            case 0x10ff45:
                return SuggestionStatus.Approved
            case 0x2a9bf2:
                return SuggestionStatus.Pending
            case 0xffaa00:
                return SuggestionStatus.UnderReview
            default:
                return SuggestionStatus.Pending
        }
    }
    export async function parseMemberFromSuggestionEmbed(msg: Message): Promise<GuildMember> {
        let userID = msg.embeds[0].data.footer?.text.split(" ")[2].replaceAll("|", "") ?? msg.client.user.id
        return await msg.guild?.members.fetch({ user: userID })!
    }
}
