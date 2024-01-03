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
import { SuggestionUtils } from "../suggestionUtils";
import { logoUrl } from "../logoUrl";
import { EmbedVerificationUtils } from "./embedVerification";
import { ConfigUtils } from "../json/configUtils";

/**
 * Channel permissions defined for each role type
 */
export namespace TicketPermissionsInfo {
    /**
     * Represents the permissions of each role that has access to a SUPPORT ticket
     * @constructor
     * @param civilianID - ID of the civillian/member
     * @param guild - guild object in which the ticket channel is going to be created
     */
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
            id: ConfigUtils.findOneMentionableByFlags("role", "STAFF_ROLE").id,
            allow: ["ViewChannel"],
        },
    ];
    /**
     * Represents the permissions of each role that has access to a DONATION ticket
     * @constructor
     * @param civilianID - ID of the civillian/member
     * @param guild - guild object in which the ticket channel is going to be created
     */
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
            id: ConfigUtils.findOneMentionableByFlags(
                "role",
                "DONATE_MANAGER_ROLE"
            ).id,
            allow: ["ViewChannel"],
        },
    ];
    /**
     * Represents the permissions of each role that has access to a JOB RECRUITMENT ticket
     * @constructor
     * @param civilianID - ID of the civillian/member
     * @param guild - guild object in which the ticket channel is going to be created
     */
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
            id: ConfigUtils.findOneMentionableByFlags(
                "role",
                "JOB_MANAGER_ROLE"
            ).id,
            allow: ["ViewChannel"],
        },
    ];
    /**
     * Represents the permissions of each role that has access to a ticket which was claimed by a staff
     * @constructor
     * @param staffId - ID of the staff member which claimed the ticket
     * @param guild - guild object in which the ticket channel is going to be created
     */
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
            id: ConfigUtils.findOneMentionableByFlags("role", "STAFF_ROLE").id,
            deny: ["ViewChannel"],
        },
        {
            type: OverwriteType.Role,
            id: ConfigUtils.findOneMentionableByFlags(
                "role",
                "JOB_MANAGER_ROLE"
            ).id,
            deny: ["ViewChannel"],
        },
        {
            type: OverwriteType.Role,
            id: ConfigUtils.findOneMentionableByFlags(
                "role",
                "DONATE_MANAGER_ROLE"
            ).id,
            deny: ["ViewChannel"],
        },
    ];
    /**
     * Represents the permissions of each role that has access to a WFS VC support channel
     * @constructor
     * @param civilianID - ID of the civillian/member
     * @param guild - guild object in which the support channel is going to be created
     */
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
            id: ConfigUtils.findOneMentionableByFlags("role", "STAFF_ROLE").id,
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
            id: ConfigUtils.findOneMentionableByFlags(
                "role",
                "JOB_MANAGER_ROLE"
            ).id,
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
            id: ConfigUtils.findOneMentionableByFlags(
                "role",
                "DONATE_MANAGER_ROLE"
            ).id,
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

/**
 * Options for the Ticket Select Menu
 */
