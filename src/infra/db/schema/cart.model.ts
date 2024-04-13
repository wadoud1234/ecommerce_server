import { generateCUID } from "../db.helpers"
import { pgTable, varchar } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { usersModel } from "./users.model"
import { cartItemModel } from "./cartItem.model"

export const cartModel = pgTable("cart", {
    id: varchar("id", { length: 50 }).primaryKey().$defaultFn(generateCUID),
    userId: varchar("userId", { length: 50 }).notNull().references(() => usersModel.id),
})
export const cartRelations = relations(cartModel, ({ one, many }) => ({
    user: one(usersModel, {
        fields: [cartModel.userId],
        references: [usersModel.id],
    }),
    cartItems: many(cartItemModel),
}))