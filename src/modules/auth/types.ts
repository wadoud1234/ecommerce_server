export type IJwtPayload = {
    id: string,
    name: string,
    email: string,
    image: string,
    role: "user" | "admin",
    type: "at" | "rt"
}