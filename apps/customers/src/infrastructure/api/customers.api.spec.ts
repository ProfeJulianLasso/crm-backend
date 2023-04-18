import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from '../services/customers.service';
import { CustomersAPI } from './customers.api';

describe('CustomersController', () => {
  let customersAPI: CustomersAPI;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomersAPI],
      providers: [CustomersService],
    }).compile();

    customersAPI = app.get<CustomersAPI>(CustomersAPI);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(customersAPI.getHello()).toBe('Hello World!');
    });
  });
});
