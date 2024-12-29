import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import helmet from 'helmet';
import config from './config/envConfig.js';
import connection from './database/connection.js';
import routes from './api/routes/routes.js';
import syncDatabase from './database/syncDatabase.js';
import { corsOptions, helmetOptions } from './config/securityConfig.js';
import { defaultLimiter } from './config/rateLimitConfig.js';
import { payloadConfig } from './config/validationConfig.js';

// Conexão com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log(chalk.blue('✓ Conexão com o banco de dados bem-sucedida!'));
  })
  .catch((err) => {
    console.error(chalk.red('Erro ao conectar ao banco de dados:'), err);
  });

syncDatabase();

const app = express();

// Configurações de segurança
app.use(cors(corsOptions));
console.log(chalk.blue('✓ CORS configurado'));

app.use(helmet(helmetOptions));
console.log(chalk.blue('✓ Helmet configurado'));

// Configuração de payload e parsers
app.use(express.json(payloadConfig));
app.use(express.urlencoded({ extended: true, ...payloadConfig }));

// Rate Limiter global
app.use(defaultLimiter);

// Logger de requisições
app.use((req, res, next) => {
  const formattedDate = new Date().toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  });
  console.log(chalk.cyan(`[${formattedDate}] => [${req.method}] ${req.url}`));
  next();
});

// Rotas
app.use(routes);

// Inicialização do servidor
app.listen(config.app.port, () => {
  console.info(
    '\n',
    chalk.green.bold('━━━━━━━━━━━━━━━━━━━━━━━'),
    '\n',
    chalk.green.bold(' 🟢 SERVER STARTED 🟢 '),
    '\n',
    chalk.green.bold('━━━━━━━━━━━━━━━━━━━━━━━'),
    '\n',
    `Port: ${config.app.port}`,
    '\n',
    `Version: ${config.app.version}`,
    '\n',
    `Environment: ${config.environment}`,
    '\n'
  );
});
