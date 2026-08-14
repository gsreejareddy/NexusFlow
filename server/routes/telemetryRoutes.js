const express = require("express");
const router = express.Router();

const Telemetry = require("../models/Telemetry");

router.post("/", async (req, res) => {
    try {
        const telemetry = await Telemetry.create(req.body);

        res.status(201).json({
            status: "success",
            message: "Telemetry data received",
            data: telemetry
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});

module.exports = router;