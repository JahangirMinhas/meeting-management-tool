const speech = require("@google-cloud/speech");

const serviceKey = "./src/config/key.json";

const speechClient = new speech.SpeechClient({
    keyFilename: serviceKey,
});

module.exports = speechClient;