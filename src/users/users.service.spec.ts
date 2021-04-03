import { Test, TestingModule } from '@nestjs/testing';

// Mocks
import userModelMock from './__mocks__/user.model';

// Models
import { User } from './schemas/user.schema';

// Mongoose
import { getModelToken } from '@nestjs/mongoose';

// Services
import UsersService from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useFactory: userModelMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userMock = module.get(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', () => {
      const user = {
        email: 'brianmonaccio@protonmail.com',
        firstName: 'Brian',
        lastName: 'Monaccio',
        password: 'foo',
      };

      userMock.create.mockReturnValue(user);
      expect(service.create(user)).toEqual(user);
      expect(userMock.create).toHaveBeenCalledWith(user);
    });
  });

  describe('findById', () => {
    it('should find a user by id', () => {
      const user = Promise.resolve({
        email: 'brianmonaccio@protonmail.com',
        firstName: 'Brian',
        lastName: 'Monaccio',
        password: 'foo',
      });

      userMock.findById.mockReturnValue(user);
      expect(service.findById('123')).toEqual(user);
      expect(userMock.findById).toHaveBeenCalledWith('123');
    });
  });

  describe('index', () => {
    it('should find all users', () => {
      const users = Promise.resolve([
        {
          email: 'brianmonaccio@protonmail.com',
          firstName: 'Brian',
          lastName: 'Monaccio',
          password: 'foo',
        },
        {
          email: 'brianmonaccio@gmail.com',
          firstName: 'Brian',
          lastName: 'Monaccio',
          password: 'foo',
        },
      ]);
      userMock.find.mockReturnValue(users);
      expect(service.index()).toEqual(users);
      expect(userMock.find).toHaveBeenCalled();
    });
  });

  describe('updateById', () => {
    it('should update a user by id', () => {
      const update = {
        email: 'brianmonaccio@protonmail.com',
        firstName: 'Brian',
        lastName: 'Monaccio',
        password: 'foo',
      };

      const user = Promise.resolve({
        email: 'brianmonaccio@protonmail.com',
        firstName: 'Brian',
        lastName: 'Monaccio',
        password: 'foo',
      });

      userMock.findByIdAndUpdate.mockReturnValue(user);
      expect(service.updateById('123', update)).toEqual(user);
      expect(userMock.findByIdAndUpdate).toHaveBeenCalled();
    });
  });

  describe('deleteById', () => {
    it('should delete a user by id', () => {
      const user = Promise.resolve({
        email: 'brianmonaccio@protonmail.com',
        firstName: 'Brian',
        lastName: 'Monaccio',
        password: 'foo',
      });

      userMock.findByIdAndDelete.mockReturnValue(user);
      expect(service.deleteById('123')).toEqual(user);
      expect(userMock.findByIdAndDelete).toHaveBeenCalled();
    });
  });
});
