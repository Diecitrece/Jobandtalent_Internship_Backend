import User from "@domain/user";
// export type CreateUser = (user: User) => Promise<User>;
export interface UserCRUD {
  create: (user: User) => Promise<User>;
  get: () => Promise<User[]>;
  getOne: (id: string) => Promise<User | undefined>;
}
