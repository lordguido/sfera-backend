import connection from './index.js';

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

const syncDatabase = async () => {
  try {
    if (process.env.NODE_ENV === 'dev') {
      await connection.sync({ alter: true });
      console.log('Banco de dados sincronizado (modo desenvolvimento).');
    } else {
      await connection.sync();
      console.log('Banco de dados sincronizado (modo produção).');
    }
  } catch (err) {
    console.error('Erro ao sincronizar o banco de dados:', err);
  }
};

export default syncDatabase;
