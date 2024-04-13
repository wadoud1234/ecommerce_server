import { pgTable, varchar } from "drizzle-orm/pg-core"
import { ordersModel } from "./orders.model"
import { generateCUID } from "../db.helpers"
import { productsModel } from "./products.model"
import { relations } from "drizzle-orm"

export const orderItemModel = pgTable("orderItem", {
    id: varchar("id", { length: 50 }).primaryKey().$defaultFn(generateCUID),
    orderId: varchar("orderId", { length: 50 }).notNull().references(() => ordersModel.id),
    productId: varchar("productId", { length: 50 }).notNull().references(() => productsModel.id),
    quantity: varchar("quantity", { length: 255 }).notNull(),
    price: varchar("price", { length: 255 }).notNull(),
})

export const orderItemRelations = relations(orderItemModel, ({ one, many }) => ({
    order: one(ordersModel, {
        fields: [orderItemModel.orderId],
        references: [ordersModel.id],
    }),
    product: one(productsModel, {
        fields: [orderItemModel.productId],
        references: [productsModel.id],
    }),
}))