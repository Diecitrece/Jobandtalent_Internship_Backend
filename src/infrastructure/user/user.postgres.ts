import knex from 'knex';
import User from '@domain/user';
import { UserRespository } from '@ports/output/user.repository.port';
import configs from '@infrastructure/shared/database/knexfile';

const db = knex(configs.development);

export const userRepositoryPostgres = (): UserRespository => {
  const getAllUsers = async () => {
    const users = await db('users').select('*');
    return users as User[];
  };

  const create = async (user: User) => {
    const userCreated = await db('users').insert(user).returning('*');
    return userCreated as unknown as User;
  };

  const getOneUser = async (id: string) => {
    const gotUser = await db('user').select('*').where({ id: id });
    //Pendiente de revisión
    //console.log(gotUser);
    return gotUser ? (gotUser as unknown as User) : undefined;
  };
  return { getAllUsers, create, getOneUser };
};
