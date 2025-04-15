// controllers/projectController.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.ADMIN_DB_HOST,
  user: process.env.ADMIN_DB_USER,
  password: process.env.ADMIN_DB_PASSWORD,
  database: process.env.ADMIN_DB_NAME,
};

// GET all projects
export const getProjects = async (req, res) => {
  try {
    const db = await mysql.createConnection(dbConfig);
    const [projects] = await db.execute("SELECT * FROM projects ORDER BY id DESC");
    await db.end();

    res.status(200).json(projects);
  } catch (err) {
    console.error("❌ Error fetching projects:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST a new project
export const addProject = async (req, res) => {
  const { title, location, image, description } = req.body;

  if (!title || !location || !image || !description) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const db = await mysql.createConnection(dbConfig);
    await db.execute(
      `INSERT INTO projects (title, location, image, description)
       VALUES (?, ?, ?, ?)`,
      [title, location, image, description]
    );
    await db.end();

    res.status(201).json({ message: "Project added successfully" });
  } catch (err) {
    console.error("❌ Error adding project:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT to update an existing project
export const updateProject = async (req, res) => {
  const projectId = req.params.id;
  const { title, location, image, description } = req.body;

  if (!title || !location || !image || !description) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const db = await mysql.createConnection(dbConfig);
    const [result] = await db.execute(
      `UPDATE projects SET title = ?, location = ?, image = ?, description = ?, updated_at = NOW()
       WHERE id = ?`,
      [title, location, image, description, projectId]
    );
    await db.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Project updated successfully" });
  } catch (err) {
    console.error("❌ Error updating project:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE a project
export const deleteProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    const db = await mysql.createConnection(dbConfig);
    const [result] = await db.execute(
      `DELETE FROM projects WHERE id = ?`,
      [projectId]
    );
    await db.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting project:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};