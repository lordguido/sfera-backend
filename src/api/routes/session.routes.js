import { Router } from 'express';
import User from '../../database/models/user.js';
import HTTP_STATUS from '../../config/httpStatus.js';
import { verifyPassword } from '../../utils/bcryptUtils.js';

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

    return res
      .status(HTTP_STATUS.ACCEPTED)
      .json({ message: 'Login bem-sucedido!' });
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: 'Erro ao fazer login', error });
  }
});

export default sessionRouter;
