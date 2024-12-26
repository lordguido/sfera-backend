export default function handleRoutes(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    console.log('Hello World!');
    res.end('Hello World!');
  } else if (req.url === '/test') {
    res.end('Test Page');
  } else {
    res.end('Page Not Found');
  }
}
