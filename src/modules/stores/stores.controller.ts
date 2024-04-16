import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { StoresService } from './stores.service';
import { createStoreDto, CreateStoreDto } from './dto/create-store.dto';
import { updateStoreDto, UpdateStoreDto } from './dto/update-store.dto';
import { Validation } from 'src/common/decorators/validation.decorator';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) { }


  @Get()
  async getStores() {
    return await this.storesService.getStores()
  }

  @Get(":id")
  async getStoreById(@Param("id") id: string) {
    return await this.storesService.getStoreById(id)
  }


  @Post()
  @Validation(createStoreDto)
  async createStore(@Body() dto: CreateStoreDto) {
    return await this.storesService.createStore(dto)
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
