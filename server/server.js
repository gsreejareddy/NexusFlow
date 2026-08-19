const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const telemetryRoutes = require("./routes/telemetryRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/telemetry", telemetryRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "NexusFlow API is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});