import { UserRespository } from '../../core/application/ports/output/user.repository.port';
import { User } from '../../core/domain/user';
import initialUsers from '../../__mocks__/db-mocks';

export const UserInMemory = (): UserRespository => {
  const create = async (user: User) => {
    initialUsers.push(user);
    return user;
  };
  const getAllUsers = async () => {
    return initialUsers;
  };
  const getOneUser = async (id: string) => {
    return initialUsers.find((user) => id === user.id);
  };
  return { create, getAllUsers, getOneUser };
};
