import { CreateUser } from '@ports/input/create-user.port';
import User from '@domain/user';
import { schemaUserRegister } from './validate-user';
import { generateId } from 'utils/uuid';
import password_crypt from 'utils/password_crypt';
import { createUser } from '@use-cases/user/create-user.use-case';

const validated: CreateUser = async (user: User) => {
  //Aquí llamaríamos al puerto, pero como aún no podemos... llamamos directamente al caso de uso
  const newUser = await createUser(user);
  return Promise.resolve(newUser);
};

export const register = async (user: User) => {
  user.id = generateId();
  if (schemaUserRegister.validate(user).error) {
    return schemaUserRegister.validate(user).error?.details;
  }
  user.password = await password_crypt(user.password);
  const newUser = await validated(user);

  return newUser;
};
