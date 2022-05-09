import { User } from '@core/domain/user.model';

export interface UserCreation {
  firstName: string;
  surNames: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}
export interface UserVerify {
  email: string;
  password: string;
}
export interface UserCRUD {
  create: (item: UserCreation) => Promise<User | undefined>;
  getAll: () => Promise<User[]>;
  getOne: (id: string) => Promise<User | undefined>;
  login: (item: UserVerify) => Promise<User | undefined>;
}
