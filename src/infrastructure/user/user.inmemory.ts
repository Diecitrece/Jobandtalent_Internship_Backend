import { Respository } from '../../core/application/ports/repository.port';
import { User } from '../../core/domain/user';
import initialUsers from '../../__mocks__/db-mocks';

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
