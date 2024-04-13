import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../users.repository";
import { OnEvent } from "@nestjs/event-emitter";
import { UserRegisteredEvent } from "src/modules/auth/events/user.registered..event";

@Injectable()
export class UserRegisteredEventListener {
    constructor(private readonly usersRepository: UsersRepository) { }

    @OnEvent("user.registered")
    async onUserRegistered(event: UserRegisteredEvent) {
        const { email, name } = event
        const user = await this.usersRepository.getUserByEmail(email)
        if (!user) return;
        const token = await crypto.randomUUID()
        user.name = name
        await this.usersRepository.updateUser(user)
    }
}