import { z } from "zod";

export const updateStoreStatusDto = z.object({
    isPublic: z.boolean(),
})

export type UpdateStoreStatusDto = z.infer<typeof updateStoreStatusDto>