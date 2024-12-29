import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';

const execAsync = promisify(exec);

// Logs simples
const log = (message) => console.log(chalk.blue(message));
const logError = (message) => console.error(chalk.red(message));

// Geração de migrações
async function generate(name) {
  try {
    log(`Gerando migração: ${name}...`);
    const { stdout } = await execAsync(`npx sequelize-cli migration:generate --name ${name}`);

    const match = stdout.match(/New migration was created at ([^\n]+)/);
    if (match) {
      const filePath = match[1].trim().replace(/\.\s*$/, '');
      log(`Novo arquivo de migração gerado em: ${filePath}`);
    } else {
      logError('Não foi possível identificar o arquivo de migração no output.');
      // logError('Output completo:', stdout);
    }
  } catch (error) {
    logError(`Erro ao gerar migração: ${error.message}`);
    if (error.stderr) {
      logError(`Detalhes adicionais: ${error.stderr}`);
    }
  }
}

// Execução das migrações
async function migrate() {
  try {
    log('Executando migrações...');
    await execAsync('npx sequelize-cli db:migrate');
    log('Migrações executadas com sucesso.');
  } catch (error) {
    logError(`Erro ao executar migrações: ${error.message}`);
    if (error.stderr) {
      logError(`Detalhes adicionais: ${error.stderr}`);
    }
  }
}

// Reversão da última migração
async function undo() {
  try {
    log('Revertendo a última migração...');
    await execAsync('npx sequelize-cli db:migrate:undo');
    log('Última migração revertida com sucesso.');
  } catch (error) {
    logError(`Erro ao reverter migração: ${error.message}`);
    if (error.stderr) {
      logError(`Detalhes adicionais: ${error.stderr}`);
    }
  }
}

// Execução de seeds
async function seed(type = 'all') {
  try {
    const comando =
      type === 'all'
        ? 'npx sequelize-cli db:seed:all'
        : `npx sequelize-cli db:seed --seed src/database/seeders/${type}.cjs`;

    log(`Executando seeds (${type})...`);
    await execAsync(comando);
    log('Seeds executados com sucesso.');
  } catch (error) {
    logError(`Erro ao executar seeds: ${error.message}`);
    if (error.stderr) {
      logError(`Detalhes adicionais: ${error.stderr}`);
    }
  }
}

// Reversão de seeds
async function seedUndo(type = 'all') {
  try {
    const comando = type === 'all' ? 'npx sequelize-cli db:seed:undo:all' : 'npx sequelize-cli db:seed:undo';

    log(`Revertendo seeds (${type})...`);
    await execAsync(comando);
    log('Seeds revertidos com sucesso.');
  } catch (error) {
    logError(`Erro ao reverter seeds: ${error.message}`);
    if (error.stderr) {
      logError(`Detalhes adicionais: ${error.stderr}`);
    }
  }
}

// Controle dos comandos CLI
const command = process.argv[2];
const param = process.argv[3];

// Use uma IIFE para aguardar as async
(async () => {
  switch (command) {
    case 'generate':
      if (!param) {
        logError('Por favor, forneça um nome para a migração.');
        process.exit(1);
      }
      await generate(param);
      break;
    case 'migrate':
      await migrate();
      break;
    case 'undo':
      await undo();
      break;
    case 'seed':
      await seed(param);
      break;
    case 'seed:undo':
      await seedUndo(param);
      break;
    default:
      logError('Comando inválido. Use: generate, migrate, undo, seed, seed:undo');
      process.exit(1);
  }
})();
