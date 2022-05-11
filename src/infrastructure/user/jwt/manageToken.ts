import { UserVerify } from '@core/application/ports/input/userCRUD.port';
import { TokenPort } from '@core/application/ports/output/token.port';
import jwt, { Secret } from 'jsonwebtoken';
import { UserRole } from '../../../core/domain/user.model';

const secretKey = process.env.JWT_SECRET_KEY;
export const tokenManager = (): TokenPort => {
  const accessToken = async (item: UserVerify): Promise<string> => {
    return jwt.sign(item, secretKey as Secret, { expiresIn: '15m' });
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
    const decoded = jwt.decode(token);
    console.log(decoded);

    const data = decoded as UserVerify;
    console.log(data);

    return data && data.role === UserRole.ADMIN ? true : false;
  };
  return { accessToken, verifyToken, verifyAdminToken };
};
