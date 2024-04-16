import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { generateSlug } from "src/common/helpers/generateSlug.helper";
import { DB_Provider, DB_Type } from "src/infra/db";
import { storesModel } from "src/infra/db/schema";

@Injectable()
export class StoresRepository {

    constructor(@Inject(DB_Provider) private readonly db: DB_Type) { }

    async getStores() {
        const stores = await this.db.query.storesModel.findMany({

        })
        return stores
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

    async createStore(name: string, userId: string, slug: string) {

        const newStore = await this.db
            .insert(storesModel)
            .values({
                storeName: name,
                userId,
                slug: generateSlug(name)
            })
            .returning({ id: storesModel.id })

        return { id: newStore[0].id }
    }

    async updateStore(id: string, name: string) {

        const updatedStore = await this.db.update(storesModel)
            .set({
                storeName: name,
                slug: generateSlug(name)
            })
            .where(eq(storesModel.id, id))
            .returning({ id: storesModel.id })

        return { id: updatedStore[0].id }
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
            .set({ active: false })
            .where(eq(storesModel.id, id))

        return disactivated
    }

}