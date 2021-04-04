import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

// Interfaces
import UserQuery from '../users/dto/user-query.dto';

// Passport Auth Guards
import LocalAuthGuard from './local-auth.guard';

// Swagger
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    description: 'Success message',
    type: String,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('/login')
  async login() {
    return { message: 'Login successful' };
  }

  @ApiOkResponse({
    description: 'Success message',
    type: String,
  })
  @Get('/logout')
  logout(@Request() req) {
    req.logout();
    return { message: 'Logged out successfully' };
  }
}
