import { DataTypes } from "sequelize"
import sequelize from "../database/database.js"
import bcrypt from 'bcrypt';


const UserModel = sequelize.define('User', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 10));
    }
  },
}, {
  sequelize,
  tableName: 'user',
  timestamps: false
});

export default UserModel;