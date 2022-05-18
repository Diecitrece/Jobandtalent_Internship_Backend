import 'dotenv/config';
import express from 'express';
import { userRouter } from './user-interface/user/user.routes';
import { companyRouter } from './user-interface/company/company.routes';

export const app = express();

app.use(userRouter, companyRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Working 👍🏼');
});
