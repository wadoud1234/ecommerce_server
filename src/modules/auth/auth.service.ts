import { BadRequestException, forwardRef, HttpException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DisActivateUserDto } from './dto/disactivate-user.dto';
import { IUsersEntity } from '../users/entities/users.entity';
import type { SuccessMessageResponseType } from 'src/types/responses.type';
import { UserRegisteredEvent } from './events/user.registered..event';
import { EventEmitter2 } from "@nestjs/event-emitter"
import { PasswordService } from './password.service';

export interface IAuthService {
    loginUser(dto: LoginUserDto): Promise<{ at: string, rt: string }>,
    registerUser(dto: RegisterUserDto): Promise<SuccessMessageResponseType>,
    forgetPassword(dto: ForgetPasswordDto): Promise<SuccessMessageResponseType>,
    updatePassword(dto: UpdatePasswordDto): Promise<SuccessMessageResponseType>,
    disActivateUser(dto: DisActivateUserDto): Promise<SuccessMessageResponseType>,
}


@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(forwardRef(() => UsersRepository)) private readonly usersRepository: UsersRepository,
        private readonly passwordService: PasswordService,
    ) { }


    async loginUser(dto: LoginUserDto): Promise<{ at: string, rt: string } | any> {
        const { email, password } = dto
        const user = await this.usersRepository.getUserByEmail(email)

        if (!user?.email) return new BadRequestException("Email or password incorrect")

        const passwordHashVerified = await this.passwordService.verifyHashedPassword(password, user.passwordHash)
        if (!passwordHashVerified) throw new BadRequestException("Email or password incorrect")

        const token = await this.passwordService.signAuthUserTokens(user.id, user.email)
        const something = await this.updateRefreshTokenHash(token.rt, user.id)
        const { at, rt } = token
        return { at, rt }
    }

    async registerUser(dto: RegisterUserDto): Promise<SuccessMessageResponseType> {
        const { name, email, password } = dto

        const existedUser = await this.usersRepository.getUserByEmail(email)
        if (existedUser?.email) {
            console.log("EXISTED USER");
            throw new HttpException("User already exists", 400)
        }

        const passwordHash = await this.passwordService.hashPassword(password)
        const user = await this.usersRepository.createUser({ name, email, passwordHash })

        const userRegisteredEvent = new UserRegisteredEvent(user.email, user.name)
        // this.eventEmitter.emit("user.registered", userRegisteredEvent)
        return { success: true, message: "User Created , try login" }
    }

    async forgetPassword(dto: ForgetPasswordDto): Promise<SuccessMessageResponseType> {
        const { email } = dto
        const user = await this.usersRepository.getUserByEmail(email)

        if (!user?.email) return { success: false, message: "User not found" }
        // TODO update user with forgetPasswordToken
        // TODO send email with forgetPasswordToken
        // get redirected to another message page , verify your email checkbox
        return { success: true, message: "Email sent to your address" }
    }

    async updatePassword(dto: UpdatePasswordDto): Promise<SuccessMessageResponseType> {
        const { email, password, confirmPassword, token } = dto

        const user = await this.usersRepository.getUserByEmail(email)

        if (!user?.email) return { success: false, message: "User not found" }

        // TODO verify that token is valid 
        // TODO verify that token is not expired
        // TODO verify that this is the same user who sent the token 
        // TODO hash the new Password 
        // update the user hash 
        // update the user forgetPasswordToken
        // return success true with a message of updated password success
        return { success: true, message: "password didn't updated yet , TODO" }
    }

    async disActivateUser(dto: DisActivateUserDto): Promise<SuccessMessageResponseType> {
        const { id, token } = dto
        const user = await this.usersRepository.getUserById(id)
        if (!user?.email) return { success: false, message: "User not found" }
        // TODO verifi disactivateToken is valid 
        // TODO verify disactivateToken is not expired
        // TODO verify that this is the same user who sent the token
        // TODO update user with disactivateToken
        // TODO update user with activate false
        // TODO return success true with message user has disactivated
        return { success: true, message: "User didn't get disactivated yet , TODO" }
    }

    async updateRefreshTokenHash(rt: string, id: string): Promise<boolean> {
        const hashedToken = await this.passwordService.hashPassword(rt)
        const updateToken = await this.usersRepository.updateUserAuthRefreshToken(hashedToken, id)
        return true;
    }

    async logout(id: string) {
        const updated = await this.usersRepository.updateUserAuthRefreshToken("", id)
        return updated
    }

    async refreshAccessToken(id: string, rt: string) {
        const user = await this.usersRepository.getUserById(id)
        if (!user?.email) throw new UnauthorizedException()

        const actualRefreshToken = await this.usersRepository.getAuthTokens(user.id).then(data => data?.RefreshToken)
        if (!actualRefreshToken) throw new UnauthorizedException("Invalid Refresh Token")
        const rtHashVerified = await this.passwordService.verifyHashedPassword(rt, actualRefreshToken)
        if (rtHashVerified) throw new UnauthorizedException("Invalid Refresh Token")

        const tokens = await this.passwordService.signAuthUserTokens(user.id, user.email)
        await this.updateRefreshTokenHash(tokens.rt, user.id)

        return tokens
    }
}
