import { Router } from 'express';
import CakeController from '../controllers/CakeController';
import { createCakeSchema } from '../validations/schemas/cake';
import Validator from '../validations/Validator';
const router = Router();

const { listCakes, createCake } = new CakeController();
router.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Welcome to Cake API Service' });
});

router.get('/cakes', listCakes)
router.post('/cakes', Validator.validate(createCakeSchema), createCake);
export default router;
