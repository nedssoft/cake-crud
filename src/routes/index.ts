import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Welcome to Cake API Service' });
});

export default router;
