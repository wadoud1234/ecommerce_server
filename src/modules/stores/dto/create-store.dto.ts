import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const createStoreDto = z.object({
    name: z.string().min(5).max(255),
    image: z.string(),
    isPublic: z.boolean(),
    description: z.string(),
})

// export type CreateStoreDto = z.infer<typeof createStoreDto>
export class CreateStoreDto extends createZodDto(createStoreDto) { }