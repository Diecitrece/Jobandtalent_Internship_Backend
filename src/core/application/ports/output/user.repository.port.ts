import { User } from '../../../domain/user';

export interface UserRespository {
  create: (user: User) => Promise<User | undefined>;
  getAllUsers: () => Promise<User[] | []>;
  getOneUser: (id: string) => Promise<User | undefined>;
}
