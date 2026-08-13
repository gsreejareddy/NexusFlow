const mongoose = require("mongoose");

const telemetrySchema = new mongoose.Schema(
    {
        timestamp: {
            type: Date,
            required: true,
            default: Date.now
        },

        deviceId: {
            type: String,
            required: true
        },

        temperature: {
            type: Number,
            required: true
        },

        pressure: {
            type: Number,
            default: 0
        },

        vibration: {
            type: Number,
            default: 0
        }
    },
    {
        collection: "telemetry"
    }
);

module.exports = mongoose.model("Telemetry", telemetrySchema);