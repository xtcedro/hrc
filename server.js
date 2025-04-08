import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import os from "os";
import { db } from "./config/db.js";
import appointmentRoutes from "./routes/appointments.js";
import chatRoutes from "./routes/chatRoutes.js";
import stripeRoutes from "./routes/stripe.js";
import adminRoutes from "./routes/adminRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// ✅ Environment Setup
console.log("✅ Loading environment variables...");
console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
console.log("🔐 JWT Secret Loaded:", !!process.env.JWT_SECRET);

// ✅ Middleware Configuration
app.use(express.json());
console.log("🧠 JSON middleware configured.");

app.use(cors());
console.log("🌍 CORS enabled.");

app.use(express.static("public"));
console.log("🗂️ Serving static files from /public");

// ✅ Register API Routes
console.log("🔗 Registering API routes...");

app.use("/api/stripe", stripeRoutes);
console.log("➡️ Stripe routes loaded at /api/stripe");

app.use("/api/appointments", appointmentRoutes);
console.log("➡️ Appointment routes loaded at /api/appointments");

app.use("/api/chat", chatRoutes);
console.log("➡️ Chat routes loaded at /api/chat");

app.use("/api/admin", adminRoutes);
console.log("➡️ Admin routes loaded at /api/admin");

app.use("/api/dashboard", dashboardRoutes);
console.log("➡️ Dashboard routes loaded at /api/dashboard");

app.use("/api/settings", settingsRoutes);
console.log("➡️ Settings routes loaded at /api/settings");

// ✅ System Information
const uptimeInMinutes = (os.uptime() / 60).toFixed(2);
console.log("🖥️ Server Hostname:", os.hostname());
console.log("🧠 OS Type:", os.type());
console.log("🧩 Platform:", os.platform());
console.log("🕒 System Uptime:", `${uptimeInMinutes} minutes`);
console.log("🧮 Total Memory:", `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`);
console.log("⚡ Free Memory:", `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`);
console.log("==========================================");

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on: http://localhost:${port}`);
  console.log("==========================================");
});
