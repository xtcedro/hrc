// controllers/chatController.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatController = async (req, res) => {
    try {
        const { message } = req.body || {};

        const systemPrompt = `
        You are the AI Assistant for Heavenly Roofing OK. You provide reliable, professional responses regarding roofing services in Oklahoma City.

        ✅ Services Offered:
        - Residential & Commercial Roof Replacements
        - Free Inspections & Storm Damage Estimates
        - Gutter & Flashing Repair
        - Insurance Claim Assistance

        📍 Location: Oklahoma City, OK  
        ✉️ Email: robertocrodriguez37@gmail.com  
        📞 Phone: 405-973-7090  
        `;

        if (!message) {
            return res.json({
                reply: `
                <b>Welcome to Heavenly Roofing OK! 🏠</b><br><br>
                Need a roof inspection or quote? I can help with repairs, replacements, and insurance claims.<br><br>
                📧 <b>Email:</b> <a href="mailto:robertocrodriguez37@gmail.com" style="color: #FFD700;">robertocrodriguez37@gmail.com</a><br>
                📞 <b>Phone:</b> <a href="tel:+14059737090" style="color: #FFD700;">405-973-7090</a><br><br>
                <b>How can I assist you today?</b>
                `
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const chat = await model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
            },
        });

        const response = await chat.sendMessage([systemPrompt, message]);
        const botReply = response.response.text();

        res.json({ reply: botReply });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "AI processing failed. Please try again later." });
    }
};