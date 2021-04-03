import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// OpenAPI
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('nodejs-sessions')
    .setDescription('Nodejs User Sessions API')
    .setVersion('0.0.0')
    .addTag('user-sessions')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
