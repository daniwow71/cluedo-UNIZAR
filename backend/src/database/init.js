import sequelize from './database.js';
import { Sequelize } from 'sequelize';
import UserModel from '../models/User.js';

const initDatabase = async () => {
  try {
    const tempSequelize = new Sequelize({
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      dialect: 'mysql'
    });

    await tempSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    await tempSequelize.close();

    await UserModel.sync();

    await sequelize.sync({ force: true });
    console.log('Database initialized successfully');

  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

initDatabase();