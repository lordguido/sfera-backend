import User from '../models/User.js';

const seedDatabase = async () => {
  try {
    const user = await User.create({
      username: 'admin',
      password: '123456',
    });
    console.log('Usuário criado:', user.toJSON());
  } catch (err) {
    console.error('Erro ao criar usuário de teste:', err);
  }
};

export default seedDatabase;
