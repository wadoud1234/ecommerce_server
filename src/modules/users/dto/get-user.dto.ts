import { z } from "zod";

export const getUserByIdDto = z.object({
    id: z.string().max(255)
})

export type GetUserByIdDto = z.infer<typeof getUserByIdDto>