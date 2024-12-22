import { useState, useRef } from 'react';
import {toast} from "react-toastify";

export const useVoiceRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audio, setAudio] = useState(null);
    const audioChunksRef = useRef([]);
    const mediaRecorderRef = useRef(null);

    const startRecording = async () => {

        if (navigator.mediaDevices) {
            const constraints = {audio: true};
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            try {
                let mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;

                mediaRecorder.ondataavailable = (e) => {
                    audioChunksRef.current.push(e.data);
                };

                mediaRecorderRef.current.onstop = () => {
                    const blob = new Blob(audioChunksRef.current, {type: "audio/ogg"})
                    audioChunksRef.current = [];
                    setAudio(blob);
                };

                mediaRecorderRef.current.start();
            } catch (err) {
                toast.error(`Возникла ошибка ${err}`);
            }
        }

        setIsRecording(true);
    }

    const stopRecording = () => {


        mediaRecorderRef.current.stop();
        setIsRecording(false);
    }

    const cancelRecording = () => {

        mediaRecorderRef.current.onstop = () => {
            audioChunksRef.current = [];
        };

        mediaRecorderRef.current.stop();
        setAudio(null);
        setIsRecording(false);
    }

    return [startRecording, stopRecording, cancelRecording, isRecording, audio]
}
