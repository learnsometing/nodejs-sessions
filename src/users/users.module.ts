import { Module } from '@nestjs/common';

// Controllers
import { UsersController } from './users.controller';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Schema
import { User, UserSchema } from './schemas/user.schema';

// Services
import UsersService from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
