import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { DB_Provider, DB_Type } from "src/infra/db";
import { ProductEntity } from "./entities/product.entity";
import { productsModel, storesModel } from "src/infra/db/schema";
import { eq, like } from "drizzle-orm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { generateSlug } from "src/common/helpers/generateSlug.helper";
import { SearchQuery } from "./products.service";
import { generateSearchText } from "src/common/helpers/generateSearchText.helper";

type ResponseReturnType = {
    id: string,
    slug: string
}

interface IProductsRepository {
    getProducts(query: SearchQuery): Promise<ProductEntity[]>
    getProductById(id: string): Promise<ProductEntity | null>
    getProductBySlug(slug: string): Promise<ProductEntity | null>
    createProduct(dto: CreateProductDto): Promise<ResponseReturnType>
    updateProduct(id: string, dto: UpdateProductDto): Promise<ResponseReturnType>
    deleteProduct(id: string): Promise<any>
}

@Injectable()
export class ProductsRepository implements IProductsRepository {
    constructor(@Inject(DB_Provider) private db: DB_Type) { }

    async getProducts(query: SearchQuery): Promise<ProductEntity[]> {
        const { limit, page, keyword } = query
        const products = await this.db.query.productsModel.findMany({
            limit: limit ? limit : 10,
            offset: (limit * (page - 1)),
            // where: keyword ? like(productsModel.searchText, `%${keyword}%`) : undefined
        })
        return products
    }

    async getProductById(id: string): Promise<ProductEntity | null> {
        const product = await this.db.query.productsModel.findFirst({
            where: eq(productsModel.id, id)
        })
        if (!product?.name) return null
        return product
    }

    async getProductBySlug(slug: string): Promise<ProductEntity | null> {
        const product = await this.db.query.productsModel.findFirst({
            where: eq(productsModel.slug, slug)
        })
        if (!product?.name) return null
        return product
    }

    async createProduct(dto: CreateProductDto): Promise<{ id: string, slug: string }> {
        const { name, price, quantity, storeSlug, description, image } = dto
        const store = await this.db.query.storesModel.findFirst({
            where: eq(storesModel.slug, storeSlug),
            columns: { id: true }
        })
        if (!store) throw new BadRequestException("Store not found")
        const product = await this.db.insert(productsModel).values({
            name,
            slug: generateSlug(name),
            searchText: generateSearchText(name, description),
            price,
            storeId: store.id,
            quantity,
            description,
            image
        }).returning({ id: productsModel.id, slug: productsModel.slug })
        return product[0]
    }

    async updateProduct(id: string, dto: UpdateProductDto): Promise<{ id: string, slug: string }> {
        const { name, price, quantity, description, image } = dto
        const product = await this.db
            .update(productsModel)
            .set({
                name,
                slug: generateSlug(name),
                searchText: generateSearchText(name, description),
                price,
                quantity,
                description,
                image
            })
            .where(eq(productsModel.id, id))
            .returning({ id: productsModel.id, slug: productsModel.slug })
        return product[0]
    }

    async deleteProduct(id: string): Promise<any> {
        const deleted = await this.db.delete(productsModel).where(eq(productsModel.id, id))
        return deleted
    }

}