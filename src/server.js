// SERVIDOR HTTP
import dotenv from 'dotenv';
import chalk from 'chalk';

import http from 'http';

const envFiles = {
  prod: './src/config/.env.prod',
  dev: './src/config/.env.dev',
};

const envPath = envFiles[process.env.NODE_ENV] || './src/config/.env';
dotenv.config({ path: envPath });

const port = process.env.APP_PORT;
const version = process.env.APP_VERSION;

if (!port || !version) {
  console.error(chalk.red.bold('Required environment variables are missing'));
  process.exit(1);
}

const environment = process.env.NODE_ENV === 'prod' ? 'PRODUCTION' : 'DEVELOPMENT';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  if (req.url == '/') {
    console.log('Hello World');
    res.end('Hello World');
  } else if (req.url == '/test') {
    res.end('Test Page');
  } else {
    res.end('Page Not Found');
  }
});

server.listen(port, () => {
  const borderWidth = 22;
  const border = '━'.repeat(borderWidth);
  const centerText = (text, width) => {
    const padding = Math.floor((width - text.length) / 2);
    return ' '.repeat(padding) + text + ' '.repeat(width - text.length - padding);
  };

  const serverStarted = centerText('🟢 Server Started 🟢', borderWidth);
  const portText = centerText(`On Port: ${port}`, borderWidth);
  const versionText = centerText(`Version: ${version}`, borderWidth);
  const envText = centerText(`${environment}`, borderWidth);

  console.info(
    '\n',
    chalk.green.bold(`┏${border}┓`),
    '\n',
    `${chalk.green.bold('┃')}${chalk.green.bold(serverStarted)}${chalk.green.bold('┃')}`,
    '\n',
    chalk.green.bold(`┣${border}┫`),
    '\n',
    `${chalk.green.bold('┃')}${chalk.white.bold(portText)}${chalk.green.bold('┃')}`,
    '\n',
    chalk.green.bold(`┣${border}┫`),
    '\n',
    `${chalk.green.bold('┃')}${chalk.white.bold(versionText)}${chalk.green.bold('┃')}`,
    '\n',
    chalk.green.bold(`┣${border}┫`),
    '\n',
    `${chalk.green.bold('┃')}${chalk.white.bold(envText)}${chalk.green.bold('┃')}`,
    '\n',
    chalk.green.bold(`┗${border}┛`),
    '\n'
  );
});
