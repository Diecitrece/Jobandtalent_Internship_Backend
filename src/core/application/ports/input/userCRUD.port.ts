import { User } from "../../../domain/user.model";
export interface UserCreation {
  firstName: string;
  surNames: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}
export interface UserCRUD {
  create: (item: UserCreation) => Promise<User | undefined>;
  getAll: () => Promise<User[] | []>;
  getOne: (id: string) => Promise<User | undefined>;
}
