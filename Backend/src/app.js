import express from "express";
import userRoutes from "./routes/user.routes.js";
import maintenanceRoutes from "./routes/maintenance.routes.js";
import workOrderRoutes from "./routes/workOrder.routes.js";
import assetRoutes from "./routes/asset.routes.js";
import componentRoutes from "./routes/component.routes.js";
import equipmentCategoryRoutes from "./routes/equipmentCategory.routes.js";
import componentCategoryRoutes from "./routes/componentCategory.routes.js";
import taskActivityRoutes from "./routes/taskActivity.routes.js";
import workCenterRoutes from "./routes/workCenter.routes.js";
import companyRoutes from "./routes/company.routes.js";

const app = express();

// CORS configuration - FULLY OPEN for testing (no restrictions at all)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
  res.header('Access-Control-Expose-Headers', '*');
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`app is running on port ${process.env.PORT}`); 
});

//all routes
app.use("/api/users", userRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/work-orders", workOrderRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/components", componentRoutes);
app.use("/api/equipment-categories", equipmentCategoryRoutes);
app.use("/api/component-categories", componentCategoryRoutes);
app.use("/api/task-activities", taskActivityRoutes);
app.use("/api/work-centers", workCenterRoutes);
app.use("/api/companies", companyRoutes);



export default app;
