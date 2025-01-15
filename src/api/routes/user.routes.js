import { Router } from 'express';
import User from '../../database/models/user.js';
import HTTP_STATUS from '../../config/httpStatus.js';

const userRouter = Router();

userRouter.get('/user', async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(HTTP_STATUS.OK).json(users);
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send('Erro ao buscar usuários!');
  }
});

userRouter.post('/user', async (req, res) => {
  try {
    const {
      login, password, name, email,
    } = req.body;

    if (!login || !password || !name || !email) {
      return res.status(HTTP_STATUS.BAD_REQUEST)
        .send('Todos os campos são obrigatórios: login, password, name, email.');
    }

    await User.create({
      login, password, name, email,
    });
    return res.status(HTTP_STATUS.CREATED).send('Usuário criado com sucesso!');
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const duplicatedField = error.errors?.[0]?.path;

      if (duplicatedField === 'login') {
        return res.status(HTTP_STATUS.CONFLICT).send('Login já está em uso!');
      }
      if (duplicatedField === 'email') {
        return res.status(HTTP_STATUS.CONFLICT).send('E-mail já está em uso!');
      }
    }
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send('Erro ao criar usuário!');
  }
});

userRouter.delete('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const userDeleted = await User.destroy({ where: { id } });

    if (!userDeleted) {
      return res.status(HTTP_STATUS.NOT_FOUND).send('Usuário não encontrado!');
    }

    return res.status(HTTP_STATUS.ACCEPTED).send('Usuário deletado com sucesso!');
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send('Erro ao deletar usuário!');
  }
});

userRouter.put('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).send('Usuário não encontrado!');
    }

    user.name = name;
    await user.save();

    return res.status(HTTP_STATUS.ACCEPTED).send('Usuário atualizado com sucesso!');
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send('Erro ao atualizar usuário!');
  }
});

export default userRouter;
