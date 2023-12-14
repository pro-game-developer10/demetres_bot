import {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ButtonBuilder,
    ButtonStyle,
    OverwriteResolvable,
    OverwriteType,
    Guild,
    GuildMember,
} from "discord.js";
import { SuggestionUtils } from "./suggestionUtils";
import { logoUrl } from "./logoUrl";
import { EmbedVerificationUtils } from "./embedVerification";
import { ConfigUtils } from "./json/configUtils";

export namespace TicketPermissionsInfo {
    export const SupportTicketPermissions = (
        civilianID: string,
        guild: Guild
    ): OverwriteResolvable[] => [
        {
            type: OverwriteType.Member,
            id: civilianID,
            allow: ["ViewChannel"],
        },
        {
            type: OverwriteType.Role,
            id: guild.roles.everyone,
            deny: ["ViewChannel"],
        },
        {
            type: OverwriteType.Role,
            id: ConfigUtils.findOneMentionableByFlags("role","STAFF_ROLE").id,
            allow: ["ViewChannel"],
        },
    ];
    export const DonateTicketPermissions = (
        civilianID: string,
        guild: Guild
    ): OverwriteResolvable[] => [
        {
            type: OverwriteType.Member,
            id: civilianID,
            allow: ["ViewChannel"],
        },
        {
            type: OverwriteType.Role,
            id: guild.roles.everyone,
            deny: ["ViewChannel"],
        },
        {
            type: OverwriteType.Role,
            id: ConfigUtils.findOneMentionableByFlags("role","DONATE_MANAGER_ROLE").id,
            allow: ["ViewChannel"],
        },
    ];
    export const JobTicketPermissions = (
        civilianID: string,
        guild: Guild
    ): OverwriteResolvable[] => [
        {
            type: OverwriteType.Member,
            id: civilianID,
            allow: ["ViewChannel"],
        },
        {
            type: OverwriteType.Role,
            id: guild.roles.everyone,
            deny: ["ViewChannel"],
        },
        {
            type: OverwriteType.Role,
            id: ConfigUtils.findOneMentionableByFlags("role","JOB_MANAGER_ROLE").id,
            allow: ["ViewChannel"],
        },
    ];
    export const ClaimedTicketPermissions = (
        staffId: string,
        guild: Guild
    ): OverwriteResolvable[] => [
        {
            type: OverwriteType.Member,
            id: staffId,
            allow: ["ViewChannel"],
        },
        {
            type: OverwriteType.Role,
            id: guild.roles.everyone,
            deny: ["ViewChannel"],
        },
        {
            type: OverwriteType.Role,
            id: ConfigUtils.findOneMentionableByFlags("role","STAFF_ROLE").id,
            deny: ["ViewChannel"],
        },
        {
            type: OverwriteType.Role,
            id: ConfigUtils.findOneMentionableByFlags("role","JOB_MANAGER_ROLE").id,
            deny: ["ViewChannel"],
        },
        {
            type: OverwriteType.Role,
            id: ConfigUtils.findOneMentionableByFlags("role","DONATE_MANAGER_ROLE").id,
            deny: ["ViewChannel"],
        },
    ];
    export const WFSVCChannelPermissions = (
        civilianID: string,
        guild: Guild
    ): OverwriteResolvable[] => [
        {
            type: OverwriteType.Member,
            id: civilianID,
            allow: ["ViewChannel", "Stream"],
        },
        {
            type: OverwriteType.Role,
            id: guild.roles.everyone,
            deny: ["ViewChannel"],
        },
        {
            type: OverwriteType.Role,
            id: ConfigUtils.findOneMentionableByFlags("role","STAFF_ROLE").id,
            allow: [
                "ViewChannel",
                "MuteMembers",
                "DeafenMembers",
                "MoveMembers",
                "Stream",
            ],
        },
        {
            type: OverwriteType.Role,
            id: ConfigUtils.findOneMentionableByFlags("role","JOB_MANAGER_ROLE").id,
            allow: [
                "ViewChannel",
                "MuteMembers",
                "DeafenMembers",
                "MoveMembers",
                "Stream",
            ],
        },
        {
            type: OverwriteType.Role,
            id: ConfigUtils.findOneMentionableByFlags("role","DONATE_MANAGER_ROLE").id,
            allow: [
                "ViewChannel",
                "MuteMembers",
                "DeafenMembers",
                "MoveMembers",
                "Stream",
            ],
        },
    ];
}

const TicketSelectMenuOptions = [
    {
        emoji: "1163175087562829876",
        label: "Support",
        description: "Χρησιμοποίησε αυτήν την επιλογή έαν θες βοήθεια",
    },
    {
        emoji: "1163175068361293905",
        label: "Job",
        description:
            "Χρησιμοποίησε αυτήν την επιλογή έαν θες να πάρεις κάποιο (in-game) job",
    },
    {
        emoji: "1163175036337803356",
        label: "Donate",
        description:
            "Χρησιμοποίησε αυτήν την επιλογή έαν θες να κάνεις donate στον server",
    },
].map(({ emoji, label, description }) =>
    new StringSelectMenuOptionBuilder()
        .setDescription(description)
        .setEmoji(emoji)
        .setLabel(label)
        .setValue(label.toLowerCase())
);

