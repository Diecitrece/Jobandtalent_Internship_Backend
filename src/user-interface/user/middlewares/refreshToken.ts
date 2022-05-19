import { tokenManager } from '@infrastructure/user/jwt/manageToken';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import { dependenciesContainer } from '@shared/dependency_injection';
import { RefreshTokenCRUD } from '@ports/input/refreshTokenCRUD.port';
import { UserCRUD } from '@ports/input/userCRUD.port';
import { tokenPayload } from '@ports/output/token.port';
const refreshTokenCases: RefreshTokenCRUD =
  dependenciesContainer.cradle.refreshTokenCases();
const userCases: UserCRUD = dependenciesContainer.cradle.userCases();
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
  const verifyToken = await tokenManager().verifyToken(token);
  if (verifiedExpiration == true && verifyToken == false) {
    const ogRefreshToken = req.body.refreshToken;
    if (!ogRefreshToken) {
      res
        .status(403)
        .send('Access token expired, please provide your refreshToken');
      return;
    }
    const verifyRefreshToken = await tokenManager().verifyRefreshToken(
      ogRefreshToken
    );
    if (verifyRefreshToken) {
      const payload = await tokenManager().decodeToken(ogRefreshToken);
      if (!payload) {
        res.send('Log out');
        return;
      }
      const newAccessToken = await tokenManager().accessToken(payload);
      await refreshTokenCases.remove(ogRefreshToken);
      const newRefreshToken = await tokenManager().refreshToken(payload);
      const userData = await userCases.getOne(payload.id);
      if (userData) {
        const { id } = userData;
        await refreshTokenCases.save(id, newRefreshToken);
        req.params.accessToken = newAccessToken;
        //SET HEADERS
        req.params.refreshToken = newRefreshToken;
        console.log(req.params.refreshToken);
        next();
        return;
      }
      next();
      return;
    }
    refreshTokenCases.remove(ogRefreshToken);
    res.send('Log out');
    return;
  }
  next();
  return;
};
