require('dotenv').config({
  path: process.env.NODE_ENV === 'dev' ? './src/config/.env.dev' : './src/config/.env',
});

module.exports = {
  dialect: 'postgres',
  url: process.env.DB_URL,
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
};
