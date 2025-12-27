import express from "express";
import {
  createComponent,
  getComponents,
  getComponent,
  updateComponent,
  deleteComponent,
} from "../controllers/component.controller.js";

const router = express.Router();

router.post("/", createComponent);
router.get("/", getComponents);
router.get("/:id", getComponent);
router.put("/:id", updateComponent);
router.delete("/:id", deleteComponent);

export default router;


