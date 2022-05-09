import { passwordCrypt } from '../../infrastructure/shared/password_crypt';

describe('passwordCrypt', () => {
  const { password_crypt, password_compare } = passwordCrypt();

  test('password_crypt', async () => {
    expect(await password_crypt('123456')).toHaveLength(60);
  });
  test('password compare', async () => {
    expect(
      await password_compare(
        '123456',
        '$2b$10$RoTC8jHRNay.b0k.E7kH2urzd8rVsySmO7VtYYCz0DxO6UD7xf0DG'
      )
    ).toBe(true);
  });
});
