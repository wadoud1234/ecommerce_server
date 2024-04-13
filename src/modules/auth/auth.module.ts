import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AtJwtStrategy } from './strategy/at.jwt.strategy';
import { PasswordService } from './password.service';
import { RtJwtStrategy } from './strategy/rt.jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RtJwtStrategy,
    AtJwtStrategy,
    PasswordService
  ],
})
export class AuthModule { }
