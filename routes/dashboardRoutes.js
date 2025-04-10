// /routes/dashboardRoutes.js
import express from "express";
import { getDashboardOverview } from "../controllers/dashboardController.js";
import { verifyAdminToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyAdminToken, getDashboardOverview);

export default router;