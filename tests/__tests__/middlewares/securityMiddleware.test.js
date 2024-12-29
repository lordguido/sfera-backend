import request from 'supertest';
import express from 'express';
import { corsOptions, helmetOptions } from '../../../src/config/securityConfig.js';
import setupSecurity from '../../../src/api/middlewares/securityMiddleware.js';

describe('Middleware de Segurança', () => {
  let app;

  beforeEach(() => {
    app = express();
    setupSecurity(app);
    app.get('/', (req, res) => res.send('test'));
  });

  describe('Configurações CORS', () => {
    it('Deve permitir origens configuradas', async () => {
      const response = await request(app).get('/').set('Origin', 'http://localhost:3000');

      expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');
      expect(response.headers['access-control-allow-credentials']).toBe('true');
    });

    it('Deve permitir métodos HTTP configurados', async () => {
      const response = await request(app).options('/').set('Origin', 'http://localhost:3000');

      const allowedMethods = response.headers['access-control-allow-methods'];
      corsOptions.methods.forEach((method) => {
        expect(allowedMethods).toContain(method);
      });
    });

    it('Deve incluir os headers permitidos', async () => {
      const response = await request(app).options('/').set('Origin', 'http://localhost:3000');

      const allowedHeaders = response.headers['access-control-allow-headers'];
      corsOptions.allowedHeaders.forEach((header) => {
        expect(allowedHeaders).toContain(header);
      });
    });
  });

  describe('Configurações Helmet', () => {
    it('Deve aplicar headers de segurança configurados', async () => {
      const response = await request(app).get('/');

      if (helmetOptions.dnsPrefetchControl) {
        expect(response.headers['x-dns-prefetch-control']).toBeDefined();
      }
      if (helmetOptions.frameguard) {
        expect(response.headers['x-frame-options']).toBeDefined();
      }
      if (helmetOptions.hidePoweredBy) {
        expect(response.headers['x-powered-by']).toBeUndefined();
      }
      if (helmetOptions.noSniff) {
        expect(response.headers['x-content-type-options']).toBe('nosniff');
      }
    });
  });

  describe('Middleware de Erro', () => {
    it('Deve tratar erros de autenticação', async () => {
      // Middleware de erro deve ser o último
      app.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
          res.status(401).json({
            error: 'Acesso não autorizado',
            message: 'Você não tem permissão para acessar este recurso',
          });
        } else {
          next(err);
        }
      });

      app.get('/protected', (req, res, next) => {
        const error = new Error('Unauthorized');
        error.name = 'UnauthorizedError';
        next(error);
      });

      const response = await request(app).get('/protected');

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        error: 'Acesso não autorizado',
        message: 'Você não tem permissão para acessar este recurso',
      });
    });
  });
});
