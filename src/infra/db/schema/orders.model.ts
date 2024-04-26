import { pgTable, varchar } from "drizzle-orm/pg-core"
import { generateCUID } from "../db.helpers"
import { relations } from "drizzle-orm"
import { usersModel } from "./users.model"
import { orderItemModel } from "./orderItem.model"

export const ordersModel = pgTable("orders", {
    id: varchar("id", { length: 50 }).primaryKey().$defaultFn(generateCUID),
    userId: varchar("userId", { length: 50 }).notNull().references(() => usersModel.id),
    status: varchar("status", { length: 255 }).notNull(),
    total: varchar("total", { length: 255 }).notNull(),
})

export const ordersRelations = relations(ordersModel, ({ one, many }) => ({
    user: one(usersModel, {
        fields: [ordersModel.userId],
        references: [usersModel.id],
    }),
    orderItems: many(orderItemModel),
}))