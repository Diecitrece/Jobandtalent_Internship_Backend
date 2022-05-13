export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string;
  firstName: string;
  surNames: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: UserRole;
}
