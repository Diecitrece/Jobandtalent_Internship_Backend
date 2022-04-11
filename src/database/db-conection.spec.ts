import { checkUserExist } from './db-conection';

describe('checkUserExist', () => {
  it('should return a user if user exist', async () => {
    const login = {
      email: 'juanfril@gmail.com',
      password: '123456',
    };
    const user = {
      id: '1',
      firstName: 'John',
      surNames: 'Doe',
      email: 'juanfril@gmail.com',
      password: '123456',
      phone: '123456789',
      address: 'Calle falsa 123',
    };
    const result = await checkUserExist(login.email);
    expect(result).toEqual(user);
  });

  it('should return null if user does not exist', async () => {
    const login = {
      email: 'juanfril@gmail.com',
      password: '123456',
    };
    const result = await checkUserExist(login.email);
    expect(result).toBeNull();
  });
});
