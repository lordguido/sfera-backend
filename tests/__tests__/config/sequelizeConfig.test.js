import { jest } from '@jest/globals';
import config from '../../../src/config/sequelizeConfig.js';

describe('sequelizeConfig', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    // Redefine NODE_ENV antes de cada teste
    process.env.NODE_ENV = 'test';
  });

  afterEach(() => {
    // Restaura NODE_ENV após cada teste
    process.env.NODE_ENV = originalEnv;
  });

  it('Deve ter as configurações básicas do Postgres', () => {
    expect(config.dialect).toBe('postgres');
    expect(config.host).toBeDefined();
    expect(config.port).toBeDefined();
    expect(config.username).toBeDefined();
    expect(config.password).toBeDefined();
    expect(config.database).toBeDefined();
    expect(config.url).toBeDefined();
  });

  it('Deve ter as configurações de timestamps e underscored', () => {
    expect(config.define).toEqual({
      timestamps: true,
      underscored: true,
      timezone: '-03:00',
      dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true,
      },
    });
  });

  it('Deve ter as configurações de SSL', () => {
    expect(config.dialectOptions.ssl).toEqual({
      require: true,
      rejectUnauthorized: false,
    });
  });

  it('Deve ter as configurações de timezone', () => {
    expect(config.dialectOptions.timezone).toBe('-03:00');
    expect(config.dialectOptions.useUTC).toBe(false);
  });

  describe('Configurações de logging', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it('Deve ativar logging em ambiente dev', async () => {
      // Debug: vamos ver o valor antes
      console.log('NODE_ENV antes:', process.env.NODE_ENV);

      process.env.NODE_ENV = 'dev';

      // Debug: vamos ver se o valor mudou
      console.log('NODE_ENV depois:', process.env.NODE_ENV);

      const { default: devConfig } = await import('../../../src/config/sequelizeConfig.js');

      // Debug: vamos ver se o config pegou o valor correto
      console.log('devConfig.logging:', devConfig.logging);
      console.log('console.log:', console.log);
      console.log('São iguais?', devConfig.logging === console.log);

      expect(devConfig.logging).toBe(console.log);
    });

    it('Deve desativar logging em outros ambientes', async () => {
      // Debug: vamos ver o valor antes
      console.log('NODE_ENV antes:', process.env.NODE_ENV);

      process.env.NODE_ENV = 'prod';

      // Debug: vamos ver se o valor mudou
      console.log('NODE_ENV depois:', process.env.NODE_ENV);

      const { default: prodConfig } = await import('../../../src/config/sequelizeConfig.js');

      // Debug: vamos ver o valor do logging
      console.log('prodConfig.logging:', prodConfig.logging);

      expect(prodConfig.logging).toBe(false);
    });
  });
});
