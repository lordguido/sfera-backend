import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const User = sequelize.define('user', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

export default User;
