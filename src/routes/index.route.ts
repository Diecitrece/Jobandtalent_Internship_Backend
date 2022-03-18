import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Router } from 'express';

const router = Router();
router.use(bodyParser.json());

router.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello world</h1>');
});

export default router;
