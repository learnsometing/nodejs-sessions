import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

// DTO
import CreateUserDTO from './dto/create-user.dto';
import UpdateUserDTO from './dto/update-user.dto';

// Auth Guards
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';

// Services
import UsersService from './users.service';

// Swagger
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

// Types
import { User } from './schemas/user.schema';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({
    description: 'Newly created user.',
    type: User,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<User | null> {
    const user = await this.usersService.create(createUserDTO);
    return user;
  }

  @ApiOkResponse({
    description: 'User retrieved by id.',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'No User found with corresponding id.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':id')
  findById(@Param('id') id: string): Promise<User | null> {
    const user = this.usersService.findById(id);
    return user;
  }

  @UseGuards(AuthenticatedGuard)
  @ApiOkResponse({
    description: 'Array of all the saved users.',
    type: [User],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get()
  async index(): Promise<User[] | []> {
    const users = await this.usersService.index();
    return users;
  }

  @ApiOkResponse({
    description: 'Updated version of existing user.',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'No User found with corresponding id.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Patch(':id')
  updateById(
    @Param('id') id: string,
    @Body() update: UpdateUserDTO,
  ): Promise<User | null> {
    const updatedUser = this.usersService.updateById(id, update);
    return updatedUser;
  }

  @ApiOkResponse({
    description: 'User that was removed from the database.',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'No User found with corresponding id.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<User> {
    const user = this.usersService.deleteById(id);
    return user;
  }
}
