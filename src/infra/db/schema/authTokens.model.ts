import { pgTable, varchar } from "drizzle-orm/pg-core";
import { generateCUID } from "../db.helpers";
import { usersModel } from "./users.model";
import { relations } from "drizzle-orm";

export const authTokensModel = pgTable("authTokens", {
    id: varchar("id", { length: 50 }).primaryKey().$defaultFn(generateCUID),
    RefreshToken: varchar("refreshToken", { length: 255 }).notNull(),
    userId: varchar("userId", { length: 50 }).notNull().references(() => usersModel.id),
})

export const authTokensRelations = relations(authTokensModel, ({ one }) => ({
    user: one(usersModel, {
        fields: [authTokensModel.userId],
        references: [usersModel.id],
    })
}))