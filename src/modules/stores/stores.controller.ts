import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req, UsePipes, BadRequestException } from '@nestjs/common';
import { StoresService } from './stores.service';
import { createStoreDto, CreateStoreDto } from './dto/create-store.dto';
import { updateStoreDto, UpdateStoreDto } from './dto/update-store.dto';
import { Validation } from 'src/common/decorators/validation.decorator';
import { ApiTags } from '@nestjs/swagger';
import { AtJwtAuthGuard } from '../auth/guards/at.jwt.guard';
import { AtJwtAuth } from '../auth/decorators/at.jwt.guard.decorator';
import { UpdateStoreStatusDto, updateStoreStatusDto } from './dto/update-store-status.dto';
import { ZodValidationPipe } from 'nestjs-zod';

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

  @Patch(":slug")
  // @Validation(updateStoreDto)
  async updateStore(
    @Param("slug") slug: string,
    @Body() dto: UpdateStoreDto
  ) {
    console.log("DTO", { dto })
    const result = updateStoreDto.safeParse(dto)
    console.log({ result });

    if (!result.success) {
      return new BadRequestException(result.error)
    }

    return await this.storesService.updateStore(slug, dto)
  }


  @Patch(":storeSlug/update-status")
  @AtJwtAuth()
  async updateStatus(@Body() dto: UpdateStoreStatusDto, @Param("storeSlug") storeSlug: string) {
    const { isPublic } = dto
    const result = updateStoreStatusDto.safeParse(dto)
    if (!result.success) {
      return new BadRequestException(result.error)
    }
    console.log({ result });

    return await this.storesService.updateStoreStatus({ isPublic, storeSlug })
  }
  @Patch("disactivate/:id")
  async disactivateStore(@Param("id") id: string) {
    return await this.storesService.disactivateStore(id)
  }
}
