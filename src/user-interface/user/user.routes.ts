import User from '@domain/user';
import router from '../../../src_original/api/components/user/user.routes';
import { register } from './create-user.interface';
import { Request, Response } from 'express';

router.post('/api/users', (req: Request, res: Response) => {
  const user: User = req.body;
  const response = register(user);
  res.send(response);
});
