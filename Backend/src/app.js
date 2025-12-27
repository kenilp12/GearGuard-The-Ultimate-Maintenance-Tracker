import express from "express";
import userRoutes from "./routes/user.routes.js";
import maintenanceRoutes from "./routes/maintenance.routes.js"

const app = express();


app.use(express.json());





app.get("/", (req, res) => {
  res.send(`app is running on port ${process.env.PORT }`); 

});



//all routes
app.use("/api/users", userRoutes);
app.use("/api/maintenance", maintenanceRoutes);



export default app;
