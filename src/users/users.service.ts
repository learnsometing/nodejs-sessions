import { Injectable } from '@nestjs/common';

// Mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// User
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  // Create a new user
  createUser(createUserDTO: CreateUserDTO): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDTO);
    return newUser.save();
  }
}
