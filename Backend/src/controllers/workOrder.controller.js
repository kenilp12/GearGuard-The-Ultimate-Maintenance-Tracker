import WorkOrder from "../models/workOrder.model.js";

// CREATE WORK ORDER
export const createWorkOrder = async (req, res) => {
  try {
    const workOrder = await WorkOrder.create(req.body);
    await workOrder.populate([
      { path: "company", select: "name" },
      { path: "assignee", select: "name email" },
      { path: "employee", select: "name email" },
      { path: "equipmentCategory", select: "name" },
      { path: "usedInAsset", select: "assetName" },
    ]);
    res.status(201).json(workOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL WORK ORDERS
export const getWorkOrders = async (req, res) => {
  try {
    const workOrders = await WorkOrder.find()
      .populate("company", "name")
      .populate("assignee", "name email")
      .populate("employee", "name email")
      .populate("equipmentCategory", "name")
      .populate("usedInAsset", "assetName")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(workOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE WORK ORDER
export const getWorkOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const workOrder = await WorkOrder.findById(id)
      .populate("company", "name")
      .populate("assignee", "name email")
      .populate("employee", "name email")
      .populate("equipmentCategory", "name")
      .populate("usedInAsset", "assetName")
      .populate("createdBy", "name email");
    if (!workOrder) {
      return res.status(404).json({ message: "Work order not found" });
    }
    res.json(workOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE WORK ORDER
export const updateWorkOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const workOrder = await WorkOrder.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("company", "name")
      .populate("assignee", "name email")
      .populate("employee", "name email")
      .populate("equipmentCategory", "name")
      .populate("usedInAsset", "assetName");
    if (!workOrder) {
      return res.status(404).json({ message: "Work order not found" });
    }
    res.json(workOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE WORK ORDER
export const deleteWorkOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const workOrder = await WorkOrder.findByIdAndDelete(id);
    if (!workOrder) {
      return res.status(404).json({ message: "Work order not found" });
    }
    res.json({ message: "Work order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


