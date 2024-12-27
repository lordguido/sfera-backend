import { Sequelize } from 'sequelize';
import config from './envConfig.js';

const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  logging: console.log,
});

export default sequelize;
