import Asset from "../models/asset.model.js";
import WorkOrder from "../models/workOrder.model.js";

// CREATE ASSET
export const createAsset = async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    await asset.populate([
      { path: "company", select: "name" },
      { path: "createdBy", select: "name email" },
    ]);
    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ASSETS
export const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find()
      .populate("company", "name")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE ASSET
export const getAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await Asset.findById(id)
      .populate("company", "name")
      .populate("createdBy", "name email");
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ASSET
export const updateAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await Asset.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("company", "name");
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE ASSET
export const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await Asset.findByIdAndDelete(id);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    res.json({ message: "Asset deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  try {
    const totalAssets = await Asset.countDocuments();
    const totalWorkOrders = await WorkOrder.countDocuments();
    const openWorkOrders = await WorkOrder.countDocuments({
      status: { $in: ["Open", "In Progress"] },
    });

    res.json({
      totalAssets,
      totalWorkOrders,
      openWorkOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

