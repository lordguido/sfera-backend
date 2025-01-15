import sequelize from '../config/database.js';
import { hashPassword } from '../utils/bcryptUtils.js';
import User from './models/user.js';

export default async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Banco de dados sincronizado com sucesso!');
    const hashedPassword = await hashPassword('123456');
    await User.create({
      login: 'Admin',
      password: hashedPassword,
      name: 'Administrador',
      email: 'admin@solprog.com.br',
    });
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
}
