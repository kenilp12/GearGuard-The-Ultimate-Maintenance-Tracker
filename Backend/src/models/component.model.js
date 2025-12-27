import mongoose from "mongoose";

const componentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    equipmentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EquipmentCategory",
    },
    componentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ComponentCategory",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    usedBy: {
      type: String,
    },
    maintenanceType: {
      type: String,
      enum: ["Corrective", "Preventive"],
      default: "Corrective",
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignedDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    typeAsset: {
      type: String,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    startDate: {
      type: Date,
    },
    usedInAsset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
    },
    workOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkOrder",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Under Maintenance", "Retired"],
      default: "Active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Component", componentSchema);


