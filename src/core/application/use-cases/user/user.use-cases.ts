import { User } from "../../../domain/user.model";
import { userRepositoryPostgres } from "../../../../infrastructure/user/user.postgres";
import { consoleNotifier } from "../../../../infrastructure/notifier/console.notifier";
import { UserCreation, UserCRUD } from "../../ports/input/userCRUD.port";
import { password_crypt } from "../../../../infrastructure/shared/password_crypt";
import { generateId } from "../../../../infrastructure/shared/uuid";

export const UserCases = (): UserCRUD => {
  const create = async (data: UserCreation) => {
    const { firstName, surNames, email, password, phone, address } = data;

    const user: User = {
      id: generateId(),
      firstName: firstName,
      surNames: surNames,
      email: email,
      password: await password_crypt(password),
      phone: phone,
      address: address,
    };
    const newUser = await userRepositoryPostgres().create(user);
    if (newUser) {
      consoleNotifier().notify(user, "Hello");
    }
    return newUser;
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
