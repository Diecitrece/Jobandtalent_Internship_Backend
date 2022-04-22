import { User } from "../../../domain/user.model";
import { Body } from "../../../../user-interface/user/body.model";
import { userRepositoryPostgres } from "../../../../infrastructure/user/user.postgres";
import { consoleNotifier } from "../../../../infrastructure/notifier/console.notifier";
import { UserCRUD } from "../../ports/input/userCRUD.port";
import { password_crypt } from "../../../../infrastructure/shared/password_crypt";
import { generateId } from "../../../../infrastructure/shared/uuid";

export const UserCases = (): UserCRUD => {
  const create = async (body: Body) => {
    user: User = {
      //hacer toda la mierda del mapeo
    };
    user.password = await password_crypt(user.password);
    user.id = generateId();
    const newUser = await userRepositoryPostgres().create(user);
    if (newUser) {
      consoleNotifier().notify(user, "Hello");
    }
    return newUser as unknown as User;
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
