import { User, UserRole } from '@core/domain/user.model';

export type UserCreation = Omit<User, 'id'>;

export interface UserVerify {
  email: string;
  password: string;
  role: UserRole;
}
export interface UserCRUD {
  create: (item: UserCreation) => Promise<User | undefined>;
  getAll: () => Promise<User[]>;
  getOne: (id: string) => Promise<User | undefined>;
  login: (item: UserVerify) => Promise<User | undefined>;
}
