import bcrypt from 'bcrypt';
import { passwordCrypt } from '../../infrastructure/shared/password_crypt';

jest.mock('bcrypt');

describe('passwordCrypt', () => {
  const password_crypt = passwordCrypt();

  test('password_crypt', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue('hash');
    const password = 'password';
    const result = await password_crypt.password_crypt(password);
    expect(result).toBe('hash');
  });
  test('password compare', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    const password1 = 'password1';
    const password2 = 'password2';
    const result = await password_crypt.password_compare(password1, password2);
    expect(result).toBe(true);
  });
});
