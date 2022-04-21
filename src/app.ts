import 'dotenv/config';
import express from 'express';
import { userRouter } from './user-interface/user/user.routes';

const app = express();

app.use(userRouter);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Working 👍🏼');
});

export default app;
