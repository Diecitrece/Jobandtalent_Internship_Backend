import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Router } from 'express';
import { User } from './model';
import sendEmail from './services/mail';
import { schemaUserRegister } from './services/validations/user_register.validation';
import { db } from '../../../database/db-conection';

const router = Router();
router.use(bodyParser.json());

router.get('/api/users', async (req: Request, res: Response) => {
  const users = await db<User[]>('users').select('*');
  res.json(users);
});

router.post('/api/users', async (req: Request, res: Response) => {
  const user: User = req.body;
  if (schemaUserRegister.validate(user).error) {
    return res.send(schemaUserRegister.validate(user).error?.details);
  }
  const userExists = await db<User>('users')
    .where({ email: user.email })
    .first();
  if (userExists) {
    return res.send('User already exists');
  }
  const userCreated = await db<User>('users').insert(user);
  if (userCreated) {
    sendEmail(user);
    return res.json(userCreated);
  }
});

export default router;
