import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const registerUserDto = z.object({
    name: z.string()
        .min(5, { message: 'Name must be at least 5 characters long' })
        .max(255, { message: 'Name must be at most 255 characters long' }),

    email: z.string()
        .min(8, { message: 'Email must be at least 8 characters long' })
        .max(255, { message: 'Email must be at most 255 characters long' })
        .email({ message: 'Invalid email address' }),

    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(255, { message: 'Password must be at most 255 characters long' }),

    confirmPassword: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(255, { message: 'Password must be at most 255 characters long' }),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})


// class is required for using DTO as a type
export class RegisterUserDto extends createZodDto(registerUserDto) { }