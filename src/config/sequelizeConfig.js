import config from './envConfig.js';

export default {
  dialect: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.dbName,
  url: config.database.url,
  logging: process.env.NODE_ENV === 'dev' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
    timezone: '-03:00',
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: true,
    },
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    useUTC: false,
    timezone: '-03:00',
  },
};
