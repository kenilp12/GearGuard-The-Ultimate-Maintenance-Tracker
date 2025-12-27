import ComponentCategory from "../models/componentCategory.model.js";

// CREATE COMPONENT CATEGORY
export const createComponentCategory = async (req, res) => {
  try {
    const category = await ComponentCategory.create(req.body);
    await category.populate([
      { path: "responsible", select: "name email" },
      { path: "company", select: "name" },
    ]);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL COMPONENT CATEGORIES
export const getComponentCategories = async (req, res) => {
  try {
    const categories = await ComponentCategory.find()
      .populate("responsible", "name email")
      .populate("company", "name")
      .sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE COMPONENT CATEGORY
export const getComponentCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ComponentCategory.findById(id)
      .populate("responsible", "name email")
      .populate("company", "name");
    if (!category) {
      return res.status(404).json({ message: "Component category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE COMPONENT CATEGORY
export const updateComponentCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ComponentCategory.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("responsible", "name email")
      .populate("company", "name");
    if (!category) {
      return res.status(404).json({ message: "Component category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE COMPONENT CATEGORY
export const deleteComponentCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ComponentCategory.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Component category not found" });
    }
    res.json({ message: "Component category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


