import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoresRepository } from './stores.repository';
import { generateSlug } from 'src/common/helpers/generateSlug.helper';

@Injectable()
export class StoresService {

  constructor(private readonly storesRepository: StoresRepository) { }

  async getStores() {
    return await this.storesRepository.getStores()
  }

  async getStoreProducts(slug: string) {
    return await this.storesRepository.getStoreProducts(slug)
  }
  async createStore({ name, image, isPublic, description, userId }: CreateStoreDto & { userId: string }) {

    const storeSlug = generateSlug(name)

    return await this.storesRepository.createStore({
      name,
      image,
      isPublic,
      description,
      userId,
      slug: storeSlug
    })
  }


  async getStoreById(id: string) {
    return await this.storesRepository.getStoreById(id)
  }

  async getStoreBySlug(slug: string) {
    return await this.storesRepository.getStoreBySlug(slug)
  }

  async updateStore(slug: string, dto: UpdateStoreDto) {
    return this.storesRepository.updateStore(slug, dto)
  }

  async disactivateStore(id: string) {
    return await this.storesRepository.disactivateStore(id)
  }

  async updateStoreStatus({ isPublic, storeSlug }: { isPublic: boolean, storeSlug: string }) {

    return await this.storesRepository.updateStoreStatus({ isPublic, storeSlug })
  }
}