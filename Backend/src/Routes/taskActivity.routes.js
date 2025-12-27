import express from "express";
import {
  createTaskActivity,
  getTaskActivities,
  getTaskActivity,
  updateTaskActivity,
  deleteTaskActivity,
  getMaintenanceSchedule,
} from "../controllers/taskActivity.controller.js";

const router = express.Router();

router.post("/", createTaskActivity);
router.get("/", getTaskActivities);
router.get("/schedule", getMaintenanceSchedule);
router.get("/:id", getTaskActivity);
router.put("/:id", updateTaskActivity);
router.delete("/:id", deleteTaskActivity);

export default router;


