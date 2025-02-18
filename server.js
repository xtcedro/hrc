import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http"; // ✅ Required for WebSockets
import { WebSocketServer } from "ws"; // ✅ WebSocket Server
import { db } from "./config/db.js";
import appointmentRoutes from "./routes/appointments.js";
import chatRoutes from "./routes/chatRoutes.js";
import systemRoutes from "./routes/systemRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const server = createServer(app); // ✅ Use HTTP Server for WebSockets
const wss = new WebSocketServer({ server }); // ✅ Create WebSocket Server

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/api/appointments", appointmentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/system", systemRoutes);

// ✅ WebSocket Connection Handling
wss.on("connection", (ws) => {
    console.log("🔗 New WebSocket connection");

    ws.on("close", () => {
        console.log("❌ WebSocket connection closed");
    });
});

// ✅ Start Server with WebSockets
server.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));

export { wss }; // ✅ Export WebSocket instance

// Keep daemon running
console.log("✅ AI-Powered Universal Automation Layer is running...");
setInterval(() => console.log("✅ Listening for AI automation triggers..."), 5000);
