import { UserVerify } from "../input/userCRUD.port";

export interface TokenPort {
  accessToken: (item: UserVerify) => Promise<string>;
  refreshToken: (token: string) => Promise<string>;
}
