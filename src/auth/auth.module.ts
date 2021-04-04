import { Module } from '@nestjs/common';

// Auth
import { AuthService } from './auth.service';

// Helpers
import hashPassword from '../users/helpers/hash-password';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Passport
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

// Users
import { UsersModule } from '../users/users.module';
import UsersService from '../users/users.service';
import { AuthController } from './auth.controller';
import { User, UserDocument, UserSchema } from '../users/schemas/user.schema';
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
    UsersModule,
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
