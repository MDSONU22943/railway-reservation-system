const express = require("express");
const trainRoutes = require("./routes/train.routes");

const app = express();
app.use(express.json());
app.use("/trains", trainRoutes);

module.exports = app;
