import { boolean, pgTable, varchar } from "drizzle-orm/pg-core"
import { generateCUID } from "../db.helpers"
import { relations } from "drizzle-orm"
import { usersModel } from "./users.model"
import { productsModel } from "./products.model"

export const storesModel = pgTable("stores", {
    id: varchar("id", { length: 50 }).primaryKey().$defaultFn(generateCUID),
    storeName: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    active: boolean("active").notNull().default(true),
    userId: varchar("userId", { length: 50 }).notNull().references(() => usersModel.id),
})

export const storesRelations = relations(storesModel, ({ one, many }) => ({
    user: one(usersModel, {
        fields: [storesModel.userId],
        references: [usersModel.id],
    }),
    products: many(productsModel)
}))