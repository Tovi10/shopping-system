import { Router } from 'express';

import {
  postOrder,
} from '../controllers/ordersController.js';

const router = Router();

router.post(
  '/',
  postOrder
);

export default router;