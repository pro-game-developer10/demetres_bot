export namespace EmbedVerificationUtils {
    export enum EmbedAuthorProfile {
        Official = "Official",
        User = "User",
        UserWithOfficialPFP = "User With Official PFP",
        None = "None",
        Team = "Official (as team)",
    }
    export enum EmbedColorType {
        Red = 0xff0000,
        Orange = 0xff4500,
        Yellow = 0xffaa00,
        Lime = 0x10ff45,
        Blue = 0x2a9bf2,
        Purple = 0x5a3ba2,
        None = Number(null),
    }
    interface ColorTypeVerificationResult {
        isValid: boolean,
        profile: EmbedColorType
    }
    export const possibleColorTypeValues = ["red", "orange", "yellow", "lime", "blue", "purple", "none"]
    // TOAD: Switched to a map based approach and remove the switch statement entirely
    export function verifyColorType(colorName: string): ColorTypeVerificationResult {
        let result = { isValid: true, profile: EmbedColorType.None }
        switch (colorName.toLowerCase()) {
            case "red":
                result.profile = EmbedColorType.Red
                break
            case "orange":
                result.profile = EmbedColorType.Orange
                break
            case "yellow":
                result.profile = EmbedColorType.Yellow
                break
            case "lime":
                result.profile = EmbedColorType.Lime
                break
            case "blue":
                result.profile = EmbedColorType.Blue
                break
            case "purple":
                result.profile = EmbedColorType.Purple
                break
            case "none":
                result.profile = EmbedColorType.None
                break
            default:
                result.isValid = false
                return result
        }
        return result
    }
    interface AuthorProfileVerificationResult {
        isValid: boolean,
        profile: EmbedAuthorProfile
    }
    export const possibleAuthorProfileValues = {
        official: [EmbedAuthorProfile.Official.toLowerCase(), "official", "server"],
        user: [EmbedAuthorProfile.User.toLowerCase(), "user", "member", "self"],
        officialUser: [EmbedAuthorProfile.UserWithOfficialPFP.toLowerCase(), "userofficial", "userasofficial", "userwithofficialpfp", "officialuser", "memberofficial", "memberasofficial", "memberwithofficialpfp", "officialmember", "selfofficial", "selfasofficial", "selfwithofficialpfp", "officialself"],
        none: [EmbedAuthorProfile.None.toLowerCase(), "none", "null", "default", "noprofile"],
        officialTeam: [EmbedAuthorProfile.Team.toLowerCase(), "officialteam", "officialserverteam", "officialguildteam", "serverteam", "guildteam"]
    }
    export const getPossibleAuthorProfileValuesAsMapped = () => {
        const values = Object.values(possibleAuthorProfileValues).reduce((prev, val) => [...prev, ...val])
        const result: { [i: string]: string } = {}
        values.forEach(value => {
            result[value] = value
        })
        return result
    }
    export function verifyAuthorProfile(profileName: string): AuthorProfileVerificationResult {
        let result = { isValid: true, profile: EmbedAuthorProfile.None }
        switch (true) {
            case possibleAuthorProfileValues.official.includes(profileName.toLowerCase()):
                result.profile = EmbedAuthorProfile.Official
                break
            case possibleAuthorProfileValues.user.includes(profileName.toLowerCase()):
                result.profile = EmbedAuthorProfile.User
                break
            case possibleAuthorProfileValues.officialUser.includes(profileName.toLowerCase()):
                result.profile = EmbedAuthorProfile.UserWithOfficialPFP
                break
            case possibleAuthorProfileValues.none.includes(profileName.toLowerCase()):
                result.profile = EmbedAuthorProfile.None
                break
            case possibleAuthorProfileValues.officialTeam.includes(profileName.toLowerCase()):
                result.profile = EmbedAuthorProfile.Team
                break
            default:
                result.isValid = false
                return result
        }
        return result
    }
}
