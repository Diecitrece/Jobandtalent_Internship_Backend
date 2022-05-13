import { UserVerify } from '../input/userCRUD.port';

export interface TokenPort {
  accessToken: (item: UserVerify) => Promise<string>;
  verifyToken: (token: string) => Promise<boolean>;
  verifyAdminToken: (token: string) => Promise<boolean>;
}
