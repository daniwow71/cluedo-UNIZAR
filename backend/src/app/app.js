import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { UserRoutes } from '../routes/User.Routes.js';
import cors from 'cors';

const DEFAULT_PORT = 3000;

dotenv.config();
const PORT = process.env.PORT || DEFAULT_PORT;


export const createApp = ({ userModel }) => {
  const app = express();
  app.use(morgan('dev'));
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true, // necesario si usas cookies/sesiones
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(express.json());
  app.use(cookieParser());

  app.use('/user', UserRoutes({ userModel }));

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  return app;
}