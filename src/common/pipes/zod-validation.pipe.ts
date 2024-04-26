import { type PipeTransform, type ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodError, type ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) { }

    transform(value: unknown, metadata: ArgumentMetadata) {
        try {
            const parsedValue = this.schema.parse(value);
            return parsedValue;
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                console.error({
                    issues: error.issues,
                    errors: error.errors,
                    formErrors: error.formErrors,
                    message: JSON.parse(error.message),
                    format: error.format()
                }
                )
            }
            throw new BadRequestException('Validation failed');
        }
    }
}
