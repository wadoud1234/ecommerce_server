import { DrizzleConfig } from "drizzle-orm";

export default {
    connectionString: process.env.DATABASE_URL as string,
    schema: "./src/infra/db/schema",
    out: "./src/infra/db/migrations",
}