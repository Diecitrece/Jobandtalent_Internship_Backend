import { User, UserRole } from '@core/domain/user.model';
import { getUserWithOutSensitiveInfo } from './user.routes';
describe('user.routes functions', () => {
  test('Pass a user to this function, and then it returns it without password', () => {
    const user: User = {
      id: 'iduser',
      firstName: 'Panceta',
      surNames: 'Pancetapellido',
      email: 'panceta@gmail.com',
      password: 'panceta123',
      phone: 'elnúmerodelapanceta',
      address: 'calledelapanceta puerta 1 1ºC',
      role: UserRole.USER,
    };
    const result = getUserWithOutSensitiveInfo(user);
    const { password, ...expected } = user; // eslint-disable-line
    expect(result).toStrictEqual(expected);
  });
});
