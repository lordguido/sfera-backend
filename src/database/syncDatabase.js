import { connectionDb, initConnectionDb } from './connectionDb.js';

const syncDatabase = async () => {
  try {
    if (process.env.NODE_ENV !== 'dev') {
      console.warn('Sincronização do banco só deve ser usada em desenvolvimento!');
      return;
    }
    await initConnectionDb();
    await connectionDb.sync({ alter: true });
    console.log('✅ Banco de dados sincronizado (modo desenvolvimento).');
  } catch (err) {
    console.error('❌ Erro ao sincronizar o banco de dados:', err);
  }
};

export default syncDatabase;
