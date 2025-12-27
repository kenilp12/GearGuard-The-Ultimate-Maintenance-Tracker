import WorkCenter from "../models/workCenter.model.js";

// CREATE WORK CENTER
export const createWorkCenter = async (req, res) => {
  try {
    const workCenter = await WorkCenter.create(req.body);
    await workCenter.populate([
      { path: "company", select: "name" },
      { path: "assignedAssets", select: "assetName" },
      { path: "createdBy", select: "name email" },
    ]);
    res.status(201).json(workCenter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL WORK CENTERS
export const getWorkCenters = async (req, res) => {
  try {
    const workCenters = await WorkCenter.find()
      .populate("company", "name")
      .populate("assignedAssets", "assetName")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(workCenters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE WORK CENTER
export const getWorkCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const workCenter = await WorkCenter.findById(id)
      .populate("company", "name")
      .populate("assignedAssets", "assetName")
      .populate("createdBy", "name email");
    if (!workCenter) {
      return res.status(404).json({ message: "Work center not found" });
    }
    res.json(workCenter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE WORK CENTER
export const updateWorkCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const workCenter = await WorkCenter.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("company", "name")
      .populate("assignedAssets", "assetName");
    if (!workCenter) {
      return res.status(404).json({ message: "Work center not found" });
    }
    res.json(workCenter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE WORK CENTER
export const deleteWorkCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const workCenter = await WorkCenter.findByIdAndDelete(id);
    if (!workCenter) {
      return res.status(404).json({ message: "Work center not found" });
    }
    res.json({ message: "Work center deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ASSIGN ASSET TO WORK CENTER
export const assignAssetToWorkCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const { assetId } = req.body;
    const workCenter = await WorkCenter.findById(id);
    if (!workCenter) {
      return res.status(404).json({ message: "Work center not found" });
    }
    if (!workCenter.assignedAssets.includes(assetId)) {
      workCenter.assignedAssets.push(assetId);
      await workCenter.save();
    }
    await workCenter.populate("assignedAssets", "assetName");
    res.json(workCenter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REMOVE ASSET FROM WORK CENTER
export const removeAssetFromWorkCenter = async (req, res) => {
  try {
    const { id, assetId } = req.params;
    const workCenter = await WorkCenter.findById(id);
    if (!workCenter) {
      return res.status(404).json({ message: "Work center not found" });
    }
    workCenter.assignedAssets = workCenter.assignedAssets.filter(
      (asset) => asset.toString() !== assetId
    );
    await workCenter.save();
    await workCenter.populate("assignedAssets", "assetName");
    res.json(workCenter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


