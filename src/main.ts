import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api/v1");
  const config = new DocumentBuilder()
    .setTitle("Ecommerce_Api")
    .setDescription("The Ecommerce API description")
    .setVersion("1.0")
    .addTag("ecommerce")
    .build();
  patchNestJsSwagger()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.enableCors({
    credentials: true,
    origin: "*",
  })
  await app.listen(4000);
}

bootstrap();
