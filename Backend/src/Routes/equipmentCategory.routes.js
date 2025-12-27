import express from "express";
import {
  createEquipmentCategory,
  getEquipmentCategories,
  getEquipmentCategory,
  updateEquipmentCategory,
  deleteEquipmentCategory,
} from "../controllers/equipmentCategory.controller.js";

const router = express.Router();

router.post("/", createEquipmentCategory);
router.get("/", getEquipmentCategories);
router.get("/:id", getEquipmentCategory);
router.put("/:id", updateEquipmentCategory);
router.delete("/:id", deleteEquipmentCategory);

export default router;


