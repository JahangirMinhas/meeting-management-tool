"use client";

import { useState, useEffect } from "react";
import MicIcon from "@mui/icons-material/MicRounded";
import io from "socket.io-client";

// Initialize the socket connection
const socket = io("http://localhost:4444");

export default function Home() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState(""); // Full transcription
    const [mediaRecorder, setMediaRecorder] = useState(null);

    useEffect(() => {
        // Listen for transcription updates from the server
        socket.on("transcription", (newWord) => {
            setTranscription((prev) => prev + " " + newWord); // Append the new word to the transcription
        });

        // Clean up on component unmount
        return () => {
            socket.off("transcription");
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

            socket.emit("start_recording");

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        socket.emit("audio_chunk", reader.result);
                    };
                    reader.readAsArrayBuffer(event.data);
                }
            };

            recorder.start(250);
            setMediaRecorder(recorder);
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
            socket.emit("end_recording");
        }
    };

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gray-100 font-semibold">
            <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`hover:bg-[#36f5b6] p-3 rounded-full h-20 w-20 text-white ${
                    isRecording ? "bg-red-500" : "bg-highlight"
                }`}
            >
                <MicIcon />
            </button>
            <span className="mt-4">
                {isRecording ? "Stop Recording" : "Start Recording"}
            </span>

            {/* Single Real-Time Transcription Display */}
            <div className="mt-6 bg-white shadow-md p-4 w-full max-w-2xl rounded-lg overflow-y-auto h-64">
                <h2 className="text-lg font-bold mb-2">Transcription:</h2>
                <p className="text-gray-800">{transcription || "No transcription yet..."}</p>
            </div>
        </div>
    );
}
