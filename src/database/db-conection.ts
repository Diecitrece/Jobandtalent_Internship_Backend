import { knex } from 'knex';
import { User } from '../api/components/user/model';
import knexConfig from './knexfile';

const db = knex(knexConfig);

export const getUsers = async (): Promise<User[]> => {
  return db('users').select('*');
};

export const addUser = async (user: User): Promise<User> => {
  const userCreated = await db('users').insert(user).returning('*');
  if (userCreated) {
    return userCreated[0];
  }
  return userCreated;
};
