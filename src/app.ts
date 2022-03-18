import express from 'express';
import indexRoutes from './routes/index.route';

const app = express();

app.use(indexRoutes);

export default app;
