//This component used to display team line up players in table, 
// as some old fixtures has no formation data provided, so we can't display them as playground lines 

import React, { useState } from 'react';

export default function PlayersTable(props) {

    const startingXI = props.startingXI;
    const players = props.players;

    return (
        <div>
            {/* Team's players */}
            {startingXI.map((player, index) => {
                return (
                    <div key={index} className="flex flex-row justify-between border-b border-solid border-slate-400">
                        <img className="size-6 sm:size-10" src={players?.filter(item => item.player.id === player.player.id)[0].player.photo} alt={player.player.name} />
                        <span className="flex space-x-3 border-none text-sm md:text-lg">
                            {player.player.number}&nbsp;&nbsp;{player.player.name}
                        </span>
                        <span className="border-none text-sm flex justify-center items-center">{
                            player.player.pos === 'D' ? 'Defender'
                                : player.player.pos === 'M' ? 'Midfielder'
                                    : player.player.pos === 'F' ? 'Forward'
                                        : player.player.pos === 'G' ? 'GoalKeeper'
                                            : null
                        }</span>
                    </div>
                );
            })}
        </div>
    )
}
