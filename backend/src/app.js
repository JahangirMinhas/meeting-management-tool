const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const transcriptionRoutes = require("./routes/transcribe");
const app = express();

app.use(cors());
app.use(bodyParser.json());

//app.use("/api/transcriptions", transcriptionRoutes);

module.exports = app;