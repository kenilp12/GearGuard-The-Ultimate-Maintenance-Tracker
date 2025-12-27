import TaskActivity from "../models/taskActivity.model.js";

// CREATE TASK ACTIVITY
export const createTaskActivity = async (req, res) => {
  try {
    const taskActivity = await TaskActivity.create(req.body);
    await taskActivity.populate([
      { path: "assignedBy", select: "name email" },
      { path: "performedBy", select: "name email" },
      { path: "company", select: "name" },
      { path: "asset", select: "assetName" },
      { path: "workCenter", select: "name" },
      { path: "workOrder", select: "name" },
    ]);
    res.status(201).json(taskActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL TASK ACTIVITIES
export const getTaskActivities = async (req, res) => {
  try {
    const taskActivities = await TaskActivity.find()
      .populate("assignedBy", "name email")
      .populate("performedBy", "name email")
      .populate("company", "name")
      .populate("asset", "assetName")
      .populate("workCenter", "name")
      .populate("workOrder", "name")
      .sort({ createdAt: -1 });
    res.json(taskActivities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE TASK ACTIVITY
export const getTaskActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const taskActivity = await TaskActivity.findById(id)
      .populate("assignedBy", "name email")
      .populate("performedBy", "name email")
      .populate("company", "name")
      .populate("asset", "assetName")
      .populate("workCenter", "name")
      .populate("workOrder", "name");
    if (!taskActivity) {
      return res.status(404).json({ message: "Task activity not found" });
    }
    res.json(taskActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TASK ACTIVITY
export const updateTaskActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const taskActivity = await TaskActivity.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("assignedBy", "name email")
      .populate("performedBy", "name email")
      .populate("company", "name")
      .populate("asset", "assetName")
      .populate("workCenter", "name")
      .populate("workOrder", "name");
    if (!taskActivity) {
      return res.status(404).json({ message: "Task activity not found" });
    }
    res.json(taskActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TASK ACTIVITY
export const deleteTaskActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const taskActivity = await TaskActivity.findByIdAndDelete(id);
    if (!taskActivity) {
      return res.status(404).json({ message: "Task activity not found" });
    }
    res.json({ message: "Task activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MAINTENANCE SCHEDULE (for report)
export const getMaintenanceSchedule = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};
    
    if (startDate && endDate) {
      query.startDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const schedule = await TaskActivity.find(query)
      .populate("asset", "assetName assetCategory")
      .populate("workOrder", "name")
      .populate("performedBy", "name")
      .sort({ startDate: 1 });

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


