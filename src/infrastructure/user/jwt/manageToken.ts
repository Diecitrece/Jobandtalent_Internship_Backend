import { UserVerify } from '@ports/input/userCRUD.port';
import { TokenPort } from '@ports/output/token.port';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../../../core/domain/user.model';

const secretKey = process.env.JWT_SECRET_KEY;
const refreshSecretKey = process.env.JWT_REFRESH_SECRET_KET;
export const tokenManager = (): TokenPort => {
  const accessToken = async (item: UserVerify): Promise<string> => {
    return jwt.sign(item, secretKey as Secret, { expiresIn: '15m' });
  };
  const refreshToken = async (item: UserVerify): Promise<string> => {
    return jwt.sign(item, refreshSecretKey as Secret, { expiresIn: '30d' });
  };
  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      jwt.verify(token, secretKey as Secret);
      return true;
    } catch (err) {
      return false;
    }
  };
  const verifyAdminToken = async (token: string): Promise<boolean> => {
    const verified = await verifyToken(token);
    if (verified) {
      const decoded: UserVerify = jwt.decode(token) as UserVerify;

      return decoded && decoded?.role === UserRole.ADMIN ? true : false;
    }
    return verified;
  };
  const verifyTokenNoExpiration = async (token: string): Promise<boolean> => {
    try {
      jwt.verify(token, secretKey as Secret, { ignoreExpiration: true });
      return true;
    } catch (err) {
      return false;
    }
  };
  const verifyRefreshToken = async (token: string): Promise<boolean> => {
    try {
      jwt.verify(token, refreshSecretKey as Secret);
      return true;
    } catch (err) {
      return false;
    }
  };
  const decodeToken = async (
    token: string
  ): Promise<UserVerify | undefined> => {
    const decoded = jwt.decode(token);
    if (!decoded) {
      return undefined;
    }
    return decoded as UserVerify;
  };
  return {
    accessToken,
    refreshToken,
    verifyToken,
    verifyAdminToken,
    verifyTokenNoExpiration,
    verifyRefreshToken,
    decodeToken,
  };
};
