import express from 'express';
import { createPaymentIntent, getPublicKey } from '../controllers/stripeController.js';

const router = express.Router();

// ✅ Log when POST /create-payment-intent is accessed
router.post('/create-payment-intent', (req, res) => {
  console.log("📨 [POST] /api/stripe/create-payment-intent");
  console.log("🧾 Request body:", req.body);

  createPaymentIntent(req, res)
    .then(() => console.log("✅ Payment intent created successfully."))
    .catch(err => console.error("❌ Error creating payment intent:", err.message));
});

// ✅ Log when GET /public-key is accessed
router.get('/public-key', (req, res) => {
  console.log("🔑 [GET] /api/stripe/public-key");
  
  getPublicKey(req, res);

  console.log("✅ Stripe public key served.");
});

export default router;