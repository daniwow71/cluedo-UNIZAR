import { Router } from 'express';
import UserController from '../controllers/User.Controller.js';

export const UserRoutes = ({ userModel }) => {
  const userRouter = Router();
  const userController = new UserController({ userModel });

  userRouter.post('/register', userController.register);

  return userRouter;
}