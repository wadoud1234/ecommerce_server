import { relations } from "drizzle-orm"
import { cartModel } from "./cart.model"
import { productsModel } from "./products.model"
import { integer, pgTable, real, serial, varchar } from "drizzle-orm/pg-core"
import { generateCUID } from "../db.helpers"

export const cartItemModel = pgTable("cartItem", {
    id: varchar("id", { length: 50 }).primaryKey().$defaultFn(generateCUID),
    cartId: varchar("cartId", { length: 50 }).notNull().references(() => cartModel.id),
    productId: varchar("productId", { length: 50 }).notNull().references(() => productsModel.id),
    quantity: integer("quantity").notNull(),
    productPrice: real("productPrice").notNull(),
})

export const cartItemRelations = relations(cartItemModel, ({ one, many }) => ({
    cart: one(cartModel, {
        fields: [cartItemModel.cartId],
        references: [cartModel.id],
    }),
    product: one(productsModel, {
        fields: [cartItemModel.productId],
        references: [productsModel.id],
    }),
}))