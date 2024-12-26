import dotenv from 'dotenv';

const envFiles = {
  prod: './src/config/.env.prod',
  dev: './src/config/.env.dev',
};

const envPath = envFiles[process.env.NODE_ENV] || '.env';

dotenv.config({ path: envPath });

if (!process.env.APP_PORT || !process.env.APP_VERSION) {
  throw new Error('Required environment variables are missing');
}

export default {
  port: process.env.APP_PORT,
  version: process.env.APP_VERSION,
  environment: process.env.NODE_ENV === 'prod' ? 'PRODUCTION' : 'DEVELOPMENT',
};
