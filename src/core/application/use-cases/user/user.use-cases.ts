import User from "@domain/user";
import { UserCRUD } from "@ports/input/user.port";
import consoleNotifier from "@infrastructure/notifier/console.notifier";
import { userTest } from "@infrastructure/user/user.inmemory";
import { userRepositoryPostgres } from "@infrastructure/user/user.postgres";

export const UserCases = (): UserCRUD => {
  const create = async (user: User) => {
    if (process.env.NODE_ENV === "test") {
      await userTest().create(user);
      return user;
    }
    //Llamando directamente a la infraestructura, teniendo que llamarse a una abstracción (inyección)
    user = await userRepositoryPostgres().create(user);
    consoleNotifier().notify(user, "Hello");
    return user;
  };
  const get = async () => {
    if (process.env.NODE_ENV === "test") {
      const users = await userTest().get();
      return users;
      //Esto está a medias
    }
  };
  return { create, get, getOne };
};
