import config from './envConfig.js';

const isProd = config.environment === 'PRODUCTION';

// Configuração do CORS
const corsOptions = {
  origin: isProd
    ? config.app.url // Usando a URL já validada do envConfig
    : ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400, // Cache preflight por 24 horas
};

// Configuração do Helmet
const helmetOptions = {
  contentSecurityPolicy: isProd,
  crossOriginEmbedderPolicy: isProd,
  crossOriginOpenerPolicy: isProd,
  crossOriginResourcePolicy: isProd,
  dnsPrefetchControl: true,
  frameguard: true,
  hidePoweredBy: true,
  hsts: isProd,
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: true,
  referrerPolicy: true,
  xssFilter: true,
};

export { corsOptions, helmetOptions };
