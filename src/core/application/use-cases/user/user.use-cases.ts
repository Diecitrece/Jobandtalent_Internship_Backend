import { User } from '../../../domain/user';
import { userRepositoryPostgres } from '../../../../infrastructure/user/user.postgres';
import { consoleNotifier } from '../../../../infrastructure/notifier/console.notifier';
import { Respository } from '../../ports/repository.port';

export const UserCases = (): Respository<User> => {
  const create = async (user: User) => {
    const newUser = await userRepositoryPostgres().create(user);
    if (newUser) {
      consoleNotifier().notify(user, 'Hello');
    }
    return newUser as unknown as User;
  };
  const getAll = async () => {
    const users = await userRepositoryPostgres().getAll();
    return users ? (users as User[]) : [];
  };

  const getOne = async (id: string) => {
    const user = await userRepositoryPostgres().getOne(id);
    return user ? (user as User) : undefined;
  };

  return { create, getAll, getOne };
};
