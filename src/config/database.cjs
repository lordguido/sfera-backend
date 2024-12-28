require('dotenv').config({
  path: process.env.NODE_ENV === 'dev' ? './src/config/.env.dev' : './src/config/.env',
});

const config = {
  url: process.env.DB_URL,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    timestamps: true,
    underscored: true,
  },
  migrationStorageTableName: 'sequelize_meta',
  seederStorageTableName: 'sequelize_data',
};

module.exports = config;
