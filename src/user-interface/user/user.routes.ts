import User from '@domain/user';
import { schemaUserRegister } from './validate-user';
import { Request, Response, Router } from 'express';
import { UserCases } from '@use-cases/user/user.use-cases';
import { generateId } from '@infrastructure/shared/uuid';
import { password_crypt } from '@infrastructure/shared/password_crypt';

export const userRouter = Router();
userRouter.get('/api/users', async (req: Request, res: Response) => {
  const id = req.query.toString();
  if (id) {
    const user = UserCases().getOneUser(id);
    res.status(200).json(user);
  }
  const users = await UserCases().getAllUsers();
  res.status(200).json(users);
});

userRouter.post('/api/users', async (req: Request, res: Response) => {
  const [firstName, surNames, email, password, phone, address] = req.body;
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
    res.status(401).send(schemaUserRegister.validate(user).error?.details);
  }
  user.password = await password_crypt(user.password);
  const newUser = await UserCases().create(user);
  res.status(200).json(newUser);
});
