import { z } from "zod";

export const disActivateUserDto = z.object({
    id: z.string().max(255),
    token: z.string().min(8).max(255),
})

export type DisActivateUserDto = z.infer<typeof disActivateUserDto>