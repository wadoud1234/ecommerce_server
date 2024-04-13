DO $$ BEGIN
 CREATE TYPE "roles" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authTokens" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"refreshToken" varchar(255) NOT NULL,
	"userId" varchar(50) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "roles" DEFAULT 'user' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authTokens" ADD CONSTRAINT "authTokens_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
