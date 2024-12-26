import dotenv from 'dotenv';

const envFiles = {
  prod: './src/config/.env.prod',
  dev: './src/config/.env.dev',
};

const envPath = envFiles[process.env.NODE_ENV] || '.env';

dotenv.config({ path: envPath });

const requiredVars = ['APP_PORT', 'APP_VERSION'];
const missingVars = requiredVars.filter((v) => !process.env[v]);

if (missingVars.length > 0) {
  throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
}

export default {
  port: process.env.APP_PORT || 3000,
  version: process.env.APP_VERSION || '1.0.0',
  environment: process.env.NODE_ENV === 'prod' ? 'PRODUCTION' : 'DEVELOPMENT',
};
