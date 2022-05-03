import { Respository } from "../../core/application/ports/output/repository.port";
import { User } from "../../core/domain/user.model";
import initialUsers from "../../__mocks__/db-mocks";

export const UserInMemory = (): Respository<User> => {
  const create = async (user: User): Promise<User | undefined> => {
    initialUsers.push(user);
    return user;
  };
  const getAll = async (): Promise<User[]> => {
    return initialUsers;
  };
  const getOne = async (id: string): Promise<User | undefined> => {
    return initialUsers.find((user) => id === user.id);
  };
  const getOneByEmail = async (email: string): Promise<User | undefined> => {
    return initialUsers.find((user) => email === user.email);
  };
  return { create, getAll, getOne, getOneByEmail };
};
