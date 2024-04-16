import { z } from 'zod';

export const updateProductDto = z.object({
    name: z.string().min(8).max(255),
    price: z.coerce.number().nonnegative().min(1),
    quantity: z.coerce.number().nonnegative().min(0),
    description: z.string().min(8).max(255),
    image: z.string().min(8).max(255),
})

export type UpdateProductDto = z.infer<typeof updateProductDto>