import { Sequelize } from 'sequelize';
import configDB from '../config/sequelizeConfig.js';
import chalk from 'chalk';

const connectionDb = new Sequelize(configDB);

// Conexão com o banco de dados
const initConnectionDb = async () => {
  try {
    await connectionDb.authenticate();
    console.log(chalk.blue('✅ Conexão com o banco de dados bem-sucedida!'));
  } catch (err) {
    console.error(chalk.red('❌ Erro ao conectar ao banco de dados:', err));
    process.exit(1);
  }
};

export { connectionDb, initConnectionDb };
