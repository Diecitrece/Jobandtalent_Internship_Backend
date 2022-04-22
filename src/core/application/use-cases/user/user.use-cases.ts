import { UserCRUD } from '../../ports/input/user.port';
import { User } from '../../../domain/user';
import { userRepositoryPostgres } from '../../../../infrastructure/user/user.postgres';
import { consoleNotifier } from '../../../../infrastructure/notifier/console.notifier';

export const UserCases = (): UserCRUD => {
  const create = async (user: User) => {
    const newUser = await userRepositoryPostgres().create(user);
    if (newUser) {
      consoleNotifier().notify(user, 'Hello');
    }
    return newUser as unknown as User;
  };
  const getAllUsers = async () => {
    const users = await userRepositoryPostgres().getAllUsers();
    return users ? (users as User[]) : [];
  };

  const getOneUser = async (id: string) => {
    const user = await userRepositoryPostgres().getOneUser(id);
    return user ? (user as User) : undefined;
  };

  return { create, getAllUsers, getOneUser };
};
