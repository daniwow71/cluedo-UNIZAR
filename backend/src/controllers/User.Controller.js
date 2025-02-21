import validateRegisterUser from "../schemas/UserSchema.js";


export default class UserController{
  constructor ({userModel}) {
    this.userModel = userModel;
  }

  register = async (req, res) => {
    const result = validateRegisterUser(req.body);

    if (!result.success) {
      return res.status(400).json({ errors: result.error.message });
    }

    try {
      console.log(result.data);
      const newUser = await this.userModel.create(result.data);
      return res.status(201).send(newUser);
    }
    catch(error) {
      return res.status(500).json({ error: error.message });
    }
  }
}