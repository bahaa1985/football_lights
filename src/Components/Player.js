import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getPlayerInfo from '../Api/getPlayerInfo.js';

function Player(props) {
    const season=props.season;
    const [playerStats,setPlayerStats]=useState([]);
    const player_id =useParams();
    
    useEffect(()=>{
        getPlayerInfo(player_id,season)
        .then((result)=>{
            setPlayerStats(result.data.response[0]);
        })
    },[player_id,season])
   
    return ( 
        <div>
            <h2>{playerStats.player.name}</h2>
            <img src={playerStats.player.photo} alt={playerStats.player.name}/>
        </div>
     );
}

export default Player;