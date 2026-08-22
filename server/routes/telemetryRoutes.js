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
        const { deviceId } = req.query;

        if (!deviceId) {
            return res.status(400).json({
                status: "error",
                message: "deviceId is required"
            });
        }

        const telemetry = await Telemetry
            .find({ deviceId })
            .sort({ timestamp: -1 });

        res.status(200).json({
            status: "success",
            deviceId,
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