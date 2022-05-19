import { User } from '@domain/user.model';
import { Company } from '@domain/company.model';
export interface Repository<Type> {
  create: (arg: Type) => Promise<Type | undefined>;
  getAll: () => Promise<Type[]>;
  getOne: (id: string) => Promise<Type | undefined>;
}
export interface UserRepository extends Repository<User> {
  getOneByEmail: (email: string) => Promise<User | undefined>;
}
export type CompanyRepository = Repository<Company>;

export interface RefreshTokenRepository {
  save: (idUser: string, token: string) => Promise<void>;
  verify: (token: string) => Promise<boolean>;
  remove: (token: string) => Promise<void>;
}
