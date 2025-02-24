import sequelize from './database.js';
import UserModel from '../models/User.js';

const initDatabase = async () => {
    try {
      await sequelize.sync({ force: true });
      console.log('Database initialized successfully');

    } catch (error) {
      console.error('Error initializing database:', error);
    }
  };
  
  initDatabase();