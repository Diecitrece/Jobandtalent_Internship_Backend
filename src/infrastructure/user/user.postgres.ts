import knex from 'knex';
import { UserRespository } from '../../core/application/ports/output/user.repository.port';
import { User } from '../../core/domain/user';
import { configs } from '../shared/database/knexfile';

const db = knex(configs.development);

export const userRepositoryPostgres = (): UserRespository => {
  const getAllUsers = async () => {
    const users = await db('users').select('*');
    return users as User[];
  };

  const create = async (user: User) => {
    const userExist = await db('users').where('email', user.email);
    if (userExist.length > 0) {
      return undefined;
    }
    const userCreated = await db('users').insert(user).returning('*');
    return userCreated as unknown as User;
  };

  const getOneUser = async (id: string) => {
    const gotUser = await db('users').select('*').where({ id: id });
    //Pendiente de revisión
    //console.log(gotUser);
    return gotUser ? (gotUser as unknown as User) : undefined;
  };
  return { getAllUsers, create, getOneUser };
};
