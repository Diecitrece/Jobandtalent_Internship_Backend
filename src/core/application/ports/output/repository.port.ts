export interface Respository<Type> {
  create: (arg: Type) => Promise<Type | undefined>;
  getAll: () => Promise<Type[]>;
  getOne: (id: string) => Promise<Type | undefined>;
  getOneByEmail: (email: string) => Promise<Type | undefined>;
}
