// import React, { useRef } from 'react';
// import './AudioDemo.css';

// function AudioDemo() {
//     const audioRef = useRef(null);
//     const canvasRef = useRef(null);
//     let audioContext, analyser, dataArray, bufferLength, source;

//     const playAudio = () => {
//         if (audioRef.current) {
//             if (!audioContext) {
//                 visualizeAudio();
//             }
//             audioRef.current.play();
//         }
//     };

//     const visualizeAudio = () => {
//         audioContext = new (window.AudioContext || window.webkitAudioContext)();
//         analyser = audioContext.createAnalyser();
//         if (!source) { // Check if source is already defined
//             source = audioContext.createMediaElementSource(audioRef.current);
//             source.connect(analyser);
//             analyser.connect(audioContext.destination);
//         }
//         analyser.fftSize = 256;
//         bufferLength = analyser.frequencyBinCount;
//         dataArray = new Uint8Array(bufferLength);

//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");
//         const WIDTH = canvas.width;
//         const HEIGHT = canvas.height;



//         function draw() {
//             requestAnimationFrame(draw);
//             analyser.getByteFrequencyData(dataArray);
//             ctx.clearRect(0, 0, WIDTH, HEIGHT); // Clear the canvas for each frame
//             const barWidth = WIDTH / bufferLength;
//             let barHeight;
//             let x = 0;
        
//             for (let i = 0; i < bufferLength; i++) {
//                 barHeight = (dataArray[i] / 255) * HEIGHT; // Adjusted scaling
        
//                 ctx.fillStyle = 'white'; // Set bars to white
//                 ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
//                 x += barWidth;
//             }
//         }
        

//         draw();
//     };

//     return (
//         <div className="audio-demo-container">
//             <img src="/qsic-logo.png" alt="Qsic Logo" className="qsic-logo" />
//             <div className="play-button" onClick={playAudio}>
//             </div>
//             <canvas ref={canvasRef} className="audio-visualizer"></canvas>
//             <div className="cta">
//                 Interested in Lucy? <a href="/contact_link" className="cta-link">Contact us for a demo</a>
//             </div>
//             <audio ref={audioRef} src="/lucy-demo.wav"></audio>
//         </div>
//     );
// }

// export default AudioDemo;





// // src/AudioDemo.js

// import React, { useRef, useEffect } from 'react';
// import './AudioDemo.css';

// function AudioDemo() {
//     let source;
//     const audioRef = useRef(null);
//     const canvasRef = useRef(null);
//     let audioContext, analyser, dataArray, bufferLength;

//     const playAudio = () => {
//         if (audioRef.current) {
//             if (!audioContext) {
//                 visualizeAudio();
//             }
//             audioRef.current.play();
//         }
//     };

//     const visualizeAudio = () => {
//         audioContext = new (window.AudioContext || window.webkitAudioContext)();
//         analyser = audioContext.createAnalyser();
//         const source = audioContext.createMediaElementSource(audioRef.current);
//         source.connect(analyser);
//         analyser.connect(audioContext.destination);
//         analyser.fftSize = 256;
//         bufferLength = analyser.frequencyBinCount;
//         dataArray = new Uint8Array(bufferLength);
        
// 	const devicePixelRatio = window.devicePixelRatio || 1;
// 	canvas.width = WIDTH * devicePixelRatio;
// 	canvas.height = HEIGHT * devicePixelRatio;
// 	ctx.scale(devicePixelRatio, devicePixelRatio);

//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");
//         const WIDTH = canvas.width;
//         const HEIGHT = canvas.height;
// 	function draw() {
// 	    requestAnimationFrame(draw);
// 	    analyser.getByteFrequencyData(dataArray);
// 	    ctx.clearRect(0, 0, WIDTH, HEIGHT); // Clear the canvas for each frame
// 	    const barWidth = WIDTH / bufferLength;
// 	    let barHeight;
// 	    let x = 0;

// 	    for (let i = 0; i < bufferLength; i++) {
// 		barHeight = (dataArray[i] / 255) * HEIGHT; // Adjusted scaling

// 		// Create a gradient color for the bars
// 		const gradient = ctx.createLinearGradient(0, HEIGHT, 0, HEIGHT - barHeight);
// 		gradient.addColorStop(0, '#FFC0CB'); // Light Pink at the top
// 		gradient.addColorStop(1, '#D8BFD8'); // Light Purple at the bottom

// 		ctx.fillStyle = gradient;
// 		ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
// 		x += barWidth;
// 	    }
// 	}

    	


//         draw();
//     };

//     return (
//         <div className="audio-demo-container">
//             <img src="/qsic-logo.png" alt="Qsic Logo" className="qsic-logo" />
//             <div className="play-button" onClick={playAudio}>
//             </div>
//             <canvas ref={canvasRef} className="audio-visualizer"></canvas>
//             <div className="cta">
//                 Interested in Lucy? <a href="/contact_link" className="cta-link">Contact us for a demo</a>
//             </div>
//             <audio ref={audioRef} src="/lucy-demo.wav"></audio>
//         </div>
//     );
// }

// export default AudioDemo;
import React, { useRef } from 'react';
import './AudioDemo.css';

function AudioDemo() {
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    let audioContext, analyser, dataArray, bufferLength, source;

    const playAudio = () => {
        if (audioRef.current) {
            if (!audioContext) {
                visualizeAudio();
            }
            audioRef.current.play();
        }
    };

    const visualizeAudio = () => {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        if (!source) {
            source = audioContext.createMediaElementSource(audioRef.current);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
        }
        analyser.fftSize = 256;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = WIDTH * devicePixelRatio;
        canvas.height = HEIGHT * devicePixelRatio;
        ctx.scale(devicePixelRatio, devicePixelRatio);

        function draw() {
            requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            
            const barWidth = (WIDTH / bufferLength) * 0.5; // Increased width
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = (dataArray[i] / 255) * HEIGHT;

                ctx.fillStyle = 'white';
                ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
                
                x += barWidth + 1; // Added spacing between bars
            }
        }

        draw();
    };

    return (
        <div className="audio-demo-container">
            <img src="/qsic-logo.png" alt="Qsic Logo" className="qsic-logo" />
            <div className="play-button" onClick={playAudio}>
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
