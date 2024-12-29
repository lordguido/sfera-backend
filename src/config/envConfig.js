import dotenv from 'dotenv';

const envFiles = {
  prod: './src/config/.env',
  dev: './src/config/.env.dev',
};
const envPath = envFiles[process.env.NODE_ENV] || '.env';

dotenv.config({ path: envPath });

export const validateEnvVars = (requiredVars) => {
  const missingVars = requiredVars.filter((v) => !process.env[v]);
  if (missingVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
  }
};

validateEnvVars([
  'APP_URL',
  'APP_PORT',
  'APP_VERSION',
  'APP_NAME',
  'APP_SECRET',
  'TOKEN_TIME_EXPIRE',
  'DB_NAME',
  'DB_USER',
  'DB_PASS',
  'DB_HOST',
  'DB_PORT',
  'DB_URL',
]);

export default {
  app: {
    url: process.env.APP_URL || 'http://localhost',
    port: process.env.APP_PORT || 3000,
    version: process.env.APP_VERSION || '1.0.0',
    name: process.env.APP_NAME || 'API-APP',
    secret: process.env.APP_SECRET || 'default-secret',
    tokenExpire: process.env.TOKEN_TIME_EXPIRE || '1d',
  },
  database: {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    url: process.env.DB_URL,
  },
  environment: process.env.NODE_ENV === 'prod' ? 'PRODUCTION' : 'DEVELOPMENT',
};
