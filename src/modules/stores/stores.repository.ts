import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { generateSlug } from "src/common/helpers/generateSlug.helper";
import { DB_Provider, DB_Type } from "src/infra/db";
import { productsModel, storesModel } from "src/infra/db/schema";
import { CreateStoreDto } from "./dto/create-store.dto";

@Injectable()
export class StoresRepository {

    constructor(@Inject(DB_Provider) private readonly db: DB_Type) { }

    async getStores() {
        const stores = await this.db.query.storesModel.findMany({

        })
        return stores
    }
    async getStoreProducts(slug: string) {

        const store = await this.db.query.storesModel
            .findFirst({
                where: eq(storesModel.slug, slug),
                columns: { id: true }
            })
        if (!store) return null
        const products = await this.db
            .select()
            .from(productsModel)
            .where(eq(productsModel.storeId, store.id))
        return products
    }
    async getStoreById(id: string) {

        const store = await this.db.query.storesModel
            .findFirst({
                where: eq(storesModel.id, id)
            })

        if (!store?.storeName) return null

        return store;
    }

    async getStoreBySlug(slug: string) {

        const store = await this.db.query.storesModel
            .findFirst({
                where: eq(storesModel.slug, slug)
            })

        if (!store?.storeName) return null

        return store
    }

    async createStore({ name, image, slug, isPublic, description, userId }: CreateStoreDto & { slug: string, userId: string }) {

        const newStore = await this.db
            .insert(storesModel)
            .values({
                storeName: name,
                userId,
                image,
                public: isPublic,
                description,
                slug
            })
            .returning({ id: storesModel.id })

        return { id: newStore[0].id }
    }

    async updateStore(slug: string, dto: {
        name: string,
        imageUrl: string,
        isPublic: boolean,
        description: string
    }) {
        const { name, isPublic, imageUrl, description } = dto
        const updatedStore = await this.db.update(storesModel)
            .set({
                storeName: name,
                slug: generateSlug(name),
                image: imageUrl,
                description,
                public: isPublic
            })
            .where(eq(storesModel.slug, slug))
            .returning({ id: storesModel.id, slug: storesModel.slug })

        return { success: true, id: updatedStore[0].id, slug: updatedStore[0].slug }
    }

    async getStoreWithProducts(id: string) {

        const storeWithProducts = await this.db.query.storesModel
            .findFirst({
                where: eq(storesModel.id, id),
                with: { products: true }
            })

        if (!storeWithProducts?.storeName) return null

        return storeWithProducts
    }

    async disactivateStore(id: string) {

        const disactivated = await this.db
            .update(storesModel)
            .set({ public: false })
            .where(eq(storesModel.id, id))

        return disactivated
    }

    async updateStoreStatus({ isPublic, storeSlug }: { isPublic: boolean, storeSlug: string }) {
        const updated = await this.db.update(storesModel).set({ public: isPublic })
            .where(eq(storesModel.slug, storeSlug))

        console.log({ storeSlug, isPublic, updated })
        return true
    }
}