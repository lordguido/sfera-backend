import { exec } from 'child_process';
import { rename } from 'fs/promises';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function generate(name) {
  try {
    console.log('Generating migration...');
    const { stdout } = await execAsync(`npx sequelize-cli migration:generate --name ${name}`);
    console.log(stdout);

    const match = stdout.match(/New migration was created at (.+\.js)/);
    if (match) {
      const oldPath = match[1];
      const newPath = oldPath.replace('.js', '.cjs');
      await rename(oldPath, newPath);
      console.log(`Migration renamed to: ${newPath}`);
    }
  } catch (error) {
    console.error('Error generating migration:', error);
  }
}

async function migrate() {
  try {
    console.log('Running migrations...');
    const { stdout, stderr } = await execAsync('npx sequelize-cli db:migrate');
    console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    console.error('Error running migrations:', error);
  }
}

async function undo() {
  try {
    console.log('Reverting last migration...');
    const { stdout, stderr } = await execAsync('npx sequelize-cli db:migrate:undo');
    console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    console.error('Error reverting migration:', error);
  }
}

async function seed(type = 'all') {
  try {
    console.log('Running seeds...');
    const command =
      type === 'all'
        ? 'npx sequelize-cli db:seed:all'
        : `npx sequelize-cli db:seed --seed src/database/seeders/${type}.cjs`;

    const { stdout, stderr } = await execAsync(command);
    console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    console.error('Error running seeds:', error);
  }
}

async function seedUndo(type = 'all') {
  try {
    console.log('Reverting seeds...');
    const command = type === 'all' ? 'npx sequelize-cli db:seed:undo:all' : 'npx sequelize-cli db:seed:undo';

    const { stdout, stderr } = await execAsync(command);
    console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    console.error('Error reverting seeds:', error);
  }
}

const command = process.argv[2];
const param = process.argv[3];

switch (command) {
  case 'generate':
    if (!param) {
      console.error('Please provide a name.');
      process.exit(1);
    }
    generate(param);
    break;
  case 'migrate':
    migrate();
    break;
  case 'undo':
    undo();
    break;
  case 'seed':
    seed(param);
    break;
  case 'seed:undo':
    seedUndo(param);
    break;
  default:
    console.error('Invalid command. Use: generate, migrate, undo, seed, seed:undo');
    process.exit(1);
}
