// SERVIDOR HTTP
import http from 'http';
import chalk from 'chalk';

import config from './config/configServer.js';
import handleRoutes from './routes/routes.js';

const server = http.createServer(handleRoutes);

server.listen(config.port, () => {
  const borderWidth = 22;
  const border = '━'.repeat(borderWidth);
  const centerText = (text, width) => {
    const padding = Math.floor((width - text.length) / 2);
    return ' '.repeat(padding) + text + ' '.repeat(width - text.length - padding);
  };

  const serverStarted = centerText('🟢 Server Started 🟢', borderWidth);
  const portText = centerText(`On Port: ${config.port}`, borderWidth);
  const versionText = centerText(`Version: ${config.version}`, borderWidth);
  const envText = centerText(`${config.environment}`, borderWidth);

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
