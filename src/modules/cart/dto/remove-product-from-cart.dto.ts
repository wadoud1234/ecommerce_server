import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const removeProductFromCartDto = z.object({
    productId: z.string().min(5).max(255),
})

// export type RemoveProductFromCartDto = z.infer<typeof removeProductFromCartDto>
export class RemoveProductFromCartDto extends createZodDto(removeProductFromCartDto) { }