export namespace EmbedTemplate {
    export const InvalidTemplateError = (id: string) =>
        new EmbedBuilder()
            .setColor(0xff0000)
            .setAuthor({
                name: "AstralRP",
                iconURL: logoUrl(),
            })
            .setTitle("Error")
            .setDescription(`Couldn't find template with id of ${id}`);
    export const TicketSelect = new EmbedBuilder()
        .setColor(0x2a9bf2)
        .setAuthor({
            name: "Astral RolePlay",
            iconURL: logoUrl(),
        })
        .setTitle("Support Ticket")
        .setDescription(
            "<:support:1163175087562829876> Επιλέξτε μια κατηγορία με την οποία θα μπορούσαμε να σας βοηθήσουμε και θα σας εξυπηρετήσουμε όσον τον δυνατόν γρηγορότερα!\n" +
                "<:info:1163175068361293905> Επίσης μην κάνετε άσκοπα/troll tickets"
        );
    export const TicketSelectMenu = new ActionRowBuilder().addComponents([
        new StringSelectMenuBuilder()
            .addOptions(TicketSelectMenuOptions)
            .setPlaceholder("Επιλέξτε μια κατηγορία!")
            .setCustomId("ticket_type"),
    ]);
    export const TicketCreationEmbedTemplate = (userId: string) =>
        new EmbedBuilder()
            .setColor(0x2a9bf2)
            .setAuthor({
                name: "Astral RolePlay",
                iconURL: logoUrl(),
            })
            .setTitle("Ticket φτιάχτηκε επιτυχώς!")
            .setDescription(
                "<:support:1163175087562829876> Υπομονή! Θα σας εξυπηρετήσουμε σύντομα!"
            )
            .addFields([
                {
                    name: "Το ticket φτιάχτηκε από:",
                    value: `<@${userId}>`,
                },
            ]);
    export const TicketControls =
        new ActionRowBuilder<ButtonBuilder>().addComponents([
            new ButtonBuilder()
                .setCustomId("close_ticket")
                .setStyle(ButtonStyle.Danger)
                .setLabel("Close Ticket")
                .setEmoji("1156587045876142122"),
            new ButtonBuilder()
                .setCustomId("claim_ticket")
                .setStyle(ButtonStyle.Primary)
                .setLabel("Claim Ticket")
                .setEmoji("1163175068361293905")
                .setDisabled(true),
        ]);
    export const NotATicketErrorEmbed = new EmbedBuilder()
        .setColor(0xff0000)
        .setAuthor({
            name: "Astral RolePlay",
            iconURL: logoUrl(),
        })
        .setTitle("Error")
        .setDescription(
            "Για λόγους ασφαλείας, το command είναι σχεδιασμένο να λειτουργεί μόνο σε tickets"
        );
    export const UserSupportNeeded = (userId: string, channelId: string) =>
        new EmbedBuilder()
            .setColor(0x2a9bf2)
            .setAuthor({
                name: "Astral RolePlay",
                iconURL: logoUrl(),
            })
            .setTitle("Ένας χρήστης χρειάζεται βοήθεια!")
            .setDescription(
                "<:info:1163175068361293905> Ένας χρήστης χρειάζεται βοήθεια! Παρακαλώ πηγαίνετε να τον εξυπηρετήσετε!"
            )
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
                },
            ]);
    export const UserSuggestion = (
        member: GuildMember,
        suggestion: string,
        suggestionStatus?: SuggestionUtils.SuggestionStatus
    ) =>
        new EmbedBuilder()
            .setColor(
                SuggestionUtils.suggestionStatusColor(
                    suggestionStatus ?? SuggestionUtils.SuggestionStatus.Pending
                )
            )
            .setAuthor({
                name: member.nickname ?? member.user.displayName,
                iconURL: member.avatarURL() ?? logoUrl(),
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
                    value:
                        suggestionStatus ??
                        SuggestionUtils.SuggestionStatus.Pending,
                    inline: true,
                },
            ])
            .setFooter({
                iconURL: logoUrl(),
                text: `Astral Roleplay ||${member.user.id}||`,
            });
    export interface EmbedGenOptions {
        profile: EmbedVerificationUtils.EmbedAuthorProfile;
        member: GuildMember;
        colorType: EmbedVerificationUtils.EmbedColorType;
        title?: string;
        description?: string;
        footer?: string;
        footerIcon?: boolean;
    }
    export const EmbedGen = ({
        profile,
        member,
        colorType,
        title,
        description,
        footer,
        footerIcon,
    }: EmbedGenOptions) => {
        const builder = new EmbedBuilder();
        switch (profile) {
        case EmbedVerificationUtils.EmbedAuthorProfile.Official:
            builder.setAuthor({
                name: "Astral RolePlay",
                iconURL: logoUrl(),
            });
            break;
        case EmbedVerificationUtils.EmbedAuthorProfile.User:
            builder.setAuthor({
                name:
                        member.user.displayName ??
                        member.user.username ??
                        "Astral Roleplay User",
                iconURL:
                        member.user.displayAvatarURL() ??
                        member.user.avatarURL() ??
                        member.user.defaultAvatarURL ??
                        logoUrl(),
            });
            break;
        case EmbedVerificationUtils.EmbedAuthorProfile.UserWithOfficialPFP:
            builder.setAuthor({
                name:
                        member.user.displayName ??
                        member.user.username ??
                        "Astral Roleplay User",
                iconURL: logoUrl(),
            });
            break;
        case EmbedVerificationUtils.EmbedAuthorProfile.None:
            break;
        case EmbedVerificationUtils.EmbedAuthorProfile.Team:
            builder.setAuthor({
                name: "Astral RolePlay Team",
                iconURL: logoUrl(),
            });
            break;
        }
        builder.setColor(colorType);
        if (title) builder.setTitle(title);
        if (description) builder.setDescription(description);
        if (footer)
            builder.setFooter({
                text: footer,
                iconURL: footerIcon ? logoUrl() : undefined,
            });
        return builder;
    };
}
