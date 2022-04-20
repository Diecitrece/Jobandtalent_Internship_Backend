import 'dotenv/config';
import express from 'express';
import { userRoutes } from '@user-interface/user/user.routes';

const app = express();

app.use(userRoutes);

app.get('/', (req, res) => {
  res.send('Working 👍🏼');
});

export default app;
