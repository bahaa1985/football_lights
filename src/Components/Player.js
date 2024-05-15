import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayerStats } from '../Api/getPlayerProfile.js';

function Player(props) {
    const season=props.season;
    const [playerStats,setPlayerStats]=useState([]); 
    const [index,setIndex]=useState(0);
    const params =useParams();
    
    useEffect(()=>{
        getPlayerStats(params.playerId,season)
        .then((result)=>{
            setPlayerStats(result.data.response[0]);
            // setLeagueId(result.data.response[0].statistics[0].league.id)
        });               
       
    },[params.playerId,season])   

    console.log("player",playerStats);   
    
    return ( 
        <div>
            <div>
                <h2>{playerStats?.player?.name}</h2>
                <img src={playerStats?.player?.photo} alt={playerStats?.player?.name}/>
                <select onSelect={(e)=>setIndex(e.target.value)}>
                {
                    playerStats?.statistics?.map((item,index)=>{                  
                        return(                                
                            <option key={index}  value={index}><div>{item.league.name}<img src={item.league.flag} alt={item.league.name}/></div></option>
                        )
                    })
                }
                </select>
               
            </div>
            <div>
                <div id="games">
                    <h4>Games</h4>
                    {
                        playerStats ?
                        <>
                            <p><span>Appearences</span><span>{playerStats?.statistics[index]?.games?.appearences}</span></p>
                            <p><span>Lineups</span><span>{playerStats?.statistics[index]?.games?.lineups}</span></p>
                            <p><span>Minutes</span><span>{playerStats?.statistics[index]?.games?.minutes}</span></p>
                            <p><span>Rating</span><span>{playerStats?.statistics[index]?.games?.rating}</span></p> 
                        </>
                        :null                        
                    }                
                                                                                                           
                </div>
                {/* <div id="substitutes">
                    <h4>Substitutes</h4>
                    <p><span>In</span><span>{playerStats?.statistics[0]?.substitutes?.in}</span></p>
                    <p><span>Out</span><span>{playerStats?.statistics[0]?.substitutes?.out}</span></p>
                    <p><span>Bench</span><span>{playerStats?.statistics[0]?.substitutes?.bench}</span></p>
                </div>
                <div id="substitutes">
                    <h4></h4>
                    <p><span></span><span>{playerStats?.statistics[0]}</span></p>
                    <p><span></span><span>{playerStats?.statistics[0]}</span></p>
                    <p><span></span><span>{playerStats?.statistics[0]}</span></p>
                </div> */}
            </div>
        </div>
     );
}

export default Player;