import url from 'url';

export default function handleRoutes(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  const parsedUrl = url.parse(req.url, true);
  const route = parsedUrl.pathname;

  const routes = {
    '/': () => 'Hello World!',
    '/test': () => 'Test Page',
  };

  const response = routes[route] ? routes[route]() : 'Page Not Found';
  res.end(response);
}
