import User from '@domain/user';
import { CreateUser } from '@ports/input/create-user.port';
import consoleNotifier from 'infrastructure/console.notifier';
import initialUsers from '__mocks__/db-mocks';

export const createUser: CreateUser = async (user: User) => {
  if (process.env.NODE_ENV === 'test') {
    initialUsers.push(user);
  }
  //Llamando directamente a la infraestructura, teniendo que llamarse a una abstracción (inyección)
  consoleNotifier().notify(user, 'Hello');

  return user;
};
