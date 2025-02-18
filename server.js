import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { db } from "./config/db.js";
import appointmentRoutes from "./routes/appointments.js";
import chatRoutes from "./routes/chatRoutes.js";
import systemRoutes from "./routes/systemRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/api/appointments", appointmentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/system", systemRoutes);

// Store active WebSocket clients
const clients = new Set();

wss.on("connection", (ws) => {
    console.log("🔗 New WebSocket connection");
    clients.add(ws);

    ws.on("message", async (message) => {
        try {
            const { text, sessionId } = JSON.parse(message);
            const response = await handleChatMessage(text, sessionId);
            broadcastMessage({ reply: response, sessionId });
        } catch (error) {
            console.error("Error processing WebSocket message:", error);
        }
    });

    ws.on("close", () => {
        clients.delete(ws);
        console.log("❌ WebSocket connection closed");
    });
});

// Function to send messages to all clients
const broadcastMessage = (message) => {
    clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(JSON.stringify(message));
        }
    });
};

// Start server
server.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));

export { wss, broadcastMessage };