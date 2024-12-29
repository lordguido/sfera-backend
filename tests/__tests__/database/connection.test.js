import connection from '../../../src/database/connection.js';
import { dbConnect, dbDisconnect } from '../../utils/dbHelper.js';

describe('Database Connection', () => {
  let sequelize;

  beforeAll(async () => {
    sequelize = connection;
    await dbConnect();
  });

  it('Deve ter as configurações corretas', () => {
    const configDb = sequelize.options;
    expect(configDb).toBeDefined();
    expect(configDb.dialect).toBe('postgres');
    expect(configDb.host).toBeDefined();
    expect(configDb.port).toBeDefined();
  });

  afterAll(async () => {
    await dbDisconnect();
  });
});
