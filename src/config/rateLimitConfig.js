import rateLimit from 'express-rate-limit';
import config from './envConfig.js';
import chalk from 'chalk';

const isProd = config.environment === 'PRODUCTION';

const defaultLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: isProd ? 100 : 1000000, // 100 requisições em prod, muito alto em dev (praticamente ilimitado)
  message: {
    error: 'Muitas requisições deste IP',
    message: 'Por favor, tente novamente mais tarde',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.error(chalk.red(`[Rate Limit] IP bloqueado: ${req.ip}`));
    res.status(429).json({
      error: 'Muitas requisições deste IP',
      message: 'Por favor, tente novamente mais tarde',
    });
  },
});

// Limiter específico para rotas de autenticação
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: isProd ? 5 : 1000000, // 5 tentativas em prod, muito alto em dev
  message: {
    error: 'Muitas tentativas de autenticação',
    message: 'Por favor, tente novamente mais tarde',
  },
});

export { defaultLimiter, authLimiter };
