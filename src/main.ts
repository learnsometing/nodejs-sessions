import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// OpenAPI
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const APP_NAME = process.env.npm_package_name;
  const APP_VERSION = process.env.npm_package_version;

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription('Nodejs User Sessions API')
    .setVersion(APP_VERSION)
    .addTag('user-sessions')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
