import consoleNotifier from '../../../../infrastructure/console.notifier';
import { CreateUser } from '../../ports/input/create-user.port';

export const createUser: CreateUser = async (email: string) => {
  const user = {
    id: '',
    firstName: '',
    surNames: '',
    email: email,
    password: '',
    phone: '',
    address: '',
  };

  consoleNotifier().notify(user, 'Hello');
  //Llamando directamente a la infraestructura, teniendo que llamarse a una abstracción (inyección)

  return user;
};
