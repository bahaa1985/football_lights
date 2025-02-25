import React, { useEffect, useRef } from "react";

const SoccerPlayground = (props) => {
    const homeLines = props.homeLines;
    const awayLines = props.awayLines;

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        function drawField() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "white";
            ctx.lineWidth = 3;
            
            // Outer border
            ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
            
            // Center line
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, 5);
            ctx.lineTo(canvas.width / 2, canvas.height - 5);
            ctx.stroke();
            
            // Center circle
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
            ctx.stroke();
            
            // Penalty areas
            ctx.strokeRect(5, (canvas.height / 2) - 80, 70, 160);
            ctx.strokeRect(canvas.width - 75, (canvas.height / 2) - 80, 70, 160);
            
            // Goal areas
            ctx.strokeRect(5, (canvas.height / 2) - 30, 20, 60);
            ctx.strokeRect(canvas.width - 25, (canvas.height / 2) - 30, 20, 60);
            
            // Center spot
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 3, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();
        }
        
        drawField();
    }, []);

    return (
        <div className="relative w-[810px] h-[410x] m-auto bg-[#27ae60] border-5 border-white
         xs:-rotate-[90deg] sm:rotate-[90deg]">
            <div className="absolute w-[50%] h-full left-0 flex justify-around">
                {/* Left half field */}
                {
                    homeLines.map((line,index)=>{
                        return(
                            <div key={index}>{line}</div>
                        )
                    })
                }
             
            </div>
            <div className="absolute w-[50%] h-full right-0 flex justify-around">
                {/* Right half field */}
                {
                    awayLines.map((line,index)=>{
                        return(
                            <div key={index}>{line}</div>
                        )
                    })
                }
            </div>
            <canvas ref={canvasRef} width={800} height={400} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }} />
        </div>
    );
};

export default SoccerPlayground;
