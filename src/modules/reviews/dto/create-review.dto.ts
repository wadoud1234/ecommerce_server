import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const createReviewDto = z.object({
    productId: z.string().min(8).max(255),
    userId: z.string().min(8).max(255),
    rating: z.coerce.number().nonnegative().min(0),
    comment: z.string().min(8).max(255),
})

// export type CreateReviewDto = z.infer<typeof createReviewDto>
export class CreateReviewDto extends createZodDto(createReviewDto) { }