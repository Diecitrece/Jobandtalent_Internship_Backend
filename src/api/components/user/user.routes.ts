import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Router } from 'express';

const memory = [
  {
    name: 'Andres',
    surName: 'Ayelo',
    email: 'ayelo@ayelo.com',
    password: '1122',
    phone: '+34 6677746663',
    address: 'calle mayor',
  },
];

const router = Router();
router.use(bodyParser.json());

router.get('/api/users', (req: Request, res: Response) => {
  res.json(memory);
});

router.post('/api/users', (req: Request, res: Response) => {
  memory.push(req.body);
  res.json(req.body);
});

export default router;
