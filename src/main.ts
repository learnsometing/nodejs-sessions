import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Config
import { ConfigService } from '@nestjs/config';

// Express
import { NestExpressApplication } from '@nestjs/platform-express';

// Helmet
import * as helmet from 'helmet';

// Passport
import * as passport from 'passport';

// OpenAPI
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Sessions
import * as session from 'express-session';
import { SessionOptions } from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  const sess: SessionOptions = {
    cookie: {}, // TODO: Set stricter cookie options
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    // store: TODO: Change for production
    secret: configService.get<string>('SESSION_SECRET'),
  };

  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
  }

  app.use(helmet());
  app.enableCors({ credentials: true });
  app.use(session(sess));
  app.use(passport.initialize());
  app.use(passport.session());

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
