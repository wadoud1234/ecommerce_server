import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { StoresRepository } from './stores.repository';

@Module({
  controllers: [StoresController],
  providers: [StoresService, StoresRepository],
  exports: [StoresRepository]
})
export class StoresModule { }
