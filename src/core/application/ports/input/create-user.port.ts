import User from '@domain/user';
export type CreateUser = (user: User) => Promise<User>;
