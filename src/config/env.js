import 'dotenv/config';

const env = {
  server: {
    port: process.env.APP_PORT,
    nodeEnv: process.env.NODE_ENV,
  },
};

export default env;
