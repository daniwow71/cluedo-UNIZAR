import userSchema from "../schemas/UserSchema.js";
import bcrypt from 'bcrypt';
import auth from '../auth/auth.js';
import MESSAGES from "../messages/messages.js";
import cookieParser from 'cookie-parser';

const HASH_SALT_ROUNDS = 8;

export default class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  register = async (req, res) => {
    const result = userSchema.validateRegisterUser(req.body);
    console.log(result);

    if (!result.success) {
      return res.status(400).json({ error: MESSAGES.INVALID_DATA });
    }

    const existingUser = await this.userModel.findOne({
      where: {
        email: result.data.email,
      }
    });

    if (existingUser) {
      return res.status(409).json({ error: MESSAGES.USER_ALREADY_EXISTS });
    }

    try {
      result.data.password = await bcrypt.hash(result.data.password, HASH_SALT_ROUNDS);
      const newUser = await this.userModel.create(result.data);
      return res.status(201).send(newUser);
    }
    catch (error) {
      return res.status(500).json({ error: MESSAGES.ERROR_500 });
    }
  }

  login = async (req, res) => {
    const result = userSchema.validateLoginUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: MESSAGES.INVALID_DATA });
    }

    try {
      const user = await this.userModel.findOne({
        where: { email: result.data.email, }
      });

      if (!user) {
        return res.status(404).json({ error: MESSAGES.USER_NOT_FOUND });
      }

      const isPasswordValid = await bcrypt.compare(result.data.password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: MESSAGES.INVALID_PASSWORD });
      }

      const token = auth.createToken(user);

      return res.status(200).cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      }).send();
    }
    catch (error) {
      return res.status(500).json({ error: MESSAGES.ERROR_500 });
    }
  }

  logout = async (req, res) => {
    return res.status(200).clearCookie('token').send();
  }

  changePassword = async (req, res) => {
    const result = userSchema.validateChangePassword(req.body);

    if (!result.success) {
      console.error('Validation error:', result.error);
      return res.status(400).json({ error: MESSAGES.INVALID_DATA });
    }

    try {
      const token = req.cookies.token;
      if (!token) {
        console.error('No token found in cookies');
        return res.status(401).json({ error: MESSAGES.UNAUTHORIZED });
      }

      const decoded = auth.verifyToken(token);
      console.log('Decoded token:', decoded);

      const user = await this.userModel.findByPk(decoded.id);
      if (!user) {
        console.error('User not found with id:', decoded.id);
        return res.status(404).json({ error: MESSAGES.USER_NOT_FOUND });
      }

      const hashedPassword = await bcrypt.hash(result.data.newPassword, HASH_SALT_ROUNDS);
      await user.update({ password: hashedPassword });

      return res.status(200).send();
    }
    catch (error) {
      console.error('Change password error:', error);
      return res.status(500).json({ error: MESSAGES.ERROR_500 });
    }
  }
}