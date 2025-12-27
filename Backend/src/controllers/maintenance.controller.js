import MaintenanceRequest from "../models/maintenance.model.js";

// CREATE REQUEST
export const createRequest = async (req, res) => {
  try {
    const request = await MaintenanceRequest.create(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET ALL REQUESTS
export const getRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find().populate("createdBy", "name email role");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE REQUEST STATUS
export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const request = await MaintenanceRequest.findByIdAndUpdate(id, { status }, { new: true });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
