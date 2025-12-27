import express from "express";
import {
  createWorkOrder,
  getWorkOrders,
  getWorkOrder,
  updateWorkOrder,
  deleteWorkOrder,
} from "../controllers/workOrder.controller.js";

const router = express.Router();

router.post("/", createWorkOrder);
router.get("/", getWorkOrders);
router.get("/:id", getWorkOrder);
router.put("/:id", updateWorkOrder);
router.delete("/:id", deleteWorkOrder);

export default router;


