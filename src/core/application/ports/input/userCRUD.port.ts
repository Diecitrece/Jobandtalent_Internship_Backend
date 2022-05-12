import { User } from '@domain/user.model';
import { CRUD } from './CRUD.port';
export type UserCreation = Omit<User, 'id'>;

export interface UserVerify {
  email: string;
  password: string;
}
export interface UserCRUD extends CRUD<User, UserCreation> {
  login: (item: UserVerify) => Promise<User | undefined>;
}
