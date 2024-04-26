import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const createProductDto = z.object({
    name: z.string().min(5).max(255),
    price: z.coerce.number().nonnegative().min(1),
    quantity: z.coerce.number().nonnegative().min(0),
    storeSlug: z.string().min(5).max(255),
    // categoryId: z.string().min(5).max(255),
    description: z.string().max(500),
    image: z.string(),
})

// export type CreateProductDto = z.infer<typeof createProductDto>
export class CreateProductDto extends createZodDto(createProductDto) { }