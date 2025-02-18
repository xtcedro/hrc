import { GoogleGenerativeAI } from "@google/generative-ai";
import { broadcastMessage } from "../server.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const chatSessions = new Map();

export const handleChatMessage = async (message, sessionId) => {
    try {
        if (!sessionId) return "Error: Session ID required.";

        if (!message || message.trim() === "") {
            return `<b>Welcome to Heavenly Roofing OK! 🏠</b><br>
                    <b>How can I assist you today? 😊</b>`;
        }

        if (!chatSessions.has(sessionId)) {
            chatSessions.set(sessionId, []);
        }

        const chatHistory = chatSessions.get(sessionId);

        const systemPrompt = `
        You are the **Heavenly Roofing AI Assistant**, a trusted expert in **roofing services, storm damage restoration, and insurance claim assistance** for homeowners in **Oklahoma City**.
        Stay professional, informative, and customer-friendly.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const chat = await model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 300,
                temperature: 0.7,
            },
        });

        const userInput = `${systemPrompt}\n\nUser: ${message}`;
        const response = await chat.sendMessage(userInput);
        const botReply = response.response.text();

        chatHistory.push({ role: "user", message });
        chatHistory.push({ role: "assistant", message: botReply });

        if (chatHistory.length > 10) {
            chatHistory.splice(0, chatHistory.length - 10);
        }

        chatSessions.set(sessionId, chatHistory);
        return botReply;
    } catch (error) {
        console.error("AI Error:", error);
        return "AI processing failed. Please try again later.";
    }
};