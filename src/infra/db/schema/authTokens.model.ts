import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { generateCUID } from "../db.helpers";
import { usersModel } from "./users.model";
import { relations } from "drizzle-orm";

export const authTokensModel = pgTable("authTokens", {
    id: varchar("id", { length: 50 })
        .primaryKey()
        .$defaultFn(generateCUID),

    RefreshToken: text("refreshToken")
        .notNull(),

    userId: varchar("userId", { length: 50 })
        .notNull()
        .references(() => usersModel.id,
            {
                onUpdate: "cascade",
                onDelete: "cascade"
            }),

})

export const authTokensRelations = relations(authTokensModel, ({ one }) => ({
    user: one(usersModel, {
        fields: [authTokensModel.userId],
        references: [usersModel.id],
    })
}))