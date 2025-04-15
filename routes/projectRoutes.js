// routes/projectRoutes.js
import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

const router = express.Router();

// GET all projects
router.get("/", async (req, res, next) => {
  console.log("📦 GET /api/projects hit");
  next();
}, getAllProjects);

// GET single project by ID
router.get("/:id", async (req, res, next) => {
  console.log(`🔍 GET /api/projects/${req.params.id} hit`);
  next();
}, getProjectById);

// POST new project
router.post("/", async (req, res, next) => {
  console.log("➕ POST /api/projects hit with body:", req.body);
  next();
}, createProject);

// PUT update project
router.put("/:id", async (req, res, next) => {
  console.log(`✏️ PUT /api/projects/${req.params.id} hit with body:`, req.body);
  next();
}, updateProject);

// DELETE a project
router.delete("/:id", async (req, res, next) => {
  console.log(`🗑️ DELETE /api/projects/${req.params.id} hit`);
  next();
}, deleteProject);

export default router;