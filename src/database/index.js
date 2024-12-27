import { Sequelize } from 'sequelize';
import config from '../config/database.js';

console.log('config', config);

const connection = new Sequelize(config);

export default connection;
