import User from '@domain/user';
import router from '../../../src_original/api/components/user/user.routes';
import { schemaUserRegister } from './validate-user';
import { generateId } from 'utils/uuid';
import password_crypt from 'utils/password_crypt';
import { Request, Response } from 'express';
import { createUser } from '@use-cases/user/create-user.use-case';

router.post('/api/users', async (req: Request, res: Response) => {
  const user: User = {
    id : generateId(),
    firstName : req.body.firstName,
    surNames : req.body.surNames,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
  };
  if (schemaUserRegister.validate(user).error) {
    res.status(401).send(schemaUserRegister.validate(user).error?.details);
  }
  user.password = await password_crypt(user.password);
  const newUser = await createUser(user);
  res.status(200).json(newUser);
});
