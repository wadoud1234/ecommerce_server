import { generateSlug } from "./generateSlug.helper";

export function generateSearchText(name: string, description: string) {
    const beforeGetSlugged = `${name} ${description}`
    return generateSlug(beforeGetSlugged)
}