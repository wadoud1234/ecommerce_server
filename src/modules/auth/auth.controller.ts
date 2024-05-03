import { Body, Controller, Get, Logger, Patch, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Validation } from 'src/common/decorators/validation.decorator';
import { RegisterUserDto, registerUserDto } from './dto/register-user.dto';
import { LoginUserDto, loginUserDto } from './dto/login-user.dto';
import { ForgetPasswordDto, forgetPasswordDto } from './dto/forget-password.dto';
import { updatePasswordDto, UpdatePasswordDto } from './dto/update-password.dto';
import { DisActivateUserDto, disActivateUserDto } from './dto/disactivate-user.dto';
import type { SuccessMessageResponseType } from 'src/types/responses.type';
import { RtJwtAuth } from './decorators/rt.jwt.guard.decorator';
import { AtJwtAuth } from './decorators/at.jwt.guard.decorator';
import { Request, Response } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  public logger = new Logger()

  @Post("register")
  @Validation(registerUserDto)
  async registerUser(@Body() dto: RegisterUserDto) {
    return await this.authService.registerUser(dto)
  }

  @Post("login")
  @Validation(loginUserDto)
  async loginUser(@Body() dto: LoginUserDto) {
    return await this.authService.loginUser(dto)
  }

  @Patch("forget-password")
  @Validation(forgetPasswordDto)
  async forgetPassword(dto: ForgetPasswordDto): Promise<SuccessMessageResponseType> {
    return await this.authService.forgetPassword(dto)
  }

  @Patch("update-password")
  @Validation(updatePasswordDto)
  async updatePassword(dto: UpdatePasswordDto): Promise<SuccessMessageResponseType> {
    return await this.authService.updatePassword(dto)
  }

  @Patch("disactivate")
  @Validation(disActivateUserDto)
  async disActivateUser(dto: DisActivateUserDto): Promise<SuccessMessageResponseType> {
    return await this.authService.disActivateUser(dto)
  }

  @RtJwtAuth()
  @Get("refresh")
  async refresh(
    @Req() req: { rt: string, id: string },
    @Res({ passthrough: true }) res: any
  ) {
    // const headers = req.headers.authorization
    console.log("REFRESH")
    const { rt, id } = req
    console.log({ rt, id })
    // if (!rt) throw new UnauthorizedException()

    return await this.authService.refreshAccessToken(id, rt)

    // res.cookie('at', tokens.at, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: 'lax',
    //   expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    // })
    // res.cookie('rt', tokens.rt, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: 'lax',
    //   expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    // })
  }

  @AtJwtAuth()
  @Post("logout")
  async logout(@Req() req: { id: string }) {
    const { id } = req
    return await this.authService.logout(id)
  }
}
