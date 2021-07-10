import { Router } from 'express';
import CakeController from '../controllers/CakeController';
import { createCakeSchema } from '../validations/schemas/cake';
import Validator from '../validations/Validator';
const router = Router();

const { listCakes, createCake, getCakeDetails, updateCake } = new CakeController();

router.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Welcome to Cake API Service' });
});

router.get('/cakes', listCakes)
router.post('/cakes', Validator.validate(createCakeSchema), createCake);
router.get('/cakes/:cake_id', getCakeDetails);
router.put('/cakes/:cake_id', Validator.validate(createCakeSchema),updateCake);

export default router;
