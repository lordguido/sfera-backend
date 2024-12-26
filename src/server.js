import http from 'http';
import chalk from 'chalk';
import config from './config/configServer.js';
import handleRoutes from './routes/routes.js';

const server = http.createServer(handleRoutes);

server.listen(config.port, () => {
  console.info(
    '\n',
    chalk.green.bold('━━━━━━━━━━━━━━━━━━━━━━━'),
    '\n',
    chalk.green.bold('  SERVER STARTED  🚀  '),
    '\n',
    chalk.green.bold('━━━━━━━━━━━━━━━━━━━━━━━'),
    '\n',
    `Port: ${config.port}`,
    '\n',
    `Version: ${config.version}`,
    '\n',
    `Environment: ${config.environment}`,
    '\n'
  );
});