const TicketSelectMenuOptions = [
    {
        emoji: ConfigUtils.getEmojiByType("icon-ticket-support") ?? /* Ticket Emoji */ "\uD83C\uDFAB",
        label: "Support",
        description: "Χρησιμοποίησε αυτήν την επιλογή έαν θες βοήθεια",
    },
    {
        emoji: ConfigUtils.getEmojiByType("icon-ticket-job") ?? /* Briefcase emoji */ "\uD83D\uDCBC",
        label: "Job",
        description:
            "Χρησιμοποίησε αυτήν την επιλογή έαν θες να πάρεις κάποιο (in-game) job",
    },
    {
        emoji: ConfigUtils.getEmojiByType("icon-ticket-donate") ?? /* Money Emoji */ "\uD83D\uDCB5",
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

/**
 * Predefined templates for reusable templates
 */
export namespace EmbedTemplate {
    /**
     * Represents an invalid template
     * @param id - ID of the template
     */
    export const InvalidTemplateError = (id: string) =>
        new EmbedBuilder()
            .setColor(0xff0000)
            .setAuthor({
                name: "AstralRP",
                iconURL: logoUrl(),
            })
            .setTitle("Error")
            .setDescription(`Couldn't find template with id of ${id}`);
    /**
     * Represents the Ticket Selection Embed
     */
    export const TicketSelect = new EmbedBuilder()
        .setColor(0x2a9bf2)
        .setAuthor({
            name: "Astral RolePlay",
            iconURL: logoUrl(),
        })
        .setTitle("Support Ticket")
        .setDescription(
            `${ConfigUtils.getEmojiByType("icon-support", true) ?? ":ticket:"} Επιλέξτε μια κατηγορία με την οποία θα μπορούσαμε να σας βοηθήσουμε και θα σας εξυπηρετήσουμε όσον τον δυνατόν γρηγορότερα!\n` +
                `${ConfigUtils.getEmojiByType("icon-info", true) ?? ":information_source:"} Επίσης μην κάνετε άσκοπα/troll tickets`
        );
    /**
     * Represents the actual selection box for the Ticket Selection Embed
     */
    export const TicketSelectMenu = new ActionRowBuilder().addComponents([
        new StringSelectMenuBuilder()
            .addOptions(TicketSelectMenuOptions)
            .setPlaceholder("Επιλέξτε μια κατηγορία!")
            .setCustomId("ticket_type"),
    ]);
    /**
     * Represents an embed that gets sent once a ticket is created
     * @constructor
     * @param userId - ID of the user who created the ticket
     */
    export const TicketCreationEmbedTemplate = (userId: string) =>
        new EmbedBuilder()
            .setColor(0x2a9bf2)
            .setAuthor({
                name: "Astral RolePlay",
                iconURL: logoUrl(),
            })
            .setTitle("Ticket φτιάχτηκε επιτυχώς!")
            .setDescription(
                `${ConfigUtils.getEmojiByType("icon-support", true) ?? ":ticket:"} Υπομονή! Θα σας εξυπηρετήσουμε σύντομα!`
            )
            .addFields([
                {
                    name: "Το ticket φτιάχτηκε από:",
                    value: `<@${userId}>`,
                },
            ]);
    /**
     * Represents the control buttons for managing a ticket
     */
    export const TicketControls =
        new ActionRowBuilder<ButtonBuilder>().addComponents([
            new ButtonBuilder()
                .setCustomId("close_ticket")
                .setStyle(ButtonStyle.Danger)
                .setLabel("Close Ticket")
                .setEmoji(ConfigUtils.getEmojiByType("icon-ticket-close") ?? /* File Cabinet Emoji */ "\uD83D\uDDC4\uFE0F"),
            new ButtonBuilder()
                .setCustomId("claim_ticket")
                .setStyle(ButtonStyle.Primary)
                .setLabel("Claim Ticket")
                .setEmoji(ConfigUtils.getEmojiByType("icon-ticket-claim") ?? /* Triangular Flag Emoji */ "\uD83D\uDEA9")
                .setDisabled(true),
        ]);
    /**
     * Represents an error when a channel is not a ticket channel
     */
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
    /**
     * Represents an embed notifying the server staff that a user needs support
     * @constructor
     * @param userId - ID of the user
     * @param channelId - ID of the ticket channel
     */
    export const UserSupportNeeded = (userId: string, channelId: string) =>
        new EmbedBuilder()
            .setColor(0x2a9bf2)
            .setAuthor({
                name: "Astral RolePlay",
                iconURL: logoUrl(),
            })
            .setTitle("Ένας χρήστης χρειάζεται βοήθεια!")
            .setDescription(
                `${ConfigUtils.getEmojiByType("icon-info", true) ?? ":information_source:"} Ένας χρήστης χρειάζεται βοήθεια! Παρακαλώ πηγαίνετε να τον εξυπηρετήσετε!`
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
    /**
     * Represents a user suggestion embed
     * @constructor
     * @param member - Member who created the suggestion
     * @param suggestion - The suggestion's description
     * @param suggestionStatus - The status of the suggestion
     */
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
    /**
     * Options for generating an embed using the /embed command
     */
    export interface EmbedGenOptions {
        /**
         * The profile entity that represents the author of the embed
         */
        profile: EmbedVerificationUtils.EmbedAuthorProfile;
        /**
         * The member who made the embed
         */
        member: GuildMember;
        /**
         * The color used by the embed
         */
        colorType: EmbedVerificationUtils.EmbedColorType;
        /**
         * Optional embed title
         */
        title?: string;
        /**
         * Optional embed description
         */
        description?: string;
        /**
         * Optional embed footer
         */
        footer?: string;
        /**
         * Whether or not the footer text is included with an icon
         */
        footerIcon?: boolean;
    }
    /**
     * Represents a user-generated embed using the /embed command
     * @constructor
     * @param {EmbedGenOptions} options - Options for generating the embed
     */
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
