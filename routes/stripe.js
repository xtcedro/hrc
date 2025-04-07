import express from 'express';
import dotenv from 'dotenv';
import { createPaymentIntent } from '../controllers/stripeController.js';

dotenv.config();
const router = express.Router();

// ✅ Handle creation of payment intent
router.post('/create-payment-intent', createPaymentIntent);

// ✅ Send Stripe public key to frontend
router.get('/public-key', (req, res) => {
  console.log("🔑 /api/stripe/public-key requested");

  const publicKey = process.env.STRIPE_PUBLIC_KEY;
  if (!publicKey) {
    console.error("❌ Stripe public key missing in .env");
    return res.status(500).json({ error: "Stripe public key not configured" });
  }

  res.status(200).json({ publicKey });
});

export default router;