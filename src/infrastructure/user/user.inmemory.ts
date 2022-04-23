import { Respository } from "../../core/application/ports/output/repository.port";
import { User } from "../../core/domain/user.model";
import initialUsers from "../../__mocks__/db-mocks";

export const UserInMemory = (): Respository<User> => {
  const create = async (user: User) => {
    initialUsers.push(user);
    return user;
  };
  const getAll = async () => {
    return initialUsers;
  };
  const getOne = async (id: string) => {
    return initialUsers.find((user) => id === user.id);
  };
  return { create, getAll, getOne };
};
