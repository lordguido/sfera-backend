import express from 'express';
import chalk from 'chalk';
import config from './config/envConfig.js';
import { initConnectionDb } from './database/connectionDb.js';
import securityMiddleware from './api/middlewares/securityMiddleware.js';
import routes from './api/routes/routes.js';
import { defaultLimiter } from './config/rateLimitConfig.js';
import { payloadConfig } from './config/validationConfig.js';

const createServer = async () => {
  try {
    // Inicializa conexão com o banco de dados
    await initConnectionDb();

    // Inicializa o servidor Express
    const app = express();
    configureApp(app);

    // Inicia o servidor na porta configurada
    app.listen(config.app.port, () => {
      console.info(formatStartupLog());
    });
  } catch (err) {
    console.error(chalk.red('❌ Erro ao iniciar o servidor:', err));
    process.exit(1);
  }
};

// Configuração geral do app
const configureApp = (app) => {
  // Segurança
  securityMiddleware(app);

  // Configuração de payloads
  app.use(express.json(payloadConfig));
  app.use(express.urlencoded({ extended: true, ...payloadConfig }));

  // Rate Limiter global
  app.use(defaultLimiter);

  // Logger de requisições
  app.use(requestLogger);

  // Rotas
  app.use(routes);
};

// Logger de requisições
const requestLogger = (req, res, next) => {
  const formattedDate = new Date().toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  });
  console.log(chalk.cyan(`[${formattedDate}] => [${req.method}] ${req.url}`));
  next();
};

// Log formatado de inicialização
const formatStartupLog = () => `
${chalk.green.bold('━━━━━━━━━━━━━━━━━━━━━━━')}
${chalk.green.bold(' 🟢 SERVER STARTED 🟢 ')}
${chalk.green.bold('━━━━━━━━━━━━━━━━━━━━━━━')}
Port: ${config.app.port}
Version: ${config.app.version}
Environment: ${config.environment}
${chalk.green.bold('━━━━━━━━━━━━━━━━━━━━━━━')}
`;

// Inicializa o servidor
createServer();
