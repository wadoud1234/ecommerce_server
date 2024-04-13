import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api/v1");
  app.use(cookieParser(process.env.COOKIE_SECRET));
  await app.listen(process.env.API_PORT || 3000);
}

bootstrap();
