import { knex } from 'knex';
import { User } from '../api/components/user/model';
import configs from './knexfile';

const db = knex(configs.development);

const getUsers = async (): Promise<User[]> => {
  return db('users').select('*');
};

const checkUserExist = async (email: string): Promise<User | null> => {
  const user = await db('users').where({ email }).select('*');
  if (user) {
    return user[0];
  }
  return null;
};

const addUser = async (user: User): Promise<User> => {
  const userCreated = await db('users').insert(user).returning('*');
  if (userCreated) {
    return userCreated[0];
  }
  return userCreated;
};

export { getUsers, checkUserExist, addUser };
