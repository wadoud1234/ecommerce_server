import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./src/infra/db/schema"
import { config } from "dotenv"
config();
(
    async () => {
        const db_link = process?.env.DATABASE_URL as string

        const queryClient = postgres(db_link, { max: 1 })
        const db = drizzle(queryClient, { schema })
        try {
            await migrate(db, {
                migrationsFolder: "./src/infra/db/migrations",
            })
        } catch (e: any) {
        } finally {
            process.exit(0)

        }
    }
)()