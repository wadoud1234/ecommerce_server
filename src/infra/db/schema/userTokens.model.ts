import { relations } from "drizzle-orm"
import { pgEnum, pgTable, varchar } from "drizzle-orm/pg-core"
import { usersModel } from "./users.model"
import { generateCUID } from "../db.helpers"

export const UserTokenEnum = pgEnum("userToken", ["refreshToken", "accessToken", "forgetPassword", "verifyEmail"])

export const userTokensModel = pgTable("tokens", {
    id: varchar("id", { length: 50 }).primaryKey().$defaultFn(generateCUID),
    type: UserTokenEnum("tokenType").notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    userId: varchar("userId", { length: 50 }).notNull().references(() => usersModel.id),
})

export const userTokensRelations = relations(userTokensModel, ({ one, many }) => ({
    user: one(usersModel, {
        fields: [userTokensModel.userId],
        references: [usersModel.id],
    })
}))
