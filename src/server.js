import express from 'express';
import chalk from 'chalk';
import config from './config/configServer.js';
import routes from './routes/routes.js';

const app = express();

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
    chalk.green.bold('  SERVER STARTED  🟢  '),
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
