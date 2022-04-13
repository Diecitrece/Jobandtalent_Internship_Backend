import User from '../../../domain/user';
export type CreateUser = (email: string) => Promise<User>;
