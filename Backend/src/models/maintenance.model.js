import mongoose from "mongoose";

const maintenanceRequestSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    maintenanceFor: {
      type: String, // e.g., Equipment
      required: true,
    },

    equipment: {
      type: String,
      required: true,
    },

    category: {
      type: String,
    },

    requestDate: {
      type: Date,
      default: Date.now,
    },

    maintenanceType: {
      type: String,
      enum: ["Corrective", "Preventive"],
      default: "Corrective",
    },

    team: {
      type: String,
    },

    technician: {
      type: String, // Can also link to User if desired
    },

    scheduledDate: {
      type: Date,
    },

    duration: {
      type: String,
    },

    priority: {
      type: Number,
      enum: [1, 2, 3],
      default: 2,
    },

    company: {
      type: String,
    },

    status: {
      type: String,
      enum: ["New Request", "In Progress", "Repaired", "Scrap"],
      default: "New Request",
    },

    notes: {
      type: String,
    },

    instructions: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MaintenanceRequest", maintenanceRequestSchema);
