import express from "express";
import {
  createAsset,
  getAssets,
  getAsset,
  updateAsset,
  deleteAsset,
  getDashboardStats,
} from "../controllers/asset.controller.js";

const router = express.Router();

router.post("/", createAsset);
router.get("/", getAssets);
router.get("/stats", getDashboardStats);
router.get("/:id", getAsset);
router.put("/:id", updateAsset);
router.delete("/:id", deleteAsset);

export default router;


