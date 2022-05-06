import { userRepositoryPostgres } from './user.postgres';
import { users } from '../../__mocks__/db-mocks';

jest.mock('./user.postgres', () => ({
  userRepositoryPostgres: jest.fn().mockReturnValue({
    getAll: jest.fn().mockResolvedValue([
      {
        id: '1',
        firstName: 'John',
        surNames: 'Doe',
        email: 'example@example.com',
        password: '123456',
        phone: '123456789',
        address: 'Calle falsa 123',
      },
      {
        id: '2',
        firstName: 'Johnatan',
        surNames: 'Doe',
        email: 'johnatan@gmail.com',
        password: '11223344',
        phone: '123456789',
        address: 'Calle falsa 123',
      },
      {
        id: '3',
        firstName: 'Maria',
        surNames: 'guajara',
        email: 'maria@gmail.com',
        password: '111222333',
        phone: '123456789',
        address: 'Calle falsa 123',
      },
      {
        id: '4',
        firstName: 'Carlos',
        surNames: 'Martinez',
        email: 'carlos@gmail.com',
        password: '222333444',
        phone: '123456789',
        address: 'Calle falsa 123',
      },
      {
        id: '5',
        firstName: 'Juan',
        surNames: 'Fril',
        email: 'hippie@gmail.com',
        password: '999888777',
        phone: '123456789',
        address: 'Calle falsa 123',
      },
    ]),
    getOne: jest.fn().mockResolvedValue({
      id: '1',
      firstName: 'John',
      surNames: 'Doe',
      email: 'example@example.com',
      password: '123456',
      phone: '123456789',
      address: 'Calle falsa 123',
    }),
    getOneByEmail: jest.fn().mockResolvedValue({
      id: '1',
      firstName: 'John',
      surNames: 'Doe',
      email: 'example@example.com',
      password: '123456',
      phone: '123456789',
      address: 'Calle falsa 123',
    }),
    create: jest.fn().mockResolvedValue({
      id: '1',
      firstName: 'John',
      surNames: 'Doe',
      email: 'example@example.com',
      password: '123456',
      phone: '123456789',
      address: 'Calle falsa 123',
    }),
  }),
}));

describe('userRepositoryPostgres', () => {
  it('should return a user looking for a id', async () => {
    const user = await userRepositoryPostgres().getOne('1');
    expect(user).toBeDefined();
    expect(user).toEqual(users[0]);
  });
  it('should return a user looking for a email', async () => {
    const user = await userRepositoryPostgres().getOneByEmail(
      'example@example.com'
    );
    expect(user).toBeDefined();
    expect(user).toEqual(users[0]);
  });
  it('should return all users', async () => {
    const user = await userRepositoryPostgres().getAll();
    expect(user).toBeDefined();
    expect(user).toEqual(users);
  });
  it('should return the user created', async () => {
    const user = await userRepositoryPostgres().create(users[0]);
    expect(user).toBeDefined();
    expect(user).toEqual(users[0]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
