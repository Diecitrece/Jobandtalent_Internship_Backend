import { tokenManager } from '@infrastructure/user/jwt/manageToken';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import { dependenciesContainer } from '@shared/dependency_injection';
import { RefreshTokenCRUD } from '@ports/input/refreshTokenCRUD.port';
import { UserCRUD } from '@ports/input/userCRUD.port';
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
  const verifiedNoExpiration = await tokenManager().verifyTokenNoExpiration(
    token
  );
  const verifyTokeWithExpiration = await tokenManager().verifyToken(token);
  if (verifiedNoExpiration == true && verifyTokeWithExpiration == false) {
    const refreshToken = req.headers['refresh_token'] as string | undefined;
    if (!refreshToken) {
      res
        .status(403)
        .send('Access token expired, please provide your refreshToken');
      return;
    }
    const verifyRefreshTokenOrigin = await tokenManager().verifyRefreshToken(
      refreshToken
    );
    const verifyRefreshTokenRegistry = await refreshTokenCases.verify(
      refreshToken
    );
    if (verifyRefreshTokenOrigin && verifyRefreshTokenRegistry) {
      const payload = await tokenManager().decodeToken(refreshToken);
      if (!payload) {
        res.status(404).send('Log out');
        return;
      }
      const newAccessToken = await tokenManager().accessToken(payload);
      await refreshTokenCases.remove(refreshToken);
      const newRefreshToken = await tokenManager().refreshToken(payload);
      const userData = await userCases.getOne(payload.id);
      if (userData) {
        const { id } = userData;
        await refreshTokenCases.save(id, newRefreshToken);
        res.statusMessage = 'accessToken expired, new tokens provided';
        res.status(201).json({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
        return;
      }
      next();
      return;
    }
    refreshTokenCases.remove(refreshToken);
    res.status(404).send('Log out');
    return;
  }
  next();
  return;
};
