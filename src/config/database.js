import config from './envConfig.js';

console.log('config.database.host', config.database.host);

export default {
  dialect: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.dbName,
  logging: process.env.NODE_ENV === 'dev' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
  },
};
