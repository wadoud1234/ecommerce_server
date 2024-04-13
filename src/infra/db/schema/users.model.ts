import { relations } from "drizzle-orm"
import { pgEnum, pgTable, varchar } from "drizzle-orm/pg-core"
import { ordersModel } from "./orders.model"
import { storesModel } from "./stores.model"
import { cartModel } from "./cart.model"
import { reviewsModel } from "./reviews.model"
import { userTokensModel } from "./userTokens.model"
import { authTokensModel } from "./authTokens.model"
import { generateCUID } from "../db.helpers"

export const UsersRoles = pgEnum("roles", ["admin", "user"])

export const usersModel = pgTable("users", {
    id: varchar("id", { length: 50 }).primaryKey().$defaultFn(generateCUID),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
    role: UsersRoles("role").notNull().default("user"),
})

export const usersRelations = relations(usersModel, ({ one, many }) => ({
    stores: many(storesModel),
    cart: one(cartModel),
    orders: many(ordersModel),
    reviews: many(reviewsModel),
    tokens: many(userTokensModel),
    authTokens: one(authTokensModel)
}))