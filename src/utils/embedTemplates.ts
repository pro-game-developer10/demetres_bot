import { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";

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
            name: "AstralRP"
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
    export const TicketCreationEmbedTemplate = new EmbedBuilder()
        .setColor(0x2a9bf2)
        .setAuthor({
            name: "AstralRP"
        })
        .setTitle("Ticket φτιάχτηκε επιτυχώς!")
        .setDescription("Υπομονή! Θα σας εξυπηρετήσουμε σύντομα!")
}