import knex from 'knex';
import { UserRepository } from '../../core/application/ports/output/repository.port';
import { User, UserRoles } from '../../core/domain/user.model';
import configs from '../shared/database/knexfile';

const db =
  process.env.NODE_ENV === 'test'
    ? knex(configs.test)
    : knex(configs.development);

export const userRepositoryPostgres = (): UserRepository => {
  const getAll = async (): Promise<User[]> => {
    const users = await db('users').select('*');
    return users as User[];
  };

  const create = async (user: User): Promise<User | undefined> => {
    const userExist = await db('users').where('email', user.email);
    if (userExist.length > 0) {
      return undefined;
    }
    const userCreated: User = {
      id: user.id,
      firstName: user.firstName,
      surNames: user.surNames,
      email: user.email,
      password: user.password,
      phone: user.phone,
      address: user.address,
      role: UserRoles.USER,
    };

    const newUser: User = (await db('users').insert(userCreated, ['*']))[0];
    return newUser;
  };

  const getOne = async (id: string): Promise<User | undefined> => {
    const gotUser: User = await db('users')
      .select('*')
      .where({ id: id })
      .first();
    return gotUser || undefined;
  };
  const getOneByEmail = async (email: string): Promise<User | undefined> => {
    const gotUser: User = await db('users')
      .select('*')
      .where({ email: email })
      .first();
    return gotUser || undefined;
  };
  return { getAll, create, getOne, getOneByEmail };
};
