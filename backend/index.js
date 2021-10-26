const connectDB = require("./models/db");
require("dotenv").config();
const app = require("./app");
const path = require("path");
const PORT = process.env.PORT;
const express = require("express");
// const specializedHealthInformation = require("../backend-specializedHealthInformation/routers/specializedHealthInformation.routers");

// Connect Database
connectDB();

// app.use("/api", specializedHealthInformation.routes);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
