import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DB_Provider, type DB_Type } from 'src/infra/db';
import { storesModel, usersModel } from 'src/infra/db/schema';
import type { CreateUserDto } from './dto/create-user.dto';
import type { IUsersEntity } from './entities/users.entity';
import type { UpdateUserDto } from './dto/update-user.dto';
import { authTokensModel } from 'src/infra/db/schema/authTokens.model';
import { generateSlug } from 'src/common/helpers/generateSlug.helper';

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

    async getUserStores(id: string) {
        const stores = await this.db.query.storesModel.findMany({
            where: eq(storesModel.userId, id),
        })
        return stores;
    }

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

    async getCurrentUser(id: string) {
        const user = await this.db.query.usersModel.findFirst({
            where: eq(usersModel.id, id),
            columns: {
                id: true, email: true, image: true, name: true,
            }
        })
        console.log({ user });

        return user
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
            name,
            email,
            passwordHash,
            slug: generateSlug(name)
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

    async updateUserAuthRefreshToken(rt: string, id: string): Promise<boolean> {
        try {

            // const IsUserAuthTokenExist = await this.db.query.authTokensModel.findFirst({
            //     where: eq(authTokensModel.userId, id),
            //     columns: { id: true, userId: true }
            // })
            // if (IsUserAuthTokenExist) {
            const updated = await this.db.update(authTokensModel).set({
                RefreshToken: rt
            }).where(eq(authTokensModel.userId, id)).returning().then(data => data?.[0])
            return true
            // }
            // else {
            //     const userAuthToken = await this.db.insert(authTokensModel).values({
            //         RefreshToken: rt,
            //         userId: id
            //     }).returning().then(data => data?.[0])
            //     return true
            // }

        } catch (err) {
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
