import 'dotenv/config';

const PORT_DEFAULT = 3001;
const NODE_ENV_DEFAULT = 'development default';

const env = {
  server: {
    port: process.env.APP_PORT || PORT_DEFAULT,
    nodeEnv: process.env.NODE_ENV || NODE_ENV_DEFAULT,
  },
};

export default env;
