import express from 'express';
import chalk from 'chalk';
import config from './config/envConfig.js';
import connection from './database/index.js';
import routes from './routes/routes.js';
import syncDatabase from './database/syncDatabase.js';
import seedDatabase from './database/seedDatabase.js';

connection
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

syncDatabase();
//seedDatabase();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const formattedDate = new Date().toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  });
  console.log(`[${formattedDate}] => [${req.method}] ${req.url}`);
  next();
});

app.use(routes);

app.listen(config.port, () => {
  console.info(
    '\n',
    chalk.green.bold('━━━━━━━━━━━━━━━━━━━━━━━'),
    '\n',
    chalk.green.bold(' 🟢 SERVER STARTED 🟢 '),
    '\n',
    chalk.green.bold('━━━━━━━━━━━━━━━━━━━━━━━'),
    '\n',
    `Port: ${config.port}`,
    '\n',
    `Version: ${config.version}`,
    '\n',
    `Environment: ${config.environment}`,
    '\n'
  );
});
