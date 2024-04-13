import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/users.repository';
import { config } from 'dotenv';

config()

type Payload = { sub: string, email: string }

@Injectable()
export class RtJwtStrategy extends PassportStrategy(Strategy, "rt-jwt") {
    constructor(private readonly usersRepository: UsersRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.RT_JWT_SECRET,
            passReqToCallback: true
        });
    }

    async validate(req: Request, payload: Payload) {
        console.log({ req });
        const token = req.headers.get("authorization")?.split(" ")[1]
        const { sub: id } = payload
        const user = await this.usersRepository.getUserById(id)
        if (!user?.email) return null
        return { rt: token || null, id };
    }
}