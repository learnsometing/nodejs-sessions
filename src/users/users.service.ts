import { Injectable, NotFoundException } from '@nestjs/common';

// Mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// User
import CreateUserDTO from './dto/create-user.dto';
import UpdateUserDTO from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Create a new user
   *
   * @param {CreateUserDTO} createUserDTO - object that implements the CreateUserDTO interface
   * @returns {Promise<User | ValidationError>} - new user or error triggered by schema level validation
   */
  create(createUserDTO: CreateUserDTO): Promise<User> {
    return this.userModel.create(createUserDTO);
  }

  /**
   * Retrieve a User by id
   *
   * @param {string} id - _id of user to find
   * @returns {Promise<User | null>} - a user if found, or null if no such user exists
   */
  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  /**
   * Retrieve all Users
   *
   * @returns {Promise<User[] | []>} - a list of all the users or an empty array
   */
  async index(): Promise<User[] | []> {
    return this.userModel.find();
  }

  /**
   * Update a User By Id
   *
   * @param {string} id - _id of user to update
   * @param {UpdateUserDTO} updateUserDTO - object that implements UpdateUserDTO interface
   * @returns {Promise<User | null>} - the new version of the user after update or null if user not found
   */
  async updateById(
    id: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<User | null> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDTO, {
      new: true,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  /**
   * Delete a User by Id
   *
   * @param {string} id - _id of user to delete
   * @returns {Promise<User | null>} - deleted user document or null if user not found
   */
  async deleteById(id: string): Promise<User | null> {
    const user = await this.userModel.findByIdAndDelete(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
