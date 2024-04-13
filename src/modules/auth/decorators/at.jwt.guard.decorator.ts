import { applyDecorators, UseGuards, UsePipes } from "@nestjs/common";
import { AtJwtAuthGuard } from "../guards/at.jwt.guard";

export function AtJwtAuth() {
    return applyDecorators(
        UseGuards(AtJwtAuthGuard)
    );
}