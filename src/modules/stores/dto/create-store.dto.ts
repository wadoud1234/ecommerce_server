import { z } from "zod";

export const createStoreDto = z.object({
    name: z.string().min(5).max(255),
    userId: z.string().min(5).max(255),
})

export type CreateStoreDto = z.infer<typeof createStoreDto>