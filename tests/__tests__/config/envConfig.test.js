import config from '../../../src/config/envConfig.js';

describe('Configurações de Ambiente', () => {
  it('Deve carregar as configurações básicas do app', () => {
    expect(config.app).toBeDefined();
    expect(config.app.port).toBeDefined();
    expect(config.app.version).toBeDefined();
  });

  it('Deve ter as configurações de banco de dados', () => {
    expect(config.database).toBeDefined();
    expect(config.database.url).toBeDefined();
  });
});
