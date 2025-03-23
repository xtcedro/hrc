// controllers/chatController.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatController = async (req, res) => {
    try {
        const { message } = req.body || {};

        const systemPrompt = `
        You are the AI Assistant for Heavenly Roofing OK. Provide professional, helpful answers regarding roof replacement, inspection scheduling, storm damage repair, and company services.

        💼 Company: Heavenly Roofing OK
        📍 Service Area: Oklahoma City & Surrounding Areas
        📞 Phone: <a href="tel:+14057623899" style="color: #FFD700; text-decoration: underline;">(405) 762-3899</a>
        ✉️ Email: <a href="mailto:heavenlyroofingok@gmail.com" style="color: #FFD700; text-decoration: underline;">heavenlyroofingok@gmail.com</a>

        ✅ Common Services:
        - Residential & Commercial Roof Replacement
        - Insurance Claim Assistance for Storm & Hail Damage
        - Free Inspections & Roof Reports
        - Gutter & Flashing Repair
        `;

        if (!message) {
            return res.json({
                reply: `
                <b>Welcome to Heavenly Roofing OK! ☁️</b><br><br>
                I can help with inspections, estimates, insurance claims, and more.<br><br>
                📍 Serving Oklahoma City<br>
                📞 Call us: <a href="tel:+14057623899" style="color: #FFD700;">(405) 762-3899</a><br>
                ✉️ Email: <a href="mailto:heavenlyroofingok@gmail.com" style="color: #FFD700;">heavenlyroofingok@gmail.com</a><br><br>
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