import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Router } from 'express';
import { User } from './model';
import sendEmail from './services/mail';
import { schemaUserRegister } from './services/validations/user_register.validation';
import {
  getUsers,
  addUser,
  checkUserExist,
} from '../../../database/db-conection';
import { v4 } from 'uuid';
import password_crypt from './services/password_crypt';

const router = Router();
router.use(bodyParser.json());

const generateId = () => v4();

router.get('/api/users', async (req: Request, res: Response) => {
  const users = await getUsers();
  res.json(users);
});

router.post('/api/users', async (req: Request, res: Response) => {
  const user: User = req.body;
  if (schemaUserRegister.validate(user).error) {
    return res.send(schemaUserRegister.validate(user).error?.details);
  }
  user.id = generateId();
  user.password = await password_crypt(user.password);
  try {
    const userCreated = await addUser(user);
    if (userCreated) {
      sendEmail(user);
      return res.json(userCreated);
    }
  } catch (error) {
    return res.json(error);
  }
});

router.post('/api/login', async (req: Request, res: Response) => {
  const user = await checkUserExist(req.body.email);
  if (user) {
    if (user.password === (await password_crypt(req.body.password))) {
      return res.json(user);
    }
    return res.json({ error: 'Password incorrect' });
  }
  return res.json({ error: 'User not found' });
});

export default router;
