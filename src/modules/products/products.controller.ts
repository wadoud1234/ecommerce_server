import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService, SearchQuery } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ApiTags } from '@nestjs/swagger';

interface IProductsController {
  getProducts(query: SearchQuery): Promise<ProductEntity[]>
  getProductById(id: string): Promise<ProductEntity | null>
  getProductBySlug(slug: string): Promise<ProductEntity | null>
  createProduct(dto: CreateProductDto): Promise<{ id: string, slug: string }>
  updateProduct(id: string, dto: UpdateProductDto): Promise<{ id: string, slug: string }>
  deleteProduct(id: string): Promise<any>
}

@ApiTags("Products")
@Controller('products')
export class ProductsController implements IProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async getProducts(@Query() query: SearchQuery): Promise<ProductEntity[]> {
    return await this.productsService.getProducts(query)
  }

  @Get(":id")
  async getProductById(@Param("id") id: string): Promise<ProductEntity | null> {
    return await this.productsService.getProductById(id)
  }

  @Get("slug/:slug")
  async getProductBySlug(@Param("slug") slug: string): Promise<ProductEntity | null> {
    return await this.productsService.getProductBySlug(slug)
  }

  @Post()
  async createProduct(@Body() dto: CreateProductDto): Promise<{ id: string, slug: string }> {
    return await this.productsService.createProduct(dto)
  }

  @Patch(":id")
  async updateProduct(@Param("id") id: string, @Body() dto: UpdateProductDto): Promise<{ id: string, slug: string }> {
    return await this.productsService.updateProduct(id, dto)
  }

  @Delete(":id")
  async deleteProduct(@Param("id") id: string): Promise<any> {
    return await this.productsService.deleteProduct(id)
  }

}
