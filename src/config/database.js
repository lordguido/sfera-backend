import { Sequelize } from 'sequelize';
import env from './env.js';

const isDevelopment = env.server.nodeEnv === 'development';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/database/database.sqlite',
  logging: isDevelopment,
});

export default sequelize;
