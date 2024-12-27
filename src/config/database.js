import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

const envFiles = {
  prod: './src/config/.env.prod',
  dev: './src/config/.env.dev',
};

const envPath = envFiles[process.env.NODE_ENV] || '.env';

dotenv.config({ path: envPath });

if (!process.env.DB_URL) {
  console.error('Error: .env file is not being loaded or DB_URL variable is missing.');
  process.exit(1);
}

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: true,
});

export default sequelize;
