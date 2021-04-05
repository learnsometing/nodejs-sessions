// NestJs
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Passport
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';

// Services
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  /**
   * Validate a user's authentication credentials
   *
   * @param {string} email - user's email address
   * @param {string} password - user's login password
   * @returns User
   */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
