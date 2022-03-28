import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Router } from 'express';
import { User } from './model';
import { v4 as uuidv4 } from 'uuid';
import { schemaUserRegister } from './services/validations/user_register.validation';

const usersInMemory: User[] = [];

const generateId = (): string => uuidv4();

const router = Router();
router.use(bodyParser.json());

router.get('/api/users', (req: Request, res: Response) => {
  res.json(usersInMemory);
});

router.post('/api/users', (req: Request, res: Response) => {
  const user: User = req.body;
  if (schemaUserRegister.validate(user).error) {
    return res.send(schemaUserRegister.validate(user).error?.details);
  }

  user.id = generateId();
  res.json(user);
  usersInMemory.push(user);
});

export default router;
