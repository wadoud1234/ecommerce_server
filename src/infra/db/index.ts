import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"

import type * as schema from "./schema"

export const DB_Provider = "DB_Provider"

export type DB_Type = PostgresJsDatabase<typeof schema>