import { z } from 'zod';

export const updateUserSchema = z.
    object({
        name: z.string().min(8).max(255),
    })
    .required();

export type UpdateUserDto = z.infer<typeof updateUserSchema>;