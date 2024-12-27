const logSequelize = process.env.NODE_ENV === 'dev' ? true : false;

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('logSequelize', logSequelize);

export default {
  dialect: 'postgres',
  logging: logSequelize,
  define: {
    timestamps: true,
    underscored: true,
  },
};
