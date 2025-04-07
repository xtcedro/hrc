import express from 'express';
import { createPaymentIntent, getPublicKey } from '../controllers/stripeController.js';

const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);
router.get('/public-key', getPublicKey);

export default router;