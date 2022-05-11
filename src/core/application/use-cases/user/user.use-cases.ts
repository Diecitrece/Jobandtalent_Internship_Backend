import { User } from '../../../domain/user.model';
import {
  UserCRUD,
  UserCreation,
  UserVerify,
} from '../../ports/input/userCRUD.port';

import { dependenciesContainer } from '../../../../infrastructure/shared/dependency_injection';
import { PasswordCrypt } from '../../ports/output/password_crypt.port';
import { UserRepository } from '../../ports/output/repository.port';
import { NotifierPort } from '../../ports/output/notifier.port';

export const userCases = (): UserCRUD => {
  const generateId: () => string = dependenciesContainer.cradle.generateId;
  const passwordCrypt: () => PasswordCrypt =
    dependenciesContainer.cradle.passwordCrypt;
  const userRepository: () => UserRepository =
    dependenciesContainer.cradle.userRepository;
  const consoleNotifier: () => NotifierPort =
    dependenciesContainer.cradle.consoleNotifier;
  const emailNotifier: () => NotifierPort =
    dependenciesContainer.cradle.emailNotifier;
  const create = async (data: UserCreation): Promise<User | undefined> => {
    const { firstName, surNames, email, password, phone, address, role } = data;

    const user: User = {
      id: generateId(),
      firstName,
      surNames,
      email,
      password: await passwordCrypt().password_crypt(password),
      phone,
      address,
      role,
    };
    const newUser = await userRepository().create(user);
    if (newUser) {
      consoleNotifier().notify(user, 'Hello');
      emailNotifier().notify(user, 'Welcome to Jobandtalent!');
    }
    return newUser;
  };
  const getAll = async (): Promise<User[]> => {
    return userRepository().getAll();
  };

  const getOne = async (id: string): Promise<User | undefined> => {
    return userRepository().getOne(id);
  };

  const login = async (item: UserVerify): Promise<User | undefined> => {
    const gotUser = await userRepository().getOneByEmail(item.email);
    if (!gotUser) {
      return undefined;
    }
    const passwordVerify = await passwordCrypt().password_compare(
      item.password,
      gotUser.password
    );
    if (passwordVerify) {
      return gotUser;
    }
    return undefined;
  };

  return { create, getAll, getOne, login };
};
