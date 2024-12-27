import dotenv from 'dotenv';

const envFiles = {
  prod: './src/config/.env.prod',
  dev: './src/config/.env.dev',
};
const envPath = envFiles[process.env.NODE_ENV] || '.env';

dotenv.config({ path: envPath });

const validateEnvVars = (requiredVars) => {
  const missingVars = requiredVars.filter((v) => !process.env[v]);
  if (missingVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
  }
};

validateEnvVars(['APP_PORT', 'APP_VERSION', 'DB_URL']);

export default {
  port: process.env.APP_PORT || 3000,
  version: process.env.APP_VERSION || '1.0.0',
  environment: process.env.NODE_ENV === 'prod' ? 'PRODUCTION' : 'DEVELOPMENT',
  dbUrl: process.env.DB_URL,
};
