import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { UserRoutes } from '../routes/User.Routes.js';

const DEFAULT_PORT = 3000;

dotenv.config();
const PORT = process.env.PORT || DEFAULT_PORT;


export const createApp = ({userModel}) => {
  const app = express();
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cookieParser());

  app.use('/user', UserRoutes({userModel}));

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  return app;
}