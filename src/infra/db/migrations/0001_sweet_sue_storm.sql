ALTER TABLE "stores" RENAME COLUMN "active" TO "public";--> statement-breakpoint
ALTER TABLE "stores" ADD COLUMN "description" text DEFAULT '' NOT NULL;