import { Sequelize } from 'sequelize';
import configDB from '../config/sequelizeConfig.js';

const connection = new Sequelize(configDB);

export default connection;
