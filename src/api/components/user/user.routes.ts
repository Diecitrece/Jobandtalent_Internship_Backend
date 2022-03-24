import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Router } from 'express';
import { User } from './model';
import { v4 as uuidv4 } from 'uuid';
import { schema } from './model';
import { validate } from 'express-validation';

const usersInMemory: User[] = [];

const generateId = (): string => uuidv4();

const router = Router();
router.use(bodyParser.json());

router.get('/api/users', (req: Request, res: Response) => {
  res.json(usersInMemory);
});

router.post('/api/users', (req: Request, res: Response) => {
  const user: User = req.body;
  schema.validate(user);
  if (schema.validate(user).error) {
    //res.send(schema.validate(user).error.details);
    res.send('error');
  } else {
    res.send(schema.validate(user));
  }
  user.id = generateId();
  usersInMemory.push(user);
});

export default router;
