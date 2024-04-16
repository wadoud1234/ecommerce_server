ALTER TABLE "stores" ADD COLUMN "slug" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "stores" ADD COLUMN "active" boolean DEFAULT true NOT NULL;