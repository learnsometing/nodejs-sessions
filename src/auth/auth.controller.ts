import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';

// Passport Auth Guards
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import LocalAuthGuard from './local-auth.guard';

// Swagger
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

// Types
import { User } from '../users/schemas/user.schema';
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
  async login(@Response() res) {
    res.redirect('/auth/account');
  }

  @ApiOkResponse({
    description: "Get the currently logged in user's account.",
    type: [User],
  })
  @UseGuards(AuthenticatedGuard)
  @Get('/account')
  getAccount(@Request() req, @Response() res) {
    res.redirect('/users/' + req.user);
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
