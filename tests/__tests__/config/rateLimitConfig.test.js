import { jest } from '@jest/globals';
import chalk from 'chalk';
import rateLimit from 'express-rate-limit';

// Mock do express-rate-limit
jest.mock('express-rate-limit', () => {
  return jest.fn((config) => config);
});

// Mock do chalk
jest.mock('chalk', () => ({
  red: jest.fn((text) => text),
}));

describe('Rate Limit Configuration', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env.NODE_ENV = 'test';
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  describe('defaultLimiter', () => {
    it('Deve configurar limites em ambiente de produção', async () => {
      // Debug: vamos ver o valor antes
      console.log('NODE_ENV antes:', process.env.NODE_ENV);

      process.env.NODE_ENV = 'prod';

      // Debug: vamos ver se o valor mudou
      console.log('NODE_ENV depois:', process.env.NODE_ENV);

      const { defaultLimiter } = await import('../../../src/config/rateLimitConfig.js');

      const call = rateLimit.mock.calls[0][0];
      expect(call.max).toBe(100);
    });

    it('Deve configurar limites em ambiente de desenvolvimento', async () => {
      // Debug: vamos ver o valor antes
      console.log('NODE_ENV antes:', process.env.NODE_ENV);

      process.env.NODE_ENV = 'dev';

      // Debug: vamos ver se o valor mudou
      console.log('NODE_ENV depois:', process.env.NODE_ENV);

      const { defaultLimiter } = await import('../../../src/config/rateLimitConfig.js');

      const call = rateLimit.mock.calls[0][0];
      console.log('max value:', call.max);
      expect(call.max).toBe(1000000);
    });

    it('Deve ter um handler que loga erros corretamente', async () => {
      // Mock o console.error original
      const originalError = console.error;
      let loggedMessage;

      // Substitui o console.error por nossa versão mock
      console.error = jest.fn((msg) => {
        loggedMessage = msg;
      });

      try {
        process.env.NODE_ENV = 'prod';
        const { defaultLimiter } = await import('../../../src/config/rateLimitConfig.js');

        console.log('defaultLimiter:', defaultLimiter);

        const handlerCall = rateLimit.mock.calls[0][0];
        const mockReq = { ip: '192.168.1.1' };
        const mockRes = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        // Executa o handler
        handlerCall.handler(mockReq, mockRes);

        // Verifica se a mensagem foi logada corretamente
        expect(loggedMessage).toBe(chalk.red(`[Rate Limit] IP bloqueado: 192.168.1.1`));
        expect(console.error).toHaveBeenCalledTimes(1);

        // Verifica o status e a resposta JSON
        expect(mockRes.status).toHaveBeenCalledWith(429);
        expect(mockRes.json).toHaveBeenCalledWith({
          error: 'Muitas requisições deste IP',
          message: 'Por favor, tente novamente mais tarde',
        });
      } finally {
        // Restaura o console.error original
        console.error = originalError;
      }
    });
  });

  describe('authLimiter', () => {
    it('Deve configurar limites em ambiente de produção', async () => {
      process.env.NODE_ENV = 'prod';
      const { authLimiter } = await import('../../../src/config/rateLimitConfig.js');

      const call = rateLimit.mock.calls[1][0];
      expect(call.max).toBe(5);
    });

    it('Deve configurar limites em ambiente de desenvolvimento', async () => {
      process.env.NODE_ENV = 'dev';
      const { authLimiter } = await import('../../../src/config/rateLimitConfig.js');

      const call = rateLimit.mock.calls[1][0];
      expect(call.max).toBe(1000000);
    });
  });
});
