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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule { }
