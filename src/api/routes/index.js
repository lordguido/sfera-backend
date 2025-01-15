import { Router } from 'express';
import sessionRouter from './session.routes.js';
import userRouter from './user.routes.js';

const router = Router();

router.use(sessionRouter);
router.use(userRouter);

export default router;
