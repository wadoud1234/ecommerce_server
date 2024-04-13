import { z } from "zod";

export const forgetPasswordDto = z.object({
    email: z.string().min(8).max(255).email(),
})

export type ForgetPasswordDto = z.infer<typeof forgetPasswordDto>