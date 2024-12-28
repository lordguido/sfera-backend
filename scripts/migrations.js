import { exec } from 'child_process';
import { rename } from 'fs/promises';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function generate(name) {
  try {
    console.log('Gerando migration...');
    const { stdout } = await execAsync(`npx sequelize-cli migration:generate --name ${name}`);
    console.log(stdout);

    // Extrai o caminho sem caracteres ANSI e sem duplicação
    const match = stdout.match(/New migration was created at (.*\.js)/);
    if (match) {
      const filePath = match[1]
        .trim()
        // Remove códigos de cores ANSI
        .replace(/\u001b\[\d+m/g, '')
        // Remove caminho duplicado se existir
        .replace(/.*backend-sfera\/(.*)/, '$1');

      const oldPath = filePath;
      const newPath = oldPath.replace('.js', '.cjs');

      await rename(oldPath, newPath);
      console.log(`Migration renomeada para: ${newPath}`);
    }
  } catch (error) {
    console.error('Erro ao gerar migration:', error.message);
    if (error.stderr) console.error('Erro detalhado:', error.stderr);
  }
}

async function migrate() {
  try {
    console.log('Executando migrations...');
    const { stdout, stderr } = await execAsync('npx sequelize-cli db:migrate');
    console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    console.error('Erro ao executar migrations:', error.message);
    if (error.stderr) console.error('Erro detalhado:', error.stderr);
  }
}

async function undo() {
  try {
    console.log('Revertendo última migration...');
    const { stdout, stderr } = await execAsync('npx sequelize-cli db:migrate:undo');
    console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    console.error('Erro ao reverter migration:', error.message);
    if (error.stderr) console.error('Erro detalhado:', error.stderr);
  }
}

const command = process.argv[2];
const migrationName = process.argv[3];

switch (command) {
  case 'generate':
    if (!migrationName) {
      console.error('Por favor, forneça um nome para a migration');
      process.exit(1);
    }
    generate(migrationName);
    break;
  case 'migrate':
    migrate();
    break;
  case 'undo':
    undo();
    break;
  default:
    console.error('Comando inválido. Use: generate, migrate ou undo');
    process.exit(1);
}
