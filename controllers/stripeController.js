import stripe from '../config/stripe.js';

/**
 * ✅ Create a Payment Intent (Handles client payment requests)
 */
export const createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ['card'],
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("❌ Stripe Payment Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

/**
 * ✅ Return Stripe Public Key
 */
export const getPublicKey = (req, res) => {
    console.log("🔑 /api/stripe/public-key requested");
    const publicKey = process.env.STRIPE_PUBLIC_KEY;

    if (!publicKey) {
        console.error("❌ Stripe public key missing in .env");
        return res.status(500).json({ error: "Stripe public key not configured" });
    }

    res.status(200).json({ publicKey });
};