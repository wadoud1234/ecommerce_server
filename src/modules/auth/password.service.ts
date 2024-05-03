import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import argon2 from "argon2"
import { IJwtPayload } from "./types";
import { AT_TOKEN_EXPIRES_IN, RT_TOKEN_EXPIRES_IN } from "./constants";

export interface IPasswordService {
    hashPassword(str: string): Promise<string>
    verifyHashedPassword(str: string, hash: string): Promise<boolean>,
    signUserJwtToken(payload: IJwtPayload): Promise<string>
    signAuthUserTokens(payload: Omit<IJwtPayload, "type">): Promise<{ at: string, rt: string }>
}

@Injectable()
export class PasswordService implements IPasswordService {
    constructor(private readonly jwt: JwtService) { }

    async hashPassword(str: string): Promise<string> {
        const hashed = await argon2.hash(str)
        return hashed
    }

    async verifyHashedPassword(str: string, hash: string): Promise<boolean> {
        const verified = await argon2?.verify(hash, str)
        return verified
    }

    async signUserJwtToken(payload: IJwtPayload) {
        const { id, email, type, name, image, role } = payload;
        const token = await this.jwt.signAsync({ sub: id, email, name, role, image }, {
            expiresIn: type === "at" ? AT_TOKEN_EXPIRES_IN / 1000 : RT_TOKEN_EXPIRES_IN / 1000,
            secret: type === "at" ? process.env.AT_JWT_SECRET : process.env.RT_JWT_SECRET
        })
        return token
    }
    async signAuthUserTokens(payload: Omit<IJwtPayload, "type">) {
        const [at, rt] = await Promise.all([
            this.signUserJwtToken({ ...payload, type: "at" }),
            this.signUserJwtToken({ ...payload, type: "rt" })
        ])
        return { at, rt }
    }
}