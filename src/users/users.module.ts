import { Module } from '@nestjs/common';

// Controllers
import { UsersController } from './users.controller';

// Helpers
import hashPassword from './helpers/hash-password';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Schema
import { User, UserDocument, UserSchema } from './schemas/user.schema';

// Services
import UsersService from './users.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        // Hashes user's password on save if it was changed.
        useFactory: () => {
          const schema = UserSchema;
          schema.pre<UserDocument>('save', async function (next) {
            try {
              if (!this.isModified('password')) {
                return next();
              }
              this.password = await hashPassword(this.password);
              next();
            } catch (error) {
              next(error);
            }
          });

          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
