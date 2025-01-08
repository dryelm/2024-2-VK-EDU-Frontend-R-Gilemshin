import {useState, useRef, useEffect} from 'react';
import styles from './styles.module.css';
import {Pause, PlayArrow} from "@mui/icons-material";

export function AudioPlayer({ src }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(null);
    const audioRef = useRef(null);

    const togglePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
            if (!duration) setDuration(audioRef.current.duration);
        }
    };

    const handleProgressChange = (event) => {
        const newProgress = event.target.value;
        if (audioRef.current) {
            audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;

            setProgress(newProgress);
        }
    };

    useEffect(() => {
        const ref = audioRef.current;

        return () => {
            if (ref) {
                ref.pause();
            }
        };
    }, []);
    return (
        <div className={styles.audioPlayer}>
            <button onClick={togglePlayPause} className={styles.playPauseButton}>
                {isPlaying ? <Pause/> : <PlayArrow/>}
            </button>
            <div className={styles.progressContainer}>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    className={styles.progressBar}
                />
                <div className={styles.time}>
                    <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                    {duration && <span>{formatTime(duration)}</span>}
                </div>
            </div>
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />
        </div>
    );
}

function formatTime(time) {
    const minutes = Math.floor(time / 60)
        .toString()
        .padStart(2, '0');
    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, '0');
    return `${minutes}:${seconds}`;
}