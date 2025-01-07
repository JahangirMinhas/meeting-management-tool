const speechClient = require("../config/googleSpeechConfig");

const transcribeAudio = async (audioContent) => {
    const request = {
        audio: { content: audioContent.toString("base64") },
        config: {
            encoding: "LINEAR16",
            sampleRateHertz: 16000,
            languageCode: "en-US",
        },
    };

    const [response] = await speechClient.recognize(request);
    const transcription = response.results
        .map((result) => result.alternatives[0].transcript)
        .join(" ");
    return transcription;
};
