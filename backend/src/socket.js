const http = require("http");
const { Server } = require("socket.io");
const speechClient = require("./config/googleSpeechConfig");

module.exports = (app) => {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("New WebSocket connection established");

        let recognizeStream = null;

        socket.on("start_recording", () => {
            console.log("Recording started");

            recognizeStream = speechClient
                .streamingRecognize({
                    config: {
                        encoding: "WEBM_OPUS",
                        sampleRateHertz: 16000,
                        languageCode: "en-US",
                        interimResults: true, // Enable real-time transcription
                    },
                })
                .on("data", (data) => {
                    if (data.results[0]) {
                        const transcription = data.results[0].alternatives[0].transcript;
                        socket.emit("transcription", transcription); // Send transcription to client
                    }
                })
                .on("error", (error) => {
                    console.error("Speech recognition error:", error.message);
                })
                .on("end", () => {
                    console.log("Speech recognition stream ended");
                });
        });

        socket.on("audio_chunk", (chunk) => {
            if (recognizeStream) {
                recognizeStream.write(chunk);
            }
        });

        socket.on("end_recording", () => {
            console.log("Recording ended");
            if (recognizeStream) {
                recognizeStream.end();
                recognizeStream = null;
            }
        });

        socket.on("disconnect", () => {
            console.log("WebSocket disconnected");
            if (recognizeStream) {
                recognizeStream.end();
            }
        });
    });

    server.listen(4444, () => {
        console.log("Socket server running on port 4444");
    });
};