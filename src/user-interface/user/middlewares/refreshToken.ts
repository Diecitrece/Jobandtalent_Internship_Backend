import { tokenManager } from '@infrastructure/user/jwt/manageToken';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import { dependenciesContainer } from '@shared/dependency_injection';
import { UserVerify } from '@ports/input/userCRUD.port';
const refreshTokenCases = dependenciesContainer.cradle.refreshTokenCases;
export const refreshToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }
  const verifiedExpiration = await tokenManager().verifyTokenNoExpiration(
    token
  );
  //si verifiedExpiration me devuelve true, singifica que el token es válido, aunque esté expirado.
  const verifyToken = await tokenManager().verifyToken(token);
  //si al verificarlo de forma normal con verifyAdminToken me da false, significa que hay que refrescar el accessToken
  if (verifiedExpiration && !verifyToken) {
    const { ogRefreshToken } = req.body;
    const verifyRefreshToken = await tokenManager().verifyRefreshToken(
      ogRefreshToken
    );
    if (verifyRefreshToken) {
      const payload = await tokenManager().decodeToken(ogRefreshToken);
      if (!payload) {
        res.send('Log out');
        return;
      }
      const newAccessToken = tokenManager().accessToken(payload);
    }
    refreshTokenCases.remove(ogRefreshToken);
    res.send('Log out');
    return;
  }
};
