import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

// DTO
import CreateUserDTO from './dto/create-user.dto';
import UpdateUserDTO from './dto/update-user.dto';

// Services
import UsersService from './users.service';

// Types
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<User | null> {
    const user = await this.usersService.create(createUserDTO);
    return user;
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User | null> {
    const user = await this.usersService.findById(id);
    return user;
  }

  @Get()
  async index(): Promise<User[] | []> {
    const users = await this.usersService.index();
    return users;
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() update: UpdateUserDTO,
  ): Promise<User | null> {
    const updatedUser = await this.usersService.updateById(id, update);
    return updatedUser;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.deleteById(id);
    return user;
  }
}
