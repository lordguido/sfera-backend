import { body } from 'express-validator';

// Configuração global para tamanho máximo de payload
export const payloadConfig = {
  limit: '10mb',
};

// Validators comuns reutilizáveis
export const commonValidators = {
  // Validador de ID
  id: body('id').isUUID('4').withMessage('ID deve estar no formato UUIDv4'),

  // Validador de email
  email: body('email').isEmail().normalizeEmail().withMessage('Email inválido'),

  // Validador de senha
  password: body('password')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter no mínimo 6 caracteres')
    .isAlphanumeric()
    .withMessage('Senha deve conter apenas letras e números'),

  // Validador de nome
  name: body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Nome deve ter entre 2 e 100 caracteres'),
};

// Middleware para validação de erros
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => ({
        campo: err.param,
        mensagem: err.msg,
      })),
    });
  }
  next();
};
