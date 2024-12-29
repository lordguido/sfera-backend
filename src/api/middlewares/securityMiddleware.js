import cors from 'cors';
import helmet from 'helmet';
import { corsOptions, helmetOptions } from '../config/securityConfig.js';
import chalk from 'chalk';

const setupSecurity = (app) => {
  // Aplicando CORS
  app.use(cors(corsOptions));
  console.log(chalk.blue('✓ CORS configurado'));

  // Aplicando Helmet
  app.use(helmet(helmetOptions));
  console.log(chalk.blue('✓ Helmet configurado'));

  // Middleware adicional para log de tentativas de acesso bloqueadas
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      console.error(chalk.red(`[${new Date().toISOString()}] Tentativa de acesso bloqueada: ${req.path}`));
      res.status(401).json({
        error: 'Acesso não autorizado',
        message: 'Você não tem permissão para acessar este recurso',
      });
    } else {
      next(err);
    }
  });
};

export default setupSecurity;
