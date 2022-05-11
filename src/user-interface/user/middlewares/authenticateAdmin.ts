import { tokenManager } from '../../../infrastructure/user/jwt/manageToken';
import { NextFunction, Request, Response, RequestHandler } from 'express';

export const authenticateAdmin: RequestHandler = async (
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
  const verified = await tokenManager().verifyToken(token);
  if (!verified) {
    const verifiedAdmin = await tokenManager().verifyAdminToken(token);
    if (!verifiedAdmin) {
      res.sendStatus(403);
      return;
    }
  }
  next();
};
