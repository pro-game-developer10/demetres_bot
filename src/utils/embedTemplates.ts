import { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle, OverwriteResolvable, OverwriteType, Guild, GuildMember} from "discord.js";
import { dotenv } from "./dotenv";
import { suggestionStatusColor, SuggestionStatus } from "./suggestionUtils";

export namespace TicketPermissionsInfo {
    export const SupportTicketPermissions = (civilianID: string, guild: Guild): OverwriteResolvable[] => [
        {
            type: OverwriteType.Member,
            id: civilianID,
            allow: ["ViewChannel"]
        },
        {
            type: OverwriteType.Role,
            id: guild.roles.everyone,
            deny: ["ViewChannel"]
        },
        {
            type: OverwriteType.Role,
            id: dotenv("STAFF_ROLE_ID"),
            allow: ["ViewChannel"]
        }
    ]
    export const DonateTicketPermissions = (civilianID: string, guild: Guild): OverwriteResolvable[] => [
        {
            type: OverwriteType.Member,
            id: civilianID,
            allow: ["ViewChannel"]
        },
        {
            type: OverwriteType.Role,
            id: guild.roles.everyone,
            deny: ["ViewChannel"]
        },
        {
            type: OverwriteType.Role,
            id: dotenv("DONATE_MANAGER_ROLE_ID"),
            allow: ["ViewChannel"]
        }
    ]
    export const JobTicketPermissions = (civilianID: string, guild: Guild): OverwriteResolvable[] => [
        {
            type: OverwriteType.Member,
            id: civilianID,
            allow: ["ViewChannel"]
        },
        {
            type: OverwriteType.Role,
            id: guild.roles.everyone,
            deny: ["ViewChannel"]
        },
        {
            type: OverwriteType.Role,
            id: dotenv("JOB_MANAGER_ROLE_ID"),
            allow: ["ViewChannel"]
        }
    ]
    export const ClaimedTicketPermissions = (staffId: string, guild: Guild): OverwriteResolvable[] => [
        {
            type: OverwriteType.Member,
            id: staffId,
            allow: ["ViewChannel"]
        },
        {
            type: OverwriteType.Role,
            id: guild.roles.everyone,
            deny: ["ViewChannel"]
        },
        {
            type: OverwriteType.Role,
            id: dotenv("STAFF_ROLE_ID"),
            deny: ["ViewChannel"],
        },
        {
            type: OverwriteType.Role,
            id: dotenv("JOB_MANAGER_ROLE_ID"),
            deny: ["ViewChannel"]
        },
        {
            type: OverwriteType.Role,
            id: dotenv("DONATE_MANAGER_ROLE_ID"),
            deny: ["ViewChannel"]
        }
    ]
    export const WFSVCChannelPermissions = (civilianID: string, guild: Guild): OverwriteResolvable[] => [
        {
            type: OverwriteType.Member,
            id: civilianID,
            allow: ["ViewChannel","Stream"]
        },
        {
            type: OverwriteType.Role,
            id: guild.roles.everyone,
            deny: ["ViewChannel"]
        },
        {
            type: OverwriteType.Role,
            id: dotenv("STAFF_ROLE_ID"),
            allow: ["ViewChannel","MuteMembers","DeafenMembers","MoveMembers","Stream"]
        },
        {
            type: OverwriteType.Role,
            id: dotenv("JOB_MANAGER_ROLE_ID"),
            allow: ["ViewChannel","MuteMembers","DeafenMembers","MoveMembers","Stream"]
        },
        {
            type: OverwriteType.Role,
            id: dotenv("DONATE_MANAGER_ROLE_ID"),
            allow: ["ViewChannel","MuteMembers","DeafenMembers","MoveMembers","Stream"]
        }
    ]
}

const TicketSelectMenuOptions = [
    {
        emoji: "1163175087562829876",
        label: "Support",
        description: "Χρησιμοποίησε αυτήν την επιλογή έαν θες βοήθεια"
    },
    {
        emoji: "1163175068361293905",
        label: "Job",
        description: "Χρησιμοποίησε αυτήν την επιλογή έαν θες να πάρεις κάποιο (in-game) job"
    },
    {
        emoji: "1163175036337803356",
        label: "Donate",
        description: "Χρησιμοποίησε αυτήν την επιλογή έαν θες να κάνεις donate στον server"
    },
].map(({ emoji, label, description }) => new StringSelectMenuOptionBuilder()
    .setDescription(description)
    .setEmoji(emoji)
    .setLabel(label)
    .setValue(label.toLowerCase())
)

