import React, { useRef, useState, useEffect } from 'react';
import './AudioDemo.css';

function AudioDemo() {
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContext = useRef(new (window.AudioContext || window.webkitAudioContext)());
    const analyser = useRef(audioContext.current.createAnalyser());
    const source = useRef(null);

    const playAudio = () => {
        if (!audioContext.current.state || audioContext.current.state === "suspended") {
            audioContext.current.resume();
        }
    
        if (audioRef.current) {
            if (!source.current) {
                source.current = audioContext.current.createMediaElementSource(audioRef.current);
                source.current.connect(analyser.current);
                analyser.current.connect(audioContext.current.destination);
                visualizeAudio();
            }
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    

    const visualizeAudio = () => {
        analyser.current.fftSize = 2048;
        const bufferLength = analyser.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
    
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
    
        function draw() {
            requestAnimationFrame(draw);
            
            // Clear the canvas
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            
            analyser.current.getByteTimeDomainData(dataArray);
            
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'white'; // Line color
        
            ctx.beginPath();
            const sliceWidth = WIDTH * 1.0 / bufferLength;
            let x = 0;
        
            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0; // Normalize to [0, 2]
                const y = HEIGHT - (v - 1) * HEIGHT / 2; // Position the waveform at the bottom
        
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
        
                x += sliceWidth;
            }
        
            ctx.lineTo(WIDTH, HEIGHT / 2);
            ctx.stroke();
        }
        
        draw();
    };

    return (
        <div className="audio-demo-container">
            <img src="/MeetLucy.png" alt="Qsic Logo" className="qsic-logo" />
            <div className="play-button" onClick={playAudio}>
                {isPlaying ? (
                    <div className="pause-icon"></div>
                ) : (
                    <div className="play-icon"></div>
                )}
            </div>
            <canvas ref={canvasRef} className="audio-visualizer"></canvas>
            <div className="cta">
                Interested in Lucy? <a href="/contact_link" className="cta-link">Contact us for a demo</a>
            </div>
            <audio ref={audioRef} src="/lucy-demo.wav"></audio>
        </div>
    );
}

export default AudioDemo;
