import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const loginUserDto = z.object({
    email: z.string().min(8).max(255).email().describe("user login email"),
    password: z.string().min(8).max(255).describe("user login password"),
})

// export type LoginUserDto = z.infer<typeof loginUserDto>
export class LoginUserDto extends createZodDto(loginUserDto) { }