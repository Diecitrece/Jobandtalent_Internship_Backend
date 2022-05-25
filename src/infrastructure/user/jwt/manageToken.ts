import { tokenPayload, TokenPort } from '@ports/output/token.port';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../../../core/domain/user.model';

const secretKey = process.env.JWT_SECRET_KEY;
const refreshSecretKey = process.env.JWT_REFRESH_SECRET_KET;
export const tokenManager = (): TokenPort => {
  const accessToken = async (item: tokenPayload): Promise<string> => {
    return jwt.sign(item, secretKey as Secret, { expiresIn: '15m' });
  };
  const refreshToken = async (item: tokenPayload): Promise<string> => {
    return jwt.sign(item, refreshSecretKey as Secret, { expiresIn: '24h' });
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
      const decoded = jwt.decode(token) as JwtPayload;

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
  ): Promise<tokenPayload | undefined> => {
    const decoded = jwt.decode(token) as JwtPayload;
    if (!decoded) {
      return undefined;
    }
    const { id, email, password, role } = decoded;
    const payload: tokenPayload = {
      id,
      email,
      password,
      role,
    };
    return payload;
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
