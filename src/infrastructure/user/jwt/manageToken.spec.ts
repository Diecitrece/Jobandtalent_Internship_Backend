import { UserVerify } from '../../../core/application/ports/input/userCRUD.port';
import { tokenManager } from './manageToken';

//mock the tokenManager
jest.mock('./manageToken', () => {
  return {
    accessToken: jest.fn().mockReturnValue('accessToken'),
    verifyToken: jest.fn().mockReturnValue(true),
  };
});

describe('tokenManager', () => {
  const item: UserVerify = {
    email: 'example@example.com',
    password: '123456',
  };

  it('should return accessToken', async () => {
    const accessToken = await tokenManager().accessToken(item);
    expect(accessToken).toBe('accessToken');
  });
  it('should return true', async () => {
    const verified = await tokenManager().verifyToken('token');
    expect(verified).toBe(true);
  });
});
