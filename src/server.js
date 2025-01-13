import express from 'express';
import env from './config/env.js';

const app = express();
const HTTP_STATUS = {
  OK: 200,
};
const MESSAGES = {
  SERVER_RUNNING: 'Servidor Express configurado e funcionando!',
  SERVER_STATUS: (nodeEnv, port) => `Teste Servidor rodando em modo ${nodeEnv} na porta ${port}`,
};

app.use(express.json());

const { port, nodeEnv } = env.server;

app.get('/', (req, res) => {
  res.status(HTTP_STATUS.OK).send(MESSAGES.SERVER_RUNNING);
});

app.listen(port, () => {
  console.log(MESSAGES.SERVER_STATUS(nodeEnv, port));
});
