import { Request, Response, Router } from 'express';
import { UserCases } from '../../core/application/use-cases/user/user.use-cases';
import { User } from '../../core/domain/user';
import { password_crypt } from '../../infrastructure/shared/password_crypt';
import { generateId } from '../../infrastructure/shared/uuid';
import { schemaUserRegister } from './validate-user';
import bodyParser from 'body-parser';

export const userRouter = Router();
userRouter.use(bodyParser.json());
userRouter.get('/api/users', async (req: Request, res: Response) => {
  const { id } = req.body;
  if (id) {
    const user = await UserCases().getOneUser(id);
    res.status(200).json(user);
  }
  if (!id) {
    const users = await UserCases().getAllUsers();
    res.status(200).json(users);
  }
});

userRouter.post('/api/users', async (req: Request, res: Response) => {
  const { body } = req;
  const { firstName, surNames, email, password, phone, address } = body;
  const user: User = {
    id: generateId(),
    firstName: firstName,
    surNames: surNames,
    email: email,
    password: password,
    phone: phone,
    address: address,
  };
  if (schemaUserRegister.validate(user).error) {
    res.status(418).send(schemaUserRegister.validate(user).error?.details);
  }

  user.password = await password_crypt(user.password);
  const newUser = await UserCases().create(user);

  user === undefined
    ? res.status(200).json(newUser)
    : res
        .status(418)
        .json({ message: 'User not created', error: 'user already exists' });
});
