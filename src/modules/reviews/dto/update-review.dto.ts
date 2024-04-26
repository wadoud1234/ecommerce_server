import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const updateReviewDto = z.object({
    comment: z.string().min(8).max(255),
    rating: z.coerce.number().nonnegative().min(0),
    reviewId: z.string().min(8).max(255),
})

// export type UpdateReviewDto = z.infer<typeof updateReviewDto>
export class UpdateReviewDto extends createZodDto(updateReviewDto) { }