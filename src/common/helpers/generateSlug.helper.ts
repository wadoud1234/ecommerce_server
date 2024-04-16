import slugify from "slugify"

export const generateSlug = (name: string) => {
    const slug = slugify(name, { lower: true, strict: true, trim: true })
    return slug
}