import { Injectable } from '@nestjs/common';

// bcrypt
import * as bcrypt from 'bcrypt';

// Services
import UsersService from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  /**
   * Validate a user by comparing the given password to the hashed password from db storage
   *
   * @param {string} email - user's email address
   * @param {string} password - user's attempted login password
   * @returns user details except password
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (user && passwordsMatch) {
      // Return all user details except for password
      const { password, ...result } = user.toObject();
      return result;
    }

    return null;
  }
}
