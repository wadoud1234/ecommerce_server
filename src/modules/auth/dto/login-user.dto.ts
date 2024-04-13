import { z } from "zod";

export const loginUserDto = z.object({
    email: z.string().min(8).max(255).email(),
    password: z.string().min(8).max(255),
})

export type LoginUserDto = z.infer<typeof loginUserDto>