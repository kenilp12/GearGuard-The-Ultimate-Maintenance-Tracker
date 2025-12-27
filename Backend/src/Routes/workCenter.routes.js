import express from "express";
import {
  createWorkCenter,
  getWorkCenters,
  getWorkCenter,
  updateWorkCenter,
  deleteWorkCenter,
  assignAssetToWorkCenter,
  removeAssetFromWorkCenter,
} from "../controllers/workCenter.controller.js";

const router = express.Router();

router.post("/", createWorkCenter);
router.get("/", getWorkCenters);
router.get("/:id", getWorkCenter);
router.put("/:id", updateWorkCenter);
router.delete("/:id", deleteWorkCenter);
router.post("/:id/assign-asset", assignAssetToWorkCenter);
router.delete("/:id/remove-asset/:assetId", removeAssetFromWorkCenter);

export default router;


