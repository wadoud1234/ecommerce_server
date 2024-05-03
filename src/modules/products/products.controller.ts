import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, BadRequestException } from '@nestjs/common';
import { ProductsService, SearchQuery } from './products.service';
import { createProductDto, CreateProductDto } from './dto/create-product.dto';
import { updateProductDto, UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ApiTags } from '@nestjs/swagger';
import { AtJwtAuth } from '../auth/decorators/at.jwt.guard.decorator';
import { Validation } from 'src/common/decorators/validation.decorator';

interface IProductsController {
  getProducts(query: SearchQuery): Promise<ProductEntity[]>
  getProductById(id: string): Promise<ProductEntity | null>
  getProductBySlug(slug: string): Promise<ProductEntity | null>
  createProduct(dto: CreateProductDto, req: any): Promise<{ id: string, slug: string }>
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

  @AtJwtAuth()
  @Post()
  @Validation(createProductDto)
  async createProduct(@Body() dto: CreateProductDto, @Req() req: any): Promise<{ id: string, slug: string }> {
    console.log({ msg: "Create product" });
    const user = req.user as { id: string };
    if (!user || !user?.id) throw new BadRequestException("You must be authenticated to create a product")
    return await this.productsService.createProduct(dto)
  }

  @Patch(":id")
  @Validation(updateProductDto)
  async updateProduct(@Param("id") id: string, @Body() dto: UpdateProductDto): Promise<{ id: string, slug: string }> {
    return await this.productsService.updateProduct(id, dto)
  }

  @Delete(":id")
  async deleteProduct(@Param("id") id: string): Promise<any> {
    return await this.productsService.deleteProduct(id)
  }

}
