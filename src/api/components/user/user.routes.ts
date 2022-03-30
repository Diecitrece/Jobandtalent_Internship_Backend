import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Router } from 'express';
import { User } from './model';
import sendEmail from './services/mail';
import { schemaUserRegister } from './services/validations/user_register.validation';
import { getUsers, addUser } from '../../../database/db-conection';
import { v4 } from 'uuid';

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

export default router;
