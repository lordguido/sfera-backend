import request from 'supertest';
import express from 'express';
import { securityHeaders } from '../../../src/config/securityConfig.js';
import setupSecurity from '../../../src/api/middlewares/securityMiddleware.js';

describe('Middleware de Segurança', () => {
  let app;

  beforeEach(() => {
    app = express();
    setupSecurity(app);
    app.get('/', (req, res) => res.send('test'));
  });

  it('Deve aplicar headers básicos de segurança', async () => {
    const response = await request(app).get('/');
    expect(response.headers['x-xss-protection']).toBe(securityHeaders.xssProtection);
    expect(response.headers['x-frame-options']).toBe(securityHeaders.frameOptions);
  });

  it('Deve aplicar Content Security Policy', async () => {
    const response = await request(app).get('/');
    expect(response.headers['content-security-policy']).toBe(securityHeaders.contentSecurityPolicy);
  });

  it('Deve aplicar Strict Transport Security', async () => {
    const response = await request(app).get('/');
    expect(response.headers['strict-transport-security']).toBe(securityHeaders.strictTransport);
  });

  it('Deve aplicar configurações de CORS para origem permitida', async () => {
    const response = await request(app).get('/').set('Origin', 'http://localhost:3000');

    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');
    expect(response.headers['access-control-allow-credentials']).toBe('true');
  });

  it('Deve rejeitar origens não permitidas', async () => {
    const response = await request(app).get('/').set('Origin', 'http://site-malicioso.com');

    expect(response.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('Deve permitir métodos HTTP específicos', async () => {
    const response = await request(app).options('/').set('Origin', 'http://localhost:3000');

    expect(response.headers['access-control-allow-methods'])
      .toContain('GET')
      .toContain('POST')
      .toContain('PUT')
      .toContain('DELETE');
  });
});
