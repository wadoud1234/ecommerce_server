import { z } from "zod";

export const updatePasswordDto = z.object({
    email: z.string().min(8).max(255).email(),
    token: z.string().min(8).max(255),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export type UpdatePasswordDto = z.infer<typeof updatePasswordDto>