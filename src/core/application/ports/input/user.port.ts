import { User } from '../../../domain/user';

export interface UserCRUD {
  create: (user: User) => Promise<User | undefined>;
  getAllUsers: () => Promise<User[] | []>;
  getOneUser: (id: string) => Promise<User | undefined>;
}
