import { Injectable } from '@nestjs/common';

// Mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// User
import CreateUserDTO from './dto/create-user.dto';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Create a new user
   *
   * @param {CreateUserDTO} createUserDTO - object that implements the CreateUserDTO interface
   * @returns {Promise<UserDocument | ValidationError>} - new user or error triggered by schema level validation
   */
  create(createUserDTO: CreateUserDTO): Promise<UserDocument> {
    return this.userModel.create(createUserDTO);
  }

  /**
   * Retrieve a User by id
   *
   * @param {string} id - _id of user to find
   * @returns {Promise<UserDocument | null>} - a user if found, or null if no such user exists
   */
  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id);
  }

  /**
   * Retrieve all Users
   *
   * @returns {Promise<UserDocument[] | []>} - a list of all the users or an empty array
   */
  async index(): Promise<UserDocument[] | []> {
    return this.userModel.find();
  }

  /**
   * Update a User By Id
   *
   * @param {string} id - _id of user to update
   * @param {CreateUserDTO} updateUserDTO - object that implements CreateUserDTO interface
   * @returns {Promise<UserDocument | null>} - the new version of the user after update or null if user not found
   */
  async updateById(
    id: string,
    updateUserDTO: CreateUserDTO,
  ): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDTO, { new: true });
  }

  /**
   * Delete a User by Id
   *
   * @param {string} id - _id of user to delete
   * @returns {Promise<UserDocument | null>} - deleted user document or null if user not found
   */
  async deleteById(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndDelete(id);
  }
}
