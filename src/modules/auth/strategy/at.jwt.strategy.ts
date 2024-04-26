import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/users.repository';
import { config } from 'dotenv';

config()

type Payload = { sub: string, email: string }

@Injectable()
export class AtJwtStrategy extends PassportStrategy(Strategy, "at-jwt") {
    token: any
    constructor(private readonly usersRepository: UsersRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.AT_JWT_SECRET,
        });
    }

    async validate(payload: Payload) {
        const { sub: id } = payload
        console.log({ Auth: id });

        const user = await this.usersRepository.getUserById(id)
        if (!user?.email) return null
        return user;
    }
}
