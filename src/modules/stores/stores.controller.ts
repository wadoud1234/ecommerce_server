import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req } from '@nestjs/common';
import { StoresService } from './stores.service';
import { createStoreDto, CreateStoreDto } from './dto/create-store.dto';
import { updateStoreDto, UpdateStoreDto } from './dto/update-store.dto';
import { Validation } from 'src/common/decorators/validation.decorator';
import { ApiTags } from '@nestjs/swagger';
import { AtJwtAuthGuard } from '../auth/guards/at.jwt.guard';
import { AtJwtAuth } from '../auth/decorators/at.jwt.guard.decorator';

@ApiTags("Stores")
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) { }


  @Get()
  async getStores() {
    return await this.storesService.getStores()
  }


  @Get("slug/:slug")
  async getStoreBySlug(@Param("slug") slug: string) {
    return await this.storesService.getStoreBySlug(slug)
  }

  @Get("slug/:slug/products")
  async getStoreProducts(@Param("slug") slug: string) {
    return await this.storesService.getStoreProducts(slug)
  }

  @Get(":id")
  async getStoreById(@Param("id") id: string) {
    return await this.storesService.getStoreById(id)
  }



  @Post()
  @AtJwtAuth()
  @Validation(createStoreDto)
  async createStore(@Body() dto: CreateStoreDto, @Req() req: any) {
    const user = req.user
    console.log(user);
    console.table(dto)
    return await this.storesService.createStore({ ...dto, userId: user.id })
  }

  @Patch(":id")
  @Validation(updateStoreDto)
  async updateStore(
    @Param("id") id: string,
    @Body() dto: UpdateStoreDto
  ) {
    return await this.storesService.updateStore(id, dto)
  }

  @Patch("disactivate/:id")
  async disactivateStore(@Param("id") id: string) {
    return await this.storesService.disactivateStore(id)
  }
}
