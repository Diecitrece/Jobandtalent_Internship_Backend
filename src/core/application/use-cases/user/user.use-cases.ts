import { User } from "../../../domain/user.model";
import {
  UserCreation,
  UserCRUD,
  UserVerify,
} from "../../ports/input/userCRUD.port";

import {
  userRepositoryDep,
  consoleNotifierDep,
  generateIdDep,
  emailNotifierDep,
  passwordCryptDep,
} from "../../../../infrastructure/shared/dependency_injection";

export const userCases = (): UserCRUD => {
  const create = async (data: UserCreation): Promise<User | undefined> => {
    const { firstName, surNames, email, password, phone, address } = data;

    const user: User = {
      id: generateIdDep,
      firstName: firstName,
      surNames: surNames,
      email: email,
      password: await passwordCryptDep.password_crypt(password),
      phone: phone,
      address: address,
    };
    const newUser = await userRepositoryDep.create(user);
    if (newUser) {
      consoleNotifierDep.notify(user, "Hello");
      emailNotifierDep.notify(user, "Welcome to Jobandtalent!");
    }
    return newUser;
  };
  const getAll = async (): Promise<User[]> => {
    return userRepositoryDep.getAll();
  };

  const getOne = async (id: string): Promise<User | undefined> => {
    return userRepositoryDep.getOne(id);
  };

  const login = async (item: UserVerify): Promise<User | undefined> => {
    const gotUser = await userRepositoryDep.getOneByEmail(item.email);
    if (!gotUser) {
      return undefined;
    }
    const passwordVerify = await passwordCryptDep.password_compare(
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
