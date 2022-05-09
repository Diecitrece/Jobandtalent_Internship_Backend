import { User } from '@domain/user.model';
import { UserCreation, UserCRUD, UserVerify } from '@ports/input/userCRUD.port';
import { userRepositoryPostgres } from '../../../../infrastructure/user/user.postgres';
import { consoleNotifier } from '../../../../infrastructure/notifier/console.notifier';
import { generateId } from '../../../../infrastructure/shared/uuid';
import { emailNotifier } from '../../../../infrastructure/notifier/email.notifier';
import { passwordCrypt } from '../../../../infrastructure/shared/password_crypt';

export const UserCases = (): UserCRUD => {
  const create = async (data: UserCreation): Promise<User | undefined> => {
    const { firstName, surNames, email, password, phone, address } = data;

    const user: User = {
      id: generateId(),
      firstName: firstName,
      surNames: surNames,
      email: email,
      password: await passwordCrypt().password_crypt(password),
      phone: phone,
      address: address,
    };
    const newUser = await userRepositoryPostgres().create(user);
    if (newUser) {
      consoleNotifier().notify(user, 'Hello');
      emailNotifier().notify(user, 'Welcome to Jobandtalent');
    }
    return newUser;
  };
  const getAll = async (): Promise<User[]> => {
    return userRepositoryPostgres().getAll();
  };

  const getOne = async (id: string): Promise<User | undefined> => {
    return userRepositoryPostgres().getOne(id);
  };

  const login = async (item: UserVerify): Promise<User | undefined> => {
    const gotUser = await userRepositoryPostgres().getOneByEmail(item.email);
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
