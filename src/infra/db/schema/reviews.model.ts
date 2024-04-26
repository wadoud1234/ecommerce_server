import { generateCUID } from "../db.helpers"
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core"
import { productsModel } from "./products.model"
import { relations } from "drizzle-orm"
import { usersModel } from "./users.model"

export const reviewsModel = pgTable("reviews", {
    id: varchar("id", { length: 50 }).primaryKey().$defaultFn(generateCUID),
    userId: varchar("userId", { length: 50 }).notNull().references(() => usersModel.id),
    productId: varchar("productId", { length: 50 }).notNull().references(() => productsModel.id),
    rating: integer("rating").notNull(),
    comment: text("comment").notNull(),
})

export const reviewsRelations = relations(reviewsModel, ({ one, many }) => ({
    user: one(usersModel, {
        fields: [reviewsModel.userId],
        references: [usersModel.id],
    }),
    product: one(productsModel, {
        fields: [reviewsModel.productId],
        references: [productsModel.id],
    })
}))
