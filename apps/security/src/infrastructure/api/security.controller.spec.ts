import { Test, TestingModule } from '@nestjs/testing';
import { SecurityService } from '../services/security.service';
import { SecurityController } from './security.controller';

describe('SecurityController', () => {
  let securityController: SecurityController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SecurityController],
      providers: [SecurityService],
    }).compile();

    securityController = app.get<SecurityController>(SecurityController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(securityController.getHello()).toBe('Hello World!');
    });
  });
});
