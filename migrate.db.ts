import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./src/infra/db/schema"

(
    async () => {
        console.log("HeLLO");

        const queryClient = postgres('postgresql://wadoud1234:I7berLv9EfOg@ep-shiny-wave-a2y8q9fd.eu-central-1.aws.neon.tech/ecommerce?sslmode=require', { max: 1 })
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