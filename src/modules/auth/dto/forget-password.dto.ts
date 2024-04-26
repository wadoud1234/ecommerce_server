import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const forgetPasswordDto = z.object({
    email: z.string().min(8).max(255).email(),
})

export class ForgetPasswordDto extends createZodDto(forgetPasswordDto) { }