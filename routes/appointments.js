// /routes/appointments.js
import express from "express";
import {
  submitAppointment,
  fetchAppointments
} from "../controllers/appointmentController.js";
import { verifyAdminToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: Allow anyone to submit an appointment
router.post("/", submitAppointment);

// Protected: Only admin can view all appointments
router.get("/", verifyAdminToken, fetchAppointments);

export default router;