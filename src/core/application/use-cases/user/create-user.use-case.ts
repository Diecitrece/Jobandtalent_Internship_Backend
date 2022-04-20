import User from '@domain/user';
import { UserCRUD } from '@ports/input/create-user.port';
import consoleNotifier from '@infrastructure/notifier/console.notifier';
import { createUserTest } from '@infrastructure/user/user.inmemory'

export const UserCases = (): UserCRUD => {
  const create = async (user: User) => {
    if (process.env.NODE_ENV === 'test') {
      await createUserTest().create(user);
      return user;
    }
    //Llamando directamente a la infraestructura, teniendo que llamarse a una abstracción (inyección)
    consoleNotifier().notify(user, 'Hello');
    
    return user;
  }
  return { create }
};
