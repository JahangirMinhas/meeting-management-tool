const Transcription = require("../models/transcriptionModel");

const getTranscriptions = async (req, res) => {
    try {
        const transcriptions = await Transcription.findAll();
        res.status(200).json({
            success: true,
            transcriptions,
        });
    } catch (error) {
        console.error("Error fetching transcriptions:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch transcriptions.",
        });
    }
};

module.exports = {getTranscriptions};