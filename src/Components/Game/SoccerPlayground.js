import React, { useEffect, useRef } from "react";

const SoccerPlayground = (props) => {
    const homeLines = props.homeLines;
    const awayLines = props.awayLines;

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = 800;
        canvas.height = 500;

        function drawField() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "white";
            ctx.lineWidth = 3;
            
            const fieldWidth = canvas.width;
            const fieldHeight = canvas.height;
            
            // Outer border
            ctx.strokeRect(5, 5, fieldWidth - 10, fieldHeight - 10);
            
            // Center line
            ctx.beginPath();
            ctx.moveTo(fieldWidth / 2, 5);
            ctx.lineTo(fieldWidth / 2, fieldHeight - 5);
            ctx.stroke();
            
            // Center circle
            const centerCircleRadius = 50;
            ctx.beginPath();
            ctx.arc(fieldWidth / 2, fieldHeight / 2, centerCircleRadius, 0, Math.PI * 2);
            ctx.stroke();
            
            // Penalty areas
            ctx.strokeRect(5, (fieldHeight / 2) - 80, 100, 160);
            ctx.strokeRect(fieldWidth - 105, (fieldHeight / 2) - 80, 100, 160);
            
            // Goal areas
            ctx.strokeRect(5, (fieldHeight / 2) - 30, 40, 60);
            ctx.strokeRect(fieldWidth - 45, (fieldHeight / 2) - 30, 40, 60);
            
            // Center spot
            ctx.beginPath();
            ctx.arc(fieldWidth / 2, fieldHeight / 2, 3, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();
        }

        drawField();
        }, []);

    return (
        <div className="relative w-[810px] h-[410x] m-auto bg-[#27ae60] border-5 border-solid border-white
         z-10">
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
            <canvas ref={canvasRef}  />
        </div>
    );
};

export default SoccerPlayground;
