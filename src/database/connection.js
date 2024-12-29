import { Sequelize } from 'sequelize';
import configDB from '../config/database.js';

const connection = new Sequelize(configDB);

export default connection;
