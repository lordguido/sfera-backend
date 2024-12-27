import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!!');
});

router.get('/test', (req, res) => {
  res.send('Test Page');
});

router.use((req, res) => {
  res.status(404).send('Page Not Found');
});

export default router;
