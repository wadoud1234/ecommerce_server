ALTER TABLE "cart" DROP CONSTRAINT "cart_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "cart" ALTER COLUMN "userId" SET NOT NULL;