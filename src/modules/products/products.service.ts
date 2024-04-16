import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { runInThisContext } from 'vm';
import { ProductEntity } from './entities/product.entity';

type ResponseReturnType = {
  id: string,
  slug: string
}

interface IProductsService {
  getProducts(query: SearchQuery): Promise<ProductEntity[]>
  getProductById(id: string): Promise<ProductEntity | null>
  getProductBySlug(slug: string): Promise<ProductEntity | null>
  createProduct(dto: CreateProductDto): Promise<ResponseReturnType>
  updateProduct(id: string, dto: UpdateProductDto): Promise<ResponseReturnType>
  deleteProduct(id: string): Promise<any>
}
export type SearchQuery = {
  limit: number,
  page: number,
  // sort:'asc'|"dsc"
  keyword: string
}
@Injectable()
export class ProductsService implements IProductsService {
  constructor(private readonly productsRepository: ProductsRepository) { }

  async getProducts(query: SearchQuery): Promise<ProductEntity[]> {
    return await this.productsRepository.getProducts(query)
  }

  async getProductById(id: string): Promise<ProductEntity | null> {
    return await this.productsRepository.getProductById(id)
  }

  async getProductBySlug(slug: string): Promise<ProductEntity | null> {
    return this.productsRepository.getProductBySlug(slug)
  }

  async createProduct(dto: CreateProductDto) {
    return await this.productsRepository.createProduct(dto)
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<ResponseReturnType> {
    return await this.productsRepository.updateProduct(id, dto)
  }

  async deleteProduct(id: string): Promise<any> {
    return await this.productsRepository.deleteProduct(id)
  }

}
