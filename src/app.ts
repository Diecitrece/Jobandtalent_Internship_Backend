import express from 'express';
import userRoutes from './api/components/user/user.routes';

const app = express();

app.use(userRoutes);

export default app;
