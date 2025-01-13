import express from 'express';
import env from './config/env.js';
import sequelize from './config/database.js';
import User from './database/models/user.js';

const app = express();
const HTTP_STATUS = {
  OK: 200,
};
const MESSAGES = {
  SERVER_RUNNING: 'Breno 3 Servidor Express configurado e funcionando!',
  SERVER_STATUS: (nodeEnv, port) => `Servidor rodando no modo ${nodeEnv} na porta ${port}`,
};

app.use(express.json());

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Banco de dados sincronizado com sucesso!');
    const newUser = await User.create({ name: 'Admin', email: 'admin@solprog.com.br' });
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
};
syncDatabase();

const { port, nodeEnv } = env.server;

app.get('/', (req, res) => {
  res.status(HTTP_STATUS.OK).send(MESSAGES.SERVER_RUNNING);
});

app.listen(port, () => {
  console.log(MESSAGES.SERVER_STATUS(nodeEnv, port));
});
