import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Config
import { ConfigModule, ConfigService } from '@nestjs/config';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    MongooseModule.forRoot(process.env.DB_URL, { useNewUrlParser: true }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    const db = this.configService.get<string>('DB_URL');
    console.log('Connected to: ', db);
  }
}
