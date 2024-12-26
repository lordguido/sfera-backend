// SERVIDOR HTTP
import dotenv from 'dotenv';
import http from 'http';

const envFiles = {
  prod: '.env.prod',
  dev: '.env.dev',
};

const envPath = envFiles[process.env.NODE_ENV] || envFiles.dev;
dotenv.config({ path: envPath });

const port = process.env.APP_PORT;
const version = process.env.APP_VERSION;

if (!port || !version) {
  console.error('Required environment variables are missing');
  process.exit(1);
}

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
  console.log(`Server is running on port ${port} and version ${version}`);
});
