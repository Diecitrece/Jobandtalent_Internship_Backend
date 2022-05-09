export interface Respository<Type> {
  create: (arg: Type) => Promise<Type | undefined>;
  getAll: () => Promise<Type[]>;
  getOne: (id: string) => Promise<Type | undefined>;
}
export interface UserRepository<User> extends Respository<User> {
  getOneByEmail: (email: string) => Promise<User | undefined>;
}
