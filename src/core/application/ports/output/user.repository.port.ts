import User from '@domain/user';
export interface UserRespository {
    create: (user: User) => Promise<User>,
    get: () => Promise<User[]>,
    getOne: (id: string) => Promise<User | undefined>
}
