import { z } from 'zod';

export const createUserSchema = z.
    object({
        name: z.string().min(8).max(255),
        email: z.string().min(8).max(255).email(),
        passwordHash: z.string().min(8).max(255),
    })
    .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;