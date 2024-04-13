import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import argon2 from "argon2"

export interface IPasswordService {
    hashPassword(str: string): Promise<string>
    verifyHashedPassword(str: string, hash: string): Promise<boolean>,
    signUserJwtToken(id: string, email: string, type: "at" | "rt"): Promise<string>
    signAuthUserTokens(id: string, email: string): Promise<{ at: string, rt: string }>
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

    async signUserJwtToken(id: string, email: string, type: "at" | "rt") {
        const token = await this.jwt.signAsync({ sub: id, email, type }, {
            expiresIn: type === "at" ? 60 * 15 : 60 * 60 * 24 * 7,
            secret: type === "at" ? process.env.AT_JWT_SECRET : process.env.RT_JWT_SECRET
        })
        return token
    }
    async signAuthUserTokens(id: string, email: string) {
        const [at, rt] = await Promise.all([
            this.signUserJwtToken(id, email, "at"),
            this.signUserJwtToken(id, email, "rt")
        ])
        return { at, rt }
    }
}