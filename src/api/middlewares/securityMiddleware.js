import cors from 'cors';
import helmet from 'helmet';
import { corsOptions, helmetOptions } from '../../config/securityConfig.js';
import chalk from 'chalk';

const setupSecurity = (app) => {
  // Aplicando CORS
  app.use(cors(corsOptions));
  console.log(chalk.blue('✅ CORS configurado'));

  // Aplicando Helmet
  app.use(helmet(helmetOptions));
  console.log(chalk.blue('✅ Helmet configurado'));

  // Middleware de erro para UnauthorizedError
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      console.error(chalk.red(`[${new Date().toISOString()}] Tentativa de acesso bloqueada: ${req.path}`));
      return res.status(401).json({
        error: 'Acesso não autorizado',
        message: 'Você não tem permissão para acessar este recurso',
      });
    }
    next(err);
  });
};

export default setupSecurity;
