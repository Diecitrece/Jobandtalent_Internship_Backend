import 'dotenv/config';
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import { userRouter } from './user-interface/user/user.routes';
import { companyRouter } from './user-interface/company/company.routes';
import { authenticateAdmin } from '@user-interface/user/middlewares/authenticateAdmin';
import { authenticateToken } from '@user-interface/middlewares/authenticateToken';
import { refreshToken } from '@user-interface/user/middlewares/refreshToken';
import cors from 'cors';

export const app = express();
app.use(cors());

const routesFilter = (publicRoutes: string[], middleware: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!publicRoutes.includes(req.path)) {
      return middleware(req, res, next);
    }
    next();
  };
};

const publicRoutes: string[] = [
  '/api/users/login',
  '/api/users/logout',
  '/api/users',
  '/',
];

app.use(routesFilter(publicRoutes, refreshToken));
app.use(routesFilter(publicRoutes, authenticateToken));
app.use('/admin', authenticateAdmin);

app.use(userRouter, companyRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Working 👍🏼');
});
