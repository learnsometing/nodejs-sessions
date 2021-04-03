import { Test, TestingModule } from '@nestjs/testing';

// Controllers
import { UsersController } from './users.controller';

// Mocks
import userModelMock from './__mocks__/user.model';

// Mongoose
import { Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

// Schema
import { User } from './schemas/user.schema';

// Services
import UsersService from './users.service';

describe('UserController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useFactory: userModelMock },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const result = {
        email: 'brianmonaccio@protonmail.com',
        firstName: 'Brian',
        lastName: 'Monaccio',
        password: 'foo',
      };

      const spy = jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.create(result)).toBe(result);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should find a user by id', async () => {
      const id = Types.ObjectId().toHexString();
      const result = {
        email: 'brianmonaccio@protonmail.com',
        firstName: 'Brian',
        lastName: 'Monaccio',
        password: 'foo',
      };

      const spy = jest
        .spyOn(service, 'findById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findById(id)).toBe(result);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(id);
    });

    it('should return null if user not found', async () => {
      const id = Types.ObjectId().toHexString();
      const result = null;

      const spy = jest
        .spyOn(service, 'findById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findById(id)).toBe(result);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(id);
    });
  });

  describe('index', () => {
    it('should find all users', async () => {
      const result = Promise.resolve([
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

      const spy = jest.spyOn(service, 'index').mockImplementation(() => result);

      expect(await controller.index()).toEqual(await result);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateById', () => {
    it('should update a user by id', async () => {
      const id = Types.ObjectId().toHexString();
      const update = { firstName: 'Foo' };
      const result = Promise.resolve({
        email: 'brianmonaccio@protonmail.com',
        firstName: 'Foo',
        lastName: 'Monaccio',
        password: 'foo',
      });

      const spy = jest
        .spyOn(service, 'updateById')
        .mockImplementation(() => result);
      expect(await controller.updateById(id, update)).toEqual(await result);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(id, update);
    });
  });

  describe('deleteById', () => {
    it('should delete a user by id', async () => {
      const id = Types.ObjectId().toHexString();
      const result = Promise.resolve({
        email: 'brianmonaccio@protonmail.com',
        firstName: 'Foo',
        lastName: 'Monaccio',
        password: 'foo',
      });

      const spy = jest
        .spyOn(service, 'deleteById')
        .mockImplementation(() => result);
      expect(await controller.deleteById(id)).toEqual(await result);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(id);
    });
  });
});
