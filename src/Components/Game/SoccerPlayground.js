import React, { useEffect, useRef } from "react";

const SoccerPlayground = (props) => {
    const homeLines = props.homeLines;
    const awayLines = props.awayLines;
    const homeTeam = props.teams[0].home;
    const awayTeam = props.teams[1].away;
    const homeLogo = props.teams[0].homeLogo;
    const awayLogo = props.teams[1].awayLogo;
    console.log("homeLogo",homeLogo);
    console.log("awayLogo",awayLogo);
    

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
        <div>
            {/* <div className={`w-full flex flex-row`}>
                <div className="w-1/2 flex justify-start">
                    <img className="w-8 h-8 rounded" src={homeLogo} alt={homeTeam} />
                    <span className={`border-none`}>{homeTeam}</span>                    
                </div>
                <div className="w-1/2 flex justify-end">
                    <span className={`border-none`}>{awayTeam}</span> 
                    <img className="w-8 h-8 rounded" src={awayLogo} alt={awayTeam} />                                   
                </div> 
            </div>          */}
        <div className="relative w-[810px] h-[410x] m-auto bg-[#27ae60] border-5 border-solid border-white">            
             {/* Left half field */}
            <div className="absolute w-[50%] h-full left-0 flex justify-around">               
                {
                    homeLines.map((line,index)=>{
                        return(
                            <div key={index}>{line}</div>
                        )
                    })
                }
                {/* <img className={`absolute w-[60%] h-[60%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  opacity-50`} src={homeLogo} alt=""  /> */}
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
                 {/* <img className={`absolute w-[60%] h-[60%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  opacity-50`} src={awayLogo} alt=""  /> */}
            </div>
            <canvas width={800} height={400} ref={canvasRef}  />
        </div>
        </div>
        
    );
};

export default SoccerPlayground;
