// servidor
const http = require('http');

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

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
