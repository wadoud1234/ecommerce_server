import { createZodDto } from "nestjs-zod"
import { z } from "zod"

export const updateStoreDto = z.object({
    name: z.string().min(5).max(255),
})

// export type UpdateStoreDto = z.infer<typeof updateStoreDto>
export class UpdateStoreDto extends createZodDto(updateStoreDto) { }