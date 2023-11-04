import { Client, Guild } from "discord.js";
import { dotenv } from "./dotenv";

function isClient(subject: Client | Guild): subject is Client {
    return Object.hasOwn(subject, "isReady")
}

export function logoUrl(subject?: Client | Guild): string {
    if (!subject) return dotenv("FALLBACK_LOGO_URL")
    const subjectAsGuild = isClient(subject) ? subject.guilds.cache.get(dotenv("DEFAULT_GUILD_ID")) : subject
    const logoUrl = subjectAsGuild?.iconURL() ?? dotenv("FALLBACK_LOGO_URL")
    return logoUrl
}