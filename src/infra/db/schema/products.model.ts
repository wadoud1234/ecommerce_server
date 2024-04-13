import { pgTable, text, varchar } from "drizzle-orm/pg-core"
import { generateCUID } from "../db.helpers"
import { storesModel } from "./stores.model"
import { categoryModel } from "./category.model"
import { relations } from "drizzle-orm"
import { reviewsModel } from "./reviews.model"
import { cartItemModel } from "./cartItem.model"
import { orderItemModel } from "./orderItem.model"

export const productsModel = pgTable("products", {
    id: varchar("id", { length: 50 }).primaryKey().unique().$defaultFn(generateCUID).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    price: varchar("price", { length: 255 }).notNull(),
    storeId: varchar("storeId", { length: 50 }).notNull().references(() => storesModel.id),
    categoryId: varchar("categoryId", { length: 50 }).notNull().references(() => categoryModel.id),
    description: text("description").notNull(),
    image: varchar("image", { length: 255 }).notNull(),
})

export const productsRelations = relations(productsModel, ({ one, many }) => ({
    store: one(storesModel, {
        fields: [productsModel.storeId],
        references: [storesModel.id],
    }),
    category: one(categoryModel, {
        fields: [productsModel.categoryId],
        references: [categoryModel.id],
    }),
    reviews: many(reviewsModel),
    cartItem: many(cartItemModel),
    orderItem: many(orderItemModel),
}))