import userSchema from "../schemas/UserSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export default class UserController{
  constructor ({userModel}) {
    this.userModel = userModel;
  }

  register = async (req, res) => {
    const result = userSchema.validateRegisterUser(req.body);

    if (!result.success) {
      return res.status(400).json({ errors: result.error.message });
    }

    const existingUser = await this.userModel.findOne({
      where: {
        email: result.data.email,
      }
    });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    try {
      result.data.password = await bcrypt.hash(result.data.password, 8);
      const newUser = await this.userModel.create(result.data);
      return res.status(201).send(newUser);
    }
    catch(error) {
      return res.status(500).json({ error: error.message });
    }
  }

  login = async (req, res) => {
    const result = userSchema.validateLoginUser(req.body);

    console.log(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.message });
    }

    try {
      const user = await this.userModel.findOne({
        where: {
          email: result.data.email,
        }
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(result.data.password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: 86400
      });

      return res.status(200).cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      }).send();
    }
    catch(error) {
      return res.status(500).json({ error: error.message });
    }
  }
}