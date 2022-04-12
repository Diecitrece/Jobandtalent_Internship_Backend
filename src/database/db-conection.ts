import { knex } from 'knex';
import { User } from '../api/components/user/model';
import users from '../__mocks__/db-mocks';
import configs from './knexfile';

const db = knex(configs.development);

let initialUsers: User[];

if (process.env.NODE_ENV === 'test') {
  initialUsers = users;
}
if (process.env.NODE_ENV === 'development') {
  (async () => {
    initialUsers = await db('users').select('*');
  })();
}

const getUsers = async (): Promise<User[]> => {
  return initialUsers;
};

const checkUserExist = (email: string): User | undefined => {
  return initialUsers.find((user) => user.email === email);
};

const addUser = async (user: User): Promise<User> => {
  const userCreated = await db('users').insert(user).returning('*');
  if (userCreated) {
    return userCreated[0];
  }
  return userCreated;
};

export { getUsers, checkUserExist, addUser };
