import Component from "../models/component.model.js";

// CREATE COMPONENT
export const createComponent = async (req, res) => {
  try {
    const component = await Component.create(req.body);
    await component.populate([
      { path: "company", select: "name" },
      { path: "assignee", select: "name email" },
      { path: "employee", select: "name email" },
      { path: "equipmentCategory", select: "name" },
      { path: "componentCategory", select: "name" },
      { path: "usedInAsset", select: "assetName" },
      { path: "workOrder", select: "name" },
      { path: "createdBy", select: "name email" },
    ]);
    res.status(201).json(component);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL COMPONENTS
export const getComponents = async (req, res) => {
  try {
    const components = await Component.find()
      .populate("company", "name")
      .populate("assignee", "name email")
      .populate("employee", "name email")
      .populate("equipmentCategory", "name")
      .populate("componentCategory", "name")
      .populate("usedInAsset", "assetName")
      .populate("workOrder", "name")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(components);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE COMPONENT
export const getComponent = async (req, res) => {
  try {
    const { id } = req.params;
    const component = await Component.findById(id)
      .populate("company", "name")
      .populate("assignee", "name email")
      .populate("employee", "name email")
      .populate("equipmentCategory", "name")
      .populate("componentCategory", "name")
      .populate("usedInAsset", "assetName")
      .populate("workOrder", "name")
      .populate("createdBy", "name email");
    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.json(component);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE COMPONENT
export const updateComponent = async (req, res) => {
  try {
    const { id } = req.params;
    const component = await Component.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("company", "name")
      .populate("equipmentCategory", "name")
      .populate("componentCategory", "name");
    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.json(component);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE COMPONENT
export const deleteComponent = async (req, res) => {
  try {
    const { id } = req.params;
    const component = await Component.findByIdAndDelete(id);
    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.json({ message: "Component deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


