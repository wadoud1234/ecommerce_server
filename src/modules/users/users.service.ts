import { Injectable } from '@nestjs/common';
import type { IUsersEntity } from './entities/users.entity';
import { UsersRepository } from './users.repository';
import type { GetUserByIdDto } from './dto/get-user.dto';


export interface IUsersService {
    getUsers(): Promise<IUsersEntity[]>,
    getUserById(dto: GetUserByIdDto): Promise<IUsersEntity | null>,
    getCurrentUser(id: string): Promise<{ id: string, name: string, email: string, image: string }>,
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

    async getCurrentUser(id: string) {
        const user = await this.usersRepository.getCurrentUser(id)
        if (!user?.email) throw new Error("User not found")
        return user
    }

    async deleteUsers(): Promise<never[]> {
        return await this.usersRepository.deleteUsers()
    }
}