import { users } from '../../__mocks__/db-mocks';

const db = {
  getAll: jest.fn(() => Promise.resolve(users)),
  create: jest.fn((user) => Promise.resolve(users[0])),
  getOne: jest.fn((id) => Promise.resolve(users[0])),
  getOneByEmail: jest.fn((email) => Promise.resolve(users[0])),
};

describe('userRepositoryPostgres', () => {
  it('should return all users', async () => {
    const mockUsers = await db.getAll();
    expect(users).toEqual(mockUsers);
  });
  it('should return a user', async () => {
    const mockUser = await db.getOne('1');
    expect(mockUser).toEqual(users[0]);
  });
  it('should return a user by email', async () => {
    const mockUser = await db.getOneByEmail('example@example.com');
    expect(mockUser).toEqual(users[0]);
  });
  it('should create a user', async () => {
    const mockUser = await db.create(users[0]);
    expect(mockUser).toEqual(users[0]);
  });
});
