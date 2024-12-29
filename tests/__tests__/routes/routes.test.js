import request from 'supertest';
import express from 'express';
import routes from '../../../src/api/routes/routes.js';

const app = express();
app.use(express.json());
app.use(routes);

describe('Testes de Rotas', () => {
  it('Deve responder à rota raiz', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  it('Deve responder à rota teste', async () => {
    const res = await request(app).get('/test');
    expect(res.status).toBe(200);
  });

  it('Deve retornar 404 para rota inexistente', async () => {
    const res = await request(app).get('/rota-inexistente');
    expect(res.status).toBe(404);
  });
});
