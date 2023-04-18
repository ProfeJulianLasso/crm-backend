import { Test, TestingModule } from '@nestjs/testing';
import { SecurityService } from '../services/security.service';
import { SecurityAPI } from './security.api';

describe('SecurityAPI', () => {
  let api: SecurityAPI;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SecurityAPI],
      providers: [SecurityService],
    }).compile();

    api = app.get<SecurityAPI>(SecurityAPI);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(api.getHello()).toBe('Hello World!');
    });
  });
});
