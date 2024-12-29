import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carrega as variáveis de ambiente de teste
dotenv.config({
  path: join(__dirname, 'src', 'config', '.env.test'),
});
