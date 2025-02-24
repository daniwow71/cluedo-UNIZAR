import sequelize from './database.js';
import { Sequelize } from 'sequelize';
import UserModel from '../models/User.js';

const initDatabase = async () => {
    try {
        const tempSequelize = new Sequelize({
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: 'localhost',
            dialect: 'mysql'
        });

        await tempSequelize.query('CREATE DATABASE IF NOT EXISTS `cluedo-unizar`');
        await tempSequelize.close();

        await UserModel.sync();

        await sequelize.sync({ force: true });
      console.log('Database initialized successfully');

    } catch (error) {
      console.error('Error initializing database:', error);
    }
  };
  
  initDatabase();