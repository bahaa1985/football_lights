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
                   
        });               
       
    },[params.playerId,season])   
    
    console.log("player",playerStats);


    return ( 
        <div>
            <div>
                <h2>{playerStats?.player?.name}</h2>
                <img src={playerStats?.player?.photo} alt={playerStats?.player?.name}/>
                <select onChange={(e)=>setIndex(parseInt(e.target.value))}>
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
                        playerStats.statistics?
                        <>
                        <p><span>Appearences</span><span>{playerStats.statistics[index].games.appearences}</span></p>
                        <p><span>Lineups</span><span>{playerStats?.statistics[index]?.games?.lineups}</span></p>
                        <p><span>Minutes</span><span>{playerStats?.statistics[index]?.games?.minutes}</span></p>
                        <p><span>Rating</span><span>{playerStats?.statistics[index]?.games?.rating}</span></p> 
                        </>
                        :null
                    }
                                                           
                                                                                                           
                </div>
                <div id="substitutes">
                    <h4>Substitutes</h4>
                    {                        
                        playerStats.statistics?
                        <>
                            <p><span>In</span><span>{playerStats?.statistics[index]?.substitutes?.in}</span></p>
                            <p><span>Out</span><span>{playerStats?.statistics[index]?.substitutes?.out}</span></p>
                            <p><span>Bench</span><span>{playerStats?.statistics[index]?.substitutes?.bench}</span></p>
                        </>
                        :null
                    }
                   
                </div>
                <div id="Shots">                 
                    <h4>Shots</h4>
                    {                        
                        playerStats.statistics?
                        <>
                            <p><span>Total</span><span>{playerStats?.statistics[index]?.shots?.total}</span></p>
                            <p><span>on</span><span>{playerStats?.statistics[index]?.shots?.on}</span></p>                        
                        </>
                        :null
                    }
                </div>
                <div id="Goals">
                    <h4>Goals</h4>
                    {                        
                        playerStats.statistics?
                        <>
                            <p><span>Total</span><span>{playerStats.statistics[index].goals.total}</span></p>
                            <p><span>Conceded</span><span>{playerStats.statistics[index].goals.conceded}</span></p>                        
                            <p><span>Assists</span><span>{playerStats.statistics[index].goals.assists}</span></p>
                            <p><span>Saves</span><span>{playerStats.statistics[index].goals.saves}</span></p>
                        </>
                        :null
                    }
                </div>
                <div id="passes">
                    <h4>Passes</h4>
                    {
                        playerStats.statistics?
                        <>
                            <p><span>Total</span><span>{playerStats.statistics[index].passes.total}</span></p>
                            <p><span>Key</span><span>{playerStats.statistics[index].passes.key}</span></p>
                            <p><span>Accuracy</span><span>{playerStats.statistics[index].passes?.accuracy}</span></p>                         
                        </>
                        :null
                    }
                </div>
                <div id="tackles">
                    <h4>Tackles</h4>
                    {
                        playerStats.statistics?
                        <>
                            <p><span>Total</span><span>{playerStats.statistics[index].tackles.total}</span></p>
                            <p><span>Blocks</span><span>{playerStats.statistics[index].tackles.blocks}</span></p>
                            <p><span>Interceptions</span><span>{playerStats.statistics[index].tackles.interceptions}</span></p>
                        </>
                        :null
                    }

                </div>
                <div>
                    <h4>Duels</h4>
                    {
                        playerStats.statistics?
                        <>
                            <p>{playerStats.statistics[index].duels}</p>
                        </>
                        :null
                    }
                </div>
            </div>
        </div>
     );
}

export default Player;