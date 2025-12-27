import mongoose from "mongoose";

const taskActivitySchema = new mongoose.Schema(
  {
    taskActivity: {
      type: String,
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    duration: {
      type: Number, // in hours
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    maintenanceType: {
      type: String,
      enum: ["Corrective", "Preventive"],
      default: "Corrective",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
    },
    workCenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkCenter",
    },
    workOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkOrder",
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TaskActivity", taskActivitySchema);


