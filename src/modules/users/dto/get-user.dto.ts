import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const getUserByIdDto = z.object({
    id: z.string().max(255)
})

// export type GetUserByIdDto = z.infer<typeof getUserByIdDto>
export class GetUserByIdDto extends createZodDto(getUserByIdDto) { }