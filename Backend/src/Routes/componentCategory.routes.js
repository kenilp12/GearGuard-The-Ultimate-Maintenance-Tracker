import express from "express";
import {
  createComponentCategory,
  getComponentCategories,
  getComponentCategory,
  updateComponentCategory,
  deleteComponentCategory,
} from "../controllers/componentCategory.controller.js";

const router = express.Router();

router.post("/", createComponentCategory);
router.get("/", getComponentCategories);
router.get("/:id", getComponentCategory);
router.put("/:id", updateComponentCategory);
router.delete("/:id", deleteComponentCategory);

export default router;


