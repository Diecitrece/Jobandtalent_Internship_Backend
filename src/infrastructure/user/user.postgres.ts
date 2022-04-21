import knex from 'knex';
import configs from '../../../knexfile';
import User from '@domain/user';
import { UserRespository } from '@ports/output/user.repository.port';

const db = knex(configs.development);

export const createUserPostgres = (): UserRespository => {
  const get = async () => {
    return await db('users').select('*');
  };

  const create = async (user: User) => {
    const userCreated = await db('users').insert(user).returning('*');
    if (userCreated) {
      return userCreated[0];
    }
    return userCreated;
  };

  const getOne = async (id: string) => {
    const gotUser = await db('user').select('*').where({ id: id });
    //Pendiente de revisión
    //console.log(gotUser);
    return gotUser ? (gotUser as unknown as User) : undefined;
  };
  return { get, create, getOne };
};
