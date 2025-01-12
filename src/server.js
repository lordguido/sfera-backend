import env from './config/env.js';

const sum = (a, b) => a + b;

console.log(`Servidor rodando no modo ${env.server.nodeEnv} na porta ${env.server.port}`);

export default sum;