export namespace EmbedTemplate {
    export const InvalidTemplateError = (id: string) => new EmbedBuilder()
        .setColor(0xFF0000)
        .setAuthor({
            name: "AstralRP",
            iconURL: "https://cdn.discordapp.com/attachments/1142540077407424512/1160585371642503228/giphy.gif?ex=653e6cdb&is=652bf7db&hm=a51f5f6544b2ab96bd308f3c25d0e89900f7b7133095efdc402ca13d1c3305f5&"
        })
        .setTitle("Error")
        .setDescription(`Couldn't find template with id of ${id}`)
    export const TicketSelect = new EmbedBuilder()
        .setColor(0x2a9bf2)
        .setAuthor({
            name: "Astral RolePlay",
            iconURL: "https://cdn.discordapp.com/attachments/1142540077407424512/1160585371642503228/giphy.gif?ex=653e6cdb&is=652bf7db&hm=a51f5f6544b2ab96bd308f3c25d0e89900f7b7133095efdc402ca13d1c3305f5&"
        })
        .setTitle("Support Ticket")
        .setDescription("<:support:1163175087562829876> Επιλέξτε μια κατηγορία με την οποία θα μπορούσαμε να σας βοηθήσουμε και θα σας εξυπηρετήσουμε όσον τον δυνατόν γρηγορότερα!\n<:info:1163175068361293905> Επίσης μην κάνετε άσκοπα/troll tickets")
    export const TicketSelectMenu = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .addOptions(TicketSelectMenuOptions)
                .setPlaceholder("Επιλέξτε μια κατηγορία!")
                .setCustomId("ticket_type")
        ])
    export const TicketCreationEmbedTemplate = (userId: string) => new EmbedBuilder()
        .setColor(0x2a9bf2)
        .setAuthor({
            name: "Astral RolePlay",
            iconURL: "https://cdn.discordapp.com/attachments/1142540077407424512/1160585371642503228/giphy.gif?ex=653e6cdb&is=652bf7db&hm=a51f5f6544b2ab96bd308f3c25d0e89900f7b7133095efdc402ca13d1c3305f5&"
        })
        .setTitle("Ticket φτιάχτηκε επιτυχώς!")
        .setDescription("<:support:1163175087562829876> Υπομονή! Θα σας εξυπηρετήσουμε σύντομα!")
        .addFields([
            {
                name: "Το ticket φτιάχτηκε από:",
                value: `<@${userId}>`,

            }
        ])
    export const TicketControls = new ActionRowBuilder<ButtonBuilder>()
        .addComponents([
            new ButtonBuilder()
                .setCustomId("close_ticket")
                .setStyle(ButtonStyle.Danger)
                .setLabel("Close Ticket")
                .setEmoji("1156587045876142122"),
            new ButtonBuilder()
                .setCustomId("claim_ticket")
                .setStyle(ButtonStyle.Primary)
                .setLabel("Claim Ticket")
                .setEmoji("1163175068361293905"),
        ])
    export const NotATicketErrorEmbed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setAuthor({
            name: "Astral RolePlay",
            iconURL: "https://cdn.discordapp.com/attachments/1142540077407424512/1160585371642503228/giphy.gif?ex=653e6cdb&is=652bf7db&hm=a51f5f6544b2ab96bd308f3c25d0e89900f7b7133095efdc402ca13d1c3305f5&"
        })
        .setTitle("Error")
        .setDescription("Για λόγους ασφαλείας, το command είναι σχεδιασμένο να λειτουργεί μόνο σε tickets")
    export const UserSupportNeeded = (userId: string, channelId: string) => new EmbedBuilder()
        .setColor(0x2a9bf2)
        .setAuthor({
            name: "Astral RolePlay",
            iconURL: "https://cdn.discordapp.com/attachments/1142540077407424512/1160585371642503228/giphy.gif?ex=653e6cdb&is=652bf7db&hm=a51f5f6544b2ab96bd308f3c25d0e89900f7b7133095efdc402ca13d1c3305f5&"
        })
        .setTitle("Ένας χρήστης χρειάζεται βοήθεια!")
        .setDescription("<:info:1163175068361293905> Ένας χρήστης χρειάζεται βοήθεια! Παρακαλώ πηγαίνετε να τον εξυπηρετήσετε!")
        .addFields([
            {
                name: "Χρήστης",
                value: `<@${userId}>`,
                inline: true,
            },
            {
                name: "Κανάλι Support",
                value: `<#${channelId}>`,
                inline: true,
            }
        ])
    export const UserSuggestion = (member: GuildMember, suggestion: string, suggestionStatus?: SuggestionStatus) => new EmbedBuilder()
        .setColor(suggestionStatusColor(suggestionStatus ?? SuggestionStatus.Pending))
        .setAuthor({
            name: member.nickname ?? member.user.displayName,
            iconURL: member.avatarURL() ?? "https://cdn.discordapp.com/attachments/1142540077407424512/1160585371642503228/giphy.gif?ex=653e6cdb&is=652bf7db&hm=a51f5f6544b2ab96bd308f3c25d0e89900f7b7133095efdc402ca13d1c3305f5&"
        })
        .setTitle("Suggestion")
        .setDescription(suggestion)
        .addFields([
            {
                name: "Χρήστης",
                value: `<@${member.user.id}>`,
                inline: true,
            },
            {
                name: "Κατάσταση",
                value: suggestionStatus ?? SuggestionStatus.Pending,
                inline: true,
            }
        ])
        .setFooter({
            "iconURL": "https://cdn.discordapp.com/attachments/1142540077407424512/1160585371642503228/giphy.gif?ex=653e6cdb&is=652bf7db&hm=a51f5f6544b2ab96bd308f3c25d0e89900f7b7133095efdc402ca13d1c3305f5&",
            "text": `Astral Roleplay ||${member.user.id}||`
        })
}