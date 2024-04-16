ALTER TABLE "authTokens" DROP CONSTRAINT "authTokens_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "authTokens" ALTER COLUMN "refreshToken" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authTokens" ADD CONSTRAINT "authTokens_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
