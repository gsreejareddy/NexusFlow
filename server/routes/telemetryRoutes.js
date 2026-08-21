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

router.get("/", async (req, res) => {
    try {
        const telemetry = await Telemetry
            .find()
            .sort({ timestamp: -1 });

        res.status(200).json({
            status: "success",
            count: telemetry.length,
            data: telemetry
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});
router.get("/filter", async (req, res) => {
    try {
        const telemetry = await Telemetry
            .find({ deviceId: req.query.deviceId })
            .sort({ timestamp: -1 });

        res.status(200).json({
            status: "success",
            deviceId: req.query.deviceId,
            count: telemetry.length,
            data: telemetry
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});
router.get("/:deviceId", async (req, res) => {
    try {
        const telemetry = await Telemetry
            .find({ deviceId: req.params.deviceId })
            .sort({ timestamp: -1 });

        res.status(200).json({
            status: "success",
            deviceId: req.params.deviceId,
            count: telemetry.length,
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