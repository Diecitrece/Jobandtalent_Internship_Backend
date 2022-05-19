import { UserVerify } from '@ports/input/userCRUD.port';

export interface tokenPayload extends UserVerify {
  id: 'string';
}

export interface TokenPort {
  accessToken: (item: tokenPayload) => Promise<string>;
  refreshToken: (item: tokenPayload) => Promise<string>;
  verifyToken: (token: string) => Promise<boolean>;
  verifyAdminToken: (token: string) => Promise<boolean>;
  verifyTokenNoExpiration: (token: string) => Promise<boolean>;
  verifyRefreshToken: (token: string) => Promise<boolean>;
  decodeToken: (token: string) => Promise<tokenPayload | undefined>;
}
