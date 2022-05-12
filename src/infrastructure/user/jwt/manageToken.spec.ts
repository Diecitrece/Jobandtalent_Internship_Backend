import { UserVerify } from '@ports/input/userCRUD.port';
import { tokenManager } from './manageToken';
import { UserRole } from '../../../core/domain/user.model';

//mock the tokenManager
jest.mock('./manageToken', () => ({
  tokenManager: jest.fn().mockReturnValue({
    accessToken: jest.fn().mockReturnValue('123'),
    verifyToken: jest.fn().mockReturnValue(true),
    verifyAdminToken: jest.fn().mockReturnValue(true),
  }),
}));

describe('tokenManager', () => {
  const item: UserVerify = {
    email: 'example@example.com',
    password: '123456',
    role: UserRole.ADMIN,
  };

  it('should return a token', async () => {
    const token = await tokenManager().accessToken(item);
    expect(token).toBe('123');
  });
  it('verifyToken should return a boolean', async () => {
    const token = await tokenManager().verifyToken('123');
    expect(token).toBe(true);
  });
  it('varifyAdminToken should return a boolean', async () => {
    const token = await tokenManager().verifyAdminToken('123');
    expect(token).toBe(true);
  });
});
