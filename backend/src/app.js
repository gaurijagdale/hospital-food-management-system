const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectToDB = require("../config/db");
connectToDB();
const PatientsRoutes = require("./routes/Patients.routes");
const PantryStaffRoutes = require("./routes/PantryStaff.routes");
const DietChartRoutes = require("./routes/DietCharts.routes");
const MealDeliveryRoutes = require("./routes/MealDelivery.routes");
const DeliveryPersonnelRoutes = require('./routes/DeliveryPersonnel.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: ["https://hospital-frontend-n7g0.onrender.com", "http://localhost:5173"], // Allow only these origins
  methods: "GET,POST,PUT,DELETE,OPTIONS", // Allowed HTTP methods
  credentials: true, // Include credentials if needed
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/patients", PatientsRoutes);
app.use("/api/pantrystaff", PantryStaffRoutes);
app.use("/api/dietcharts", DietChartRoutes);
app.use("/api/mealdelivery", MealDeliveryRoutes);
app.use("/api/deliverypersonnel", DeliveryPersonnelRoutes);


app.get("/", (req, res) => {
  res.send("fdlkfj;kajsf;klj");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
