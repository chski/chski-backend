import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    usersService = {
      findOne: jest.fn(),
      create: jest.fn(),
    };
    jwtService = {
      sign: jest.fn().mockReturnValue('mock-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('returns user data without password when valid', async () => {
      const fakeUser = { id: 1, username: 'user', password: 'hashed' } as any;
      (usersService.findOne as jest.Mock).mockResolvedValue(fakeUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await service.validateUser('user', 'pass');
      expect(result).toEqual({ id: 1, username: 'user' });
      expect(bcrypt.compare).toHaveBeenCalledWith('pass', 'hashed');
    });

    it('returns null if user not found', async () => {
      (usersService.findOne as jest.Mock).mockResolvedValue(undefined);
      const result = await service.validateUser('none', 'pass');
      expect(result).toBeNull();
    });

    it('returns null if password mismatch', async () => {
      const fakeUser = { id: 2, username: 'user2', password: 'hash2' } as any;
      (usersService.findOne as jest.Mock).mockResolvedValue(fakeUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const result = await service.validateUser('user2', 'wrong');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('returns signed JWT token', async () => {
      const payloadUser = { id: 3, username: 'a' } as any;
      const tokenObj = await service.login(payloadUser);
      expect(jwtService.sign).toHaveBeenCalledWith({ username: 'a', sub: 3 });
      expect(tokenObj).toEqual({ access_token: 'mock-token' });
    });
  });

  describe('register', () => {
    it('calls UsersService.create and returns its result', async () => {
      (usersService.create as jest.Mock).mockResolvedValue({ id: 4, username: 'new' });
      const result = await service.register('new', 'pwd');
      expect(usersService.create).toHaveBeenCalledWith('new', 'pwd');
      expect(result).toEqual({ id: 4, username: 'new' });
    });
  });
});
