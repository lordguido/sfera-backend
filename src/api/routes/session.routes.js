import { Router } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { verifyPassword } from '../../utils/bcryptUtils.js';
import User from '../../database/models/user.js';
import HTTP_STATUS from '../../config/httpStatus.js';

const sessionRouter = Router();

sessionRouter.post('/login', async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ where: { login } });

    if (!user) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: 'Usuário não encontrado' });
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: 'Senha inválida' });
    }

    const payload = {
      id: user.id,
      login: user.login,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.APP_SECRET, {
      expiresIn: process.env.TOKEN_TIME_EXPIRE,
    });

    const userLogin = {
      id: user.id,
      login: user.login,
      name: user.name,
      email: user.email,
      token,
    };

    return res
      .status(HTTP_STATUS.ACCEPTED)
      .json({ message: 'Login bem-sucedido!', userLogin });
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: 'Erro ao fazer login', error: error.message });
  }
});

export default sessionRouter;
