import { UserVerify } from '../input/userCRUD.port';

export interface TokenPort {
  accessToken: (item: UserVerify) => Promise<string>;
  refreshToken: (item: UserVerify) => Promise<string>;
  verifyToken: (token: string) => Promise<boolean>;
  verifyAdminToken: (token: string) => Promise<boolean>;
  verifyTokenNoExpiration: (token: string) => Promise<boolean>;
  verifyRefreshToken: (token: string) => Promise<boolean>;
  decodeToken: (token: string) => Promise<UserVerify | undefined>;
}
