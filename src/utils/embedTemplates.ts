import { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";

const TicketSelectMenuOptions = [
    {
        emoji: "telephone_reciever",
        label: "Support",
        description: "Use this option if you need help"
    },
    {
        emoji: "game_die",
        label: "Job",
        description: "Use this option if you want to join a job"
    },
    {
        emoji: "money_with_wings",
        label: "Donate",
        description: "Use this option if you want to donate to the server"
    }
].map(({ emoji, label, description }) => new StringSelectMenuOptionBuilder()
    .setDescription(description)
    .setEmoji(`:${emoji}:`)
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
            name: "AstralRP"
        })
        .setTitle("Support Ticket")
        .setDescription("You can use our support tickets feature when you need support about the server. Don't abuse this though")
    export const TicketSelectMenu = new ActionRowBuilder()
        .addComponents([
            new StringSelectMenuBuilder()
                .addOptions(TicketSelectMenuOptions)
        ])
    export const TicketCreationEmbedTemplate = new EmbedBuilder()
        .setColor(0x2a9bf2)
        .setAuthor({
            name: "AstralRP"
        })
        .setTitle("Ticket Created Successfully!")
        .setDescription("Be patient! A staff is going to assist you soon")
}