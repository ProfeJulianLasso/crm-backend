import { Permission } from '../../../src/domain/entities';

describe('Permission', () => {
  let permission: Permission;

  beforeEach(async () => {
    permission = new Permission();
  });

  it('should be defined', () => {
    expect(permission).toBeDefined();
  });
});
