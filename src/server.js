import express from 'express';
import 'dotenv/config';
import routes from './api/routes/index.js';
import syncDatabase from './database/syncDatabase.js';
import './config/database.js';

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  await syncDatabase();
}

app.use(routes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor rodando no modo ${process.env.NODE_ENV} na porta ${process.env.APP_PORT}`);
});

