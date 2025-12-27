import mongoose from "mongoose";

const workOrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    equipmentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EquipmentCategory",
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
      type: String,
    },
    cost: {
      type: Number,
      default: 0,
    },
    time: {
      type: Number, // in hours
      default: 0,
    },
    alternativeInformation: {
      type: String,
    },
    costPerHour: {
      type: Number,
      default: 0,
    },
    capacityTaskEstimate: {
      type: Number,
    },
    costTarget: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Completed", "Closed"],
      default: "Open",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("WorkOrder", workOrderSchema);


