import { validateEnvVars } from '../../../src/config/envConfig.js';

describe('validateEnvVars', () => {
  beforeEach(() => {
    // Redefine as variáveis de ambiente antes de cada teste
    process.env = {};
  });

  it('Deve passar quando todas as variáveis obrigatórias estão definidas', () => {
    process.env.APP_URL = 'http://localhost';
    process.env.APP_PORT = '3000';
    process.env.APP_VERSION = '1.0.0';
    process.env.APP_NAME = 'API-APP';
    process.env.APP_SECRET = 'secret';
    process.env.TOKEN_TIME_EXPIRE = '1d';
    process.env.DB_NAME = 'test_db';
    process.env.DB_USER = 'user';
    process.env.DB_PASS = 'password';
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '5432';
    process.env.DB_URL = 'postgres://user:password@localhost:5432/test_db';

    expect(() =>
      validateEnvVars([
        'APP_URL',
        'APP_PORT',
        'APP_VERSION',
        'APP_NAME',
        'APP_SECRET',
        'TOKEN_TIME_EXPIRE',
        'DB_NAME',
        'DB_USER',
        'DB_PASS',
        'DB_HOST',
        'DB_PORT',
        'DB_URL',
      ])
    ).not.toThrow();
  });

  it('Deve lançar erro quando faltam algumas variáveis de ambiente', () => {
    process.env.APP_URL = 'http://localhost';
    process.env.APP_PORT = '3000';

    expect(() => validateEnvVars(['APP_URL', 'APP_PORT', 'APP_VERSION', 'APP_NAME'])).toThrow(
      'Missing environment variables: APP_VERSION, APP_NAME'
    );
  });

  it('Deve lançar erro quando todas as variáveis obrigatórias estão ausentes', () => {
    expect(() => validateEnvVars(['APP_URL', 'APP_PORT'])).toThrow('Missing environment variables: APP_URL, APP_PORT');
  });

  it('Deve passar quando nenhuma variável obrigatória é fornecida', () => {
    expect(() => validateEnvVars([])).not.toThrow();
  });
});
