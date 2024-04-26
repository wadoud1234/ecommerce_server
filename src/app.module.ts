import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { EmailService } from './infra/email/email.service';
import { EmailModule } from './infra/email/email.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import * as schema from './infra/db/schema';
import { DB_Provider } from './infra/db';
import { AuthModule } from './modules/auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { StoresModule } from './modules/stores/stores.module';
import { CategoryModule } from './modules/category/category.module';

import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from "redis"
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    ReviewsModule,
    CartModule,
    OrdersModule,
    EmailModule,
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    AuthModule,
    StoresModule,
    CategoryModule,

    DrizzlePostgresModule.registerAsync({
      tag: DB_Provider,
      useFactory() {
        return {
          postgres: {
            url: process.env.DATABASE_URL as string,
          },
          config: { schema },
        };
      },
    }),

    // CacheModule.register<RedisClientOptions>({
    //   store: redisStore,
    //   host: "localhost",
    //   port: 6379,
    //   isGlobal: true
    // }),

  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmailService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule { }
