import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Router } from 'express';
import { User } from './model';
import { v4 as uuidv4 } from 'uuid';

const usersInMemory: User[] = [];
let id = '';

const generateId = (): string => {
  id = uuidv4();
  return id;
};

const router = Router();
router.use(bodyParser.json());

router.get('/api/users', (req: Request, res: Response) => {
  res.json(usersInMemory);
});

router.post('/api/users', (req: Request, res: Response) => {
  const user = req.body;
  user.id = generateId();
  usersInMemory.push(req.body);
  res.json(req.body);
});

export default router;
