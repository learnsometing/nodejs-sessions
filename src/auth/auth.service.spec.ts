import { Test, TestingModule } from '@nestjs/testing';

// Helpers
import hashPassword from '../users/helpers/hash-password';

// Mocks
import userModelMock from '../users/__mocks__/user.model';

// Models
import { User } from '../users/schemas/user.schema';

// Mongoose
import { getModelToken } from '@nestjs/mongoose';

// Services
import { AuthService } from './auth.service';
import UsersService from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let userMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        { provide: getModelToken(User.name), useFactory: userModelMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userMock = module.get(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return the user details on success', async () => {
      const email = 'brianmonaccio@protonmail.com';
      const password = 'foobar';

      const user = Promise.resolve({
        email: email,
        firstName: 'Brian',
        lastName: 'Monaccio',
        password: await hashPassword(password),
      });

      const result = Promise.resolve({
        email: email,
        firstName: 'Brian',
        lastName: 'Monaccio',
      });

      userMock.findOne.mockReturnValue(user);
      expect(service.validateUser(email, password)).toEqual(result);
      expect(userMock.findOne).toHaveBeenCalledWith({
        email: 'brianmonaccio@protonmail.com',
      });
    });
  });
});
