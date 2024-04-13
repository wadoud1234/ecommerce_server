import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DB_Provider, type DB_Type } from 'src/infra/db';
import { usersModel } from 'src/infra/db/schema';
import type { CreateUserDto } from './dto/create-user.dto';
import type { IUsersEntity } from './entities/users.entity';
import type { UpdateUserDto } from './dto/update-user.dto';
import { authTokensModel } from 'src/infra/db/schema/authTokens.model';

export interface IUsersRepository {
    getUsers(): Promise<IUsersEntity[]>,
    getUserById(id: string, isForProfile: boolean, include: Record<string, boolean> | null): Promise<IUsersEntity | null>,
    getUserByEmail(email: string): Promise<IUsersEntity | null>,
    createUser(dto: CreateUserDto): Promise<IUsersEntity>,
    updateUser(dto: UpdateUserDto): Promise<IUsersEntity>
}


@Injectable()
export class UsersRepository implements IUsersRepository {
    constructor(@Inject(DB_Provider) private db: DB_Type) { }

    async getUsers() {
        const users = await this.db.query.usersModel.findMany({
            with: {
                tokens: true,
                stores: true,
                cart: true
            }
        })
        return users
    }

    async getUserById(id: string, isForProfile = false) {
        const user = await this.db.query.usersModel.findFirst({
            where: eq(usersModel.id, id),
            columns: isForProfile ? {
                id: true,
                email: true,
                name: true
            } : undefined,
        })
        if (!user?.email) return null
        return user
    }

    async getUserByEmail(email: string) {
        const user = await this.db.query.usersModel.findFirst({
            where: eq(usersModel.email, email)
        })
        if (!user?.email) return null
        return user
    }

    async createUser({ name, email, passwordHash }: CreateUserDto) {
        const newUser = await this.db.insert(usersModel).values({
            name, email, passwordHash
        }).returning().then(data => data?.[0])
        return newUser
    }

    async updateUser({ name }: UpdateUserDto) {
        const updateUser = await this.db.update(usersModel).set({ name }).where(eq(usersModel.id, "1")).returning().then(data => data?.[0])
        return updateUser
    }

    async deleteUsers() {
        const resp = await this.db.delete(usersModel)
        return resp
    }

    async updateUserAuthRefreshToken(rt: string, id: string) {
        try {
            const updated = await this.db.update(authTokensModel).set({
                RefreshToken: rt
            }).where(eq(authTokensModel.userId, id))
            console.log({ updated });
        } catch (err) {
            console.log({ err });
            return false
        }
        return true
    }
    async getAuthTokens(userId: string) {
        const tokens = await this.db.query.authTokensModel.findFirst({
            where: eq(authTokensModel.userId, userId)
        })
        return tokens
    }

}
