import { relations } from "drizzle-orm"
import { pgTable, varchar } from "drizzle-orm/pg-core"
import { generateCUID } from "../db.helpers"
import { productsModel } from "./products.model"

export const categoryModel = pgTable("category", {
    id: varchar("id", { length: 50 }).primaryKey().$defaultFn(generateCUID),
    name: varchar("name", { length: 255 }).notNull(),
})

export const categoryRelations = relations(categoryModel, ({ many }) => ({
    products: many(productsModel),
}))