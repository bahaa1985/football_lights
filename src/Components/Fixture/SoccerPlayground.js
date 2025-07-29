import React, { useState, useEffect, memo } from 'react';

const SoccerPlayground = (props) => {
    const homeLines = props.homeLines;
    const awayLines = props.awayLines;

    return (
    <div className="relative w-full h-[680px] md:h-[850px] mx-auto border-2 bg-green-600 border-slate-50">
      {/* Outer Borders */}
      <div className="absolute top-0 left-0 w-full h-full"></div>

      {/* Center Line */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-500 transform -translate-y-1/2"></div>

      {/* Center Circle */}
      <div className="absolute top-1/2 left-1/2 w-[120px] h-[120px] border-2 border-slate-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

        
      {/* Top Half */}
      <div className="absolute top-0 left-0 w-full h-1/2">
        {/* Goal Area */}
        <div className="absolute top-0 left-1/2 w-[100px] h-[40px] border-2 border-slate-500 transform -translate-x-1/2"></div>

        {/* 18 Yard Area */}
        <div className="absolute top-0 left-1/2 w-[200px] h-24 border-2 border-slate-500 transform -translate-x-1/2"></div>
        <div className='w-full h-full flex flex-col justify-center'>
        {
            homeLines.length > 0 ?
            homeLines.map((line, index) => {
                return (
                    <div key={index} className={`${homeLines.length===4 ? 'h-[23%]' : 'h-[19%]'}`}>
                        {line}
                    </div>
                );
            })
            :'No data available'
        }
        </div>
        
      </div>

      {/* Bottom Half */}
      <div className="absolute bottom-0 left-0 w-full h-1/2">
        {/* Goal Area */}
        <div className="absolute bottom-0 left-1/2 w-[100px] h-[40px] border-2 border-slate-500 transform -translate-x-1/2"></div>

        {/* 18 Yard Area */}
        <div className="absolute bottom-0 left-1/2 w-[200px] h-24 border-2 border-slate-500 transform -translate-x-1/2"></div>
        <div className='w-full h-full flex flex-col justify-center'>
        {
            awayLines.length>0 ?
            awayLines.map((line, index) => {
                return (
                    <div key={index} className={`${awayLines.length===4 ? 'h-[23%]' : 'h-[19%]'}`}>
                        {line}
                    </div>
                );
            })
            :'No data available'
        }
        </div>
      </div>
    </div>
    );
};

export default memo(SoccerPlayground);