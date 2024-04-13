import { applyDecorators, UsePipes } from "@nestjs/common";
import type { ZodSchema } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation.pipe";

export function Validation(schema: ZodSchema) {
    return applyDecorators(
        UsePipes(new ZodValidationPipe(schema))
    );
}