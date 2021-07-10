import { Router } from 'express';
import CakeController from '../controllers/CakeController';

const router = Router();

const { listCakes} = new CakeController();
router.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Welcome to Cake API Service' });
});

router.get('/cakes', listCakes)

export default router;
