const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Transcription = sequelize.define("Transcription", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    audioUrl: {
        type: DataTypes.STRING,
        allowNull: true, // Optional, in case you want to store uploaded audio file URLs
    },
    transcriptionText: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Transcription;