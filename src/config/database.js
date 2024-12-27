import { Sequelize } from 'sequelize';
import config from './envConfig.js';

const logSequelize = process.env.NODE_ENV === 'dev' ? console.log : false;

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('logSequelize', logSequelize);

const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  logging: logSequelize,
});

export default sequelize;
