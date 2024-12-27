export default {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: process.env.NODE_ENV === 'dev' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
  },
};
