import { z } from "zod";

export const createProductDto = z.object({
    name: z.string().min(8).max(255),
    price: z.coerce.number().nonnegative().min(1),
    quantity: z.coerce.number().nonnegative().min(0),
    storeId: z.string().min(8).max(255),
    categoryId: z.string().min(8).max(255),
    description: z.string().min(8).max(255),
    image: z.string().min(8).max(255),
})

export type CreateProductDto = z.infer<typeof createProductDto>