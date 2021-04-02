import { Body, Controller, Get, Post, Res } from '@nestjs/common';

// DTO
import { CreateUserDTO } from './dto/create-user.dto';

// Services
import UsersService from './users.service';

// Types
import { UserDocument } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  index(): Array<string> {
    return ['foo'];
  }

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<UserDocument> {
    const user = await this.usersService.createUser(createUserDTO);
    return user;
  }
}
