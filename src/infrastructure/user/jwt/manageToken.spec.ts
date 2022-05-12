import { UserVerify } from '@ports/input/userCRUD.port';
import { tokenManager } from './manageToken';

//mock the tokenManager
jest.mock('./manageToken', () => ({
  tokenManager: jest.fn().mockReturnValue({
    accessToken: jest.fn().mockReturnValue('123'),
    verifyToken: jest.fn().mockReturnValue(true),
  }),
}));

describe('tokenManager', () => {
  const item: UserVerify = {
    email: 'example@example.com',
    password: '123456',
  };

  it('should return a token', async () => {
    const token = await tokenManager().accessToken(item);
    expect(token).toBe('123');
  });
  it('should return a boolean', async () => {
    const token = await tokenManager().verifyToken('123');
    expect(token).toBe(true);
  });
});
