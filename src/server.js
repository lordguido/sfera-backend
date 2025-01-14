import express from 'express';
import 'dotenv/config';
import sequelize from './config/database.js';
import User from './database/models/user.js';

const app = express();

app.use(express.json());

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Banco de dados sincronizado com sucesso!');
    await User.create({ name: 'Admin', password: '123456', email: 'admin@solprog.com.br' });
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
};
syncDatabase();

app.get('/', (req, res) => {
  res.status(200).send('Banco de dados sincronizado com sucesso!');
});

app.get('/User', async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro ao buscar usuários!');
  }
});

app.post('/User', async (req, res) => {
  try {
    const { name, password, email } = req.body;

    await User.create({
      name,
      password,
      email,
    });

    return res.status(201).send('Usuário criado com sucesso!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro ao criar usuário!');
  }
});

app.delete('/User/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const userDeleted = await User.destroy({
      where: { id },
    });

    if (!userDeleted) {
      return res.status(404).send('Usuário não encontrado!');
    }

    return res.status(200).send('Usuário deletado com sucesso!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro ao deletar usuário!');
  }
});

app.put('/User/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      return res.status(404).send('Usuário não encontrado!');
    }

    user.name = name;
    await user.save();

    return res.status(200).send('Nome do usuário atualizado com sucesso!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro ao atualizar usuário!');
  }
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor rodando no modo ${process.env.NODE_ENV} na porta ${process.env.APP_PORT}`);
});
