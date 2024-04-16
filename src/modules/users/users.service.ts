import { Injectable } from '@nestjs/common';
import type { IUsersEntity } from './entities/users.entity';
import { UsersRepository } from './users.repository';
import type { GetUserByIdDto } from './dto/get-user.dto';


export interface IUsersService {
    getUsers(): Promise<IUsersEntity[]>,
    getUserById(dto: GetUserByIdDto): Promise<IUsersEntity | null>,
    getProfile(id: string): Promise<IUsersEntity>,
}


@Injectable()
export class UsersService implements IUsersService {

    constructor(private readonly usersRepository: UsersRepository) { }

    async getUserStores(id: string) {
        return await this.usersRepository.getUserStores(id)
    }

    async getUsers() {
        const users = await this.usersRepository.getUsers()
        return users
    }

    async getUserById(dto: GetUserByIdDto): Promise<IUsersEntity | null> {
        const { id } = dto
        const user = await this.usersRepository.getUserById(id)
        if (!user?.email) return null
        return user
    }

    async getProfile(id: string): Promise<IUsersEntity> {
        const user = await this.usersRepository.getUserById(id, true)
        if (!user?.email) throw new Error("User not found")
        return user
    }

    async deleteUsers(): Promise<never[]> {
        return await this.usersRepository.deleteUsers()
    }
}