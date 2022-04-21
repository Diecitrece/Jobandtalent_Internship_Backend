import User from '@domain/user';
import { UserCRUD } from '@ports/input/user.port';
import consoleNotifier from '@infrastructure/notifier/console.notifier';
import { userTest } from '@infrastructure/user/user.inmemory';
import { userRepositoryPostgres } from '@infrastructure/user/user.postgres';

export const UserCases = (): UserCRUD => {
  const create = async (user: User) => {
    if (process.env.NODE_ENV === 'test') {
      const newUser = await userTest().create(user);
      return newUser as unknown as User;
    }
    //Llamando directamente a la infraestructura, teniendo que llamarse a una abstracción (inyección)
    if (process.env.NODE_ENV === 'development') {
      const newUser = await userRepositoryPostgres().create(user);
      if (newUser) {
        consoleNotifier().notify(user, 'Hello');
      }
      return newUser as unknown as User;
    }
  };
  const getAllUsers = async () => {
    if (process.env.NODE_ENV === 'test') {
      const users = await userTest().getAllUsers();
      return users ? (users as User[]) : [];
    }
    if (process.env.NODE_ENV === 'development') {
      const users = await userRepositoryPostgres().getAllUsers();
      return users ? (users as User[]) : [];
    }
  };

  const getOneUser = async (id: string) => {
    if (process.env.NODE_ENV === 'test') {
      const user = await userTest().getOneUser(id);
      return user ? (user as User) : undefined;
    }
    if (process.env.NODE_ENV === 'development') {
      const user = await userRepositoryPostgres().getOneUser(id);
      return user ? (user as User) : undefined;
    }
  };

  return { create, getAllUsers, getOneUser };
};
