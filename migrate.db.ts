import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./src/infra/db/schema"
import { config } from "dotenv"
config();
(
    async () => {
        console.log("HeLLO");

        const queryClient = postgres(process.env.DATABASE_URL as string, { max: 1 })
        const db = drizzle(queryClient, { schema })
        try {
            await migrate(db, {
                migrationsFolder: "./src/infra/db/migrations",
            })
            console.log("SUCCESS")
        } catch (e) {
            console.log("ERROR")
            console.error(e);
        } finally {
            console.log("FINISHED");
            process.exit(0)

        }
    }
)()