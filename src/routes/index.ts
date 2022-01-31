import { Router } from 'express';
import OrderController from '../controllers/OrderController';
const router = Router();

const {
  createOrder,
  getActiveOrder,
  getPosition,
  setLeverage,
  setTakeProfit,
  createDeal,
  updateTakeProfit,
} = new OrderController();
router.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Welcome to Cake API Service' });
});

router.post('/orders', createOrder);
router.get('/orders', getActiveOrder);
router.get('/positions', getPosition);
router.post('/leverage', setLeverage);
router.post('/positions/tp', setTakeProfit);
router.post('/deals', createDeal);
router.get('/deals', updateTakeProfit);
export default router;
