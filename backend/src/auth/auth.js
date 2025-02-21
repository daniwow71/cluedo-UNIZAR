import jwt from 'jsonwebtoken';

const dotenv = require('dotenv');
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const TOKEN_EXPIRATION = 86400;  // 24 hours

const createToken = (user) => {
  return jwt.sign({ id: user.id }, TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRATION
  });
}

const auth = {
  createToken
}

export default auth;