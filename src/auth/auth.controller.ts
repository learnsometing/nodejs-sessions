import { Controller, Post, Request, UseGuards } from '@nestjs/common';

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
    description: "User's account details",
    type: UserQuery,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }
}
