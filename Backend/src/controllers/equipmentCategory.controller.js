import EquipmentCategory from "../models/equipmentCategory.model.js";

// CREATE EQUIPMENT CATEGORY
export const createEquipmentCategory = async (req, res) => {
  try {
    const category = await EquipmentCategory.create(req.body);
    await category.populate([
      { path: "responsible", select: "name email" },
      { path: "company", select: "name" },
    ]);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL EQUIPMENT CATEGORIES
export const getEquipmentCategories = async (req, res) => {
  try {
    const categories = await EquipmentCategory.find()
      .populate("responsible", "name email")
      .populate("company", "name")
      .sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE EQUIPMENT CATEGORY
export const getEquipmentCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await EquipmentCategory.findById(id)
      .populate("responsible", "name email")
      .populate("company", "name");
    if (!category) {
      return res.status(404).json({ message: "Equipment category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE EQUIPMENT CATEGORY
export const updateEquipmentCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await EquipmentCategory.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("responsible", "name email")
      .populate("company", "name");
    if (!category) {
      return res.status(404).json({ message: "Equipment category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE EQUIPMENT CATEGORY
export const deleteEquipmentCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await EquipmentCategory.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Equipment category not found" });
    }
    res.json({ message: "Equipment category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


