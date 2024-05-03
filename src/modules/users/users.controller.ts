import { BadRequestException, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import type { IUsersEntity } from './entities/users.entity';
import { type GetUserByIdDto, getUserByIdDto } from './dto/get-user.dto';
import { Validation } from 'src/common/decorators/validation.decorator';
import { AtJwtAuth } from '../auth/decorators/at.jwt.guard.decorator';
import { ApiTags } from '@nestjs/swagger';

export interface IUsersController {
  getUsers(): Promise<IUsersEntity[]>,
  getUserById(dto: GetUserByIdDto): Promise<IUsersEntity | null>,
  getCurrentUser(req: any): Promise<any>,
}

@ApiTags("Users")
@Controller('users')
export class UsersController implements IUsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  async getUsers() {
    return await this.usersService.getUsers()
  }

  @AtJwtAuth()
  @Get('current')
  async getCurrentUser(@Req() req: any) {
    if (!req?.user) throw new UnauthorizedException()
    const { id } = req.user
    return await this.usersService.getCurrentUser(id)
  }

  @AtJwtAuth()
  @Get("stores")
  async getUserStores(@Req() req: any) {
    const { user } = req
    const id = user.id as string
    console.log({ id });

    if (!id) return new UnauthorizedException()
    return this.usersService.getUserStores(id)
  }

  @Get(':id')
  @Validation(getUserByIdDto)
  async getUserById(dto: GetUserByIdDto) {
    return await this.usersService.getUserById(dto)
  }


  @Post("delete")
  async delete() {
    return await this.usersService.deleteUsers()
  }
}
