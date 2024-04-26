import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const addProductToCartDto = z.object({
    productId: z.string().min(5).max(255),
    quantity: z.coerce.number().min(0),
    storeId: z.string().min(5).max(255),
    productPrice: z.coerce.number().min(0)
})

// export type AddProductToCartDto = z.infer<typeof addProductToCartDto>
export class AddProductToCartDto extends createZodDto(addProductToCartDto) { }