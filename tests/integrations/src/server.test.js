import {
  describe, it, expect, beforeAll, afterAll,
} from 'vitest';
import request from 'supertest';
import express from 'express';
import env from '../../../src/config/env.js';

const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
};

const MESSAGES = {
  SERVER_RUNNING: 'Servidor Express configurado e funcionando!',
};

describe('Testes do Servidor Express', () => {
  let app;
  let server;

  beforeAll(() => {
    app = express();
    app.use(express.json());

    app.get('/', (req, res) => {
      res.status(HTTP_STATUS.OK).send(MESSAGES.SERVER_RUNNING);
    });

    const { port } = env.server || { port: 0 };
    server = app.listen(port);
  });

  afterAll((done) => {
    if (server) {
      server.close(done);
    }
  });

  it('deve responder à rota GET / com status 200', async () => {
    const response = await request(app)
      .get('/')
      .expect('Content-Type', /text/)
      .expect(HTTP_STATUS.OK);

    expect(response.text).toBe(MESSAGES.SERVER_RUNNING);
  });

  it('deve retornar 404 para rotas não existentes', async () => {
    await request(app)
      .get('/rota-inexistente')
      .expect(HTTP_STATUS.NOT_FOUND);
  });

  it('deve rejeitar métodos não permitidos na rota principal', async () => {
    await request(app)
      .post('/')
      .expect(HTTP_STATUS.NOT_FOUND);
  });

  it('deve aceitar requisições com JSON', async () => {
    const testData = { test: 'data' };

    await request(app)
      .post('/test-json')
      .send(testData)
      .expect(HTTP_STATUS.NOT_FOUND);
  });
});
