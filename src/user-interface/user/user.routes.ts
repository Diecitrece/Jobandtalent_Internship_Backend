import { Request, Response, Router } from 'express';
import { User } from '@domain/user.model';
import { schemaUserLogin, schemaUserRegister } from './validate-body.user';
import { UserCreation, UserCRUD, UserVerify } from '@ports/input/userCRUD.port';
import bodyParser from 'body-parser';
import { tokenManager } from '@infrastructure/user/jwt/manageToken';
import { dependenciesContainer } from '@shared/dependency_injection';
import { authenticateToken } from '../middlewares/authenticateToken';
const userCases: UserCRUD = dependenciesContainer.cradle.userCases();

export type NonSensitiveInfoUser = Omit<User, 'password'>;

export const getUserWithOutSensitiveInfo = (
  user: User
): NonSensitiveInfoUser => {
  const { password, ...userWithoutPassword } = user; // eslint-disable-line
  return userWithoutPassword;
};

export const userRouter = Router();
userRouter.use(bodyParser.json());
userRouter.get(
  '/api/users',
  authenticateToken,
  async (_req: Request, res: Response): Promise<void> => {
    const users = await userCases.getAll();
    const usersReturn: NonSensitiveInfoUser[] = [];
    users.map((user) => {
      usersReturn.push(getUserWithOutSensitiveInfo(user));
    });
    res.status(200).json(usersReturn);
    return;
  }
);
userRouter.get(
  '/api/users/:id',
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    if (typeof req.params.id !== 'string') {
      res.status(400).send('Invalid ID');
      return;
    }
    const id: string = req.params.id;
    const user = await userCases.getOne(id);
    if (user) {
      res.status(200).json(getUserWithOutSensitiveInfo(user));
      return;
    }
    res.status(404).send('User not found');
    return;
  }
);
userRouter.post(
  '/api/users',
  async (req: Request, res: Response): Promise<void> => {
    const validation = schemaUserRegister.validate(req.body);
    if (validation.error) {
      res.status(400).send(validation.error?.details[0].message);
      return;
    }
    const body: UserCreation = req.body;
    const newUser = await userCases.create(body);
    if (newUser) {
      res.status(201).json(getUserWithOutSensitiveInfo(newUser));
      return;
    }
    res.status(400).send('User already exists');
    return;
  }
);

userRouter.post(
  '/api/users/login',
  async (req: Request, res: Response): Promise<void> => {
    const validation = schemaUserLogin.validate(req.body);
    if (validation.error) {
      res.status(400).send(validation.error?.details[0].message);
      return;
    }
    const body: UserVerify = req.body;
    const exists = await userCases.login(body);
    if (exists) {
      const { id, firstName, surNames, address, phone, ...dataToken } = exists; // eslint-disable-line
      const token = await tokenManager().accessToken(dataToken);
      res.status(200).json({ accessToken: token });
      return;
    }
    res.status(400).send('Invalid email or password');
    return;
  }
);
