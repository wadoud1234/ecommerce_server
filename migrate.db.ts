import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./src/infra/db/schema"
import { config } from "dotenv"
config();
(
    async () => {
        const db_link = process?.env.DATABASE_URL as string
        console.log({ db_link })
        const queryClient = postgres(db_link, { max: 1 })
        const db = drizzle(queryClient, { schema })
        try {
            await migrate(db, {
                migrationsFolder: "./src/infra/db/migrations",
            }).then(res => console.log({ res }))
            console.log("success")
        } catch (e: any) {
            console.error({ e })
        } finally {
            process.exit(0)

        }
    }
)()