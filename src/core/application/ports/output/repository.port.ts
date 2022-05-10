import { User } from "../../../domain/user.model";
export interface Repository<Type> {
  create: (arg: Type) => Promise<Type | undefined>;
  getAll: () => Promise<Type[]>;
  getOne: (id: string) => Promise<Type | undefined>;
}
export interface UserRepository extends Repository<User> {
  getOneByEmail: (email: string) => Promise<User | undefined>;
}
