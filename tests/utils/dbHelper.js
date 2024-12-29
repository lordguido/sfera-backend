import connection from '../../src/database/connection.js';

export const dbConnect = async () => {
  try {
    await connection.authenticate();
    return true;
  } catch (error) {
    console.error('Erro na conexão com o banco de dados:', error);
    throw error;
  }
};

export const dbDisconnect = async () => {
  try {
    await connection.close();
  } catch (error) {
    console.error('Erro ao fechar conexão:', error);
  }
};
