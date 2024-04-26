import { applyDecorators, UseGuards } from "@nestjs/common";
import { RtJwtAuthGuard } from "../guards/rt.jwt.guard";

export function RtJwtAuth() {
    return applyDecorators(
        UseGuards(RtJwtAuthGuard)
    );
}