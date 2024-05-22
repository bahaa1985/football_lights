import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayerSeasons, getPlayerStats, getPlayerProfile } from '../Api/getPlayerProfile.js';

function Player(props) {
    const season=props.season;
    const [playerSeasons,setPlayerSeasons]=useState([]);
    const [playerStats,setPlayerStats]=useState([]); 
    const [leagueId,setLeagueId]=useState(0);
    const [selectedSeason,setSelectedSeason]=useState(season);
    const params =useParams();
    
    useEffect(()=>{

        getPlayerSeasons(params.playerId)
        .then((result)=>{
            setPlayerSeasons(result.data.response);
          
        })

        getPlayerStats(params.playerId,selectedSeason)
        .then((result)=>{
            setPlayerStats(result.data.response[0]);   
        });               
       
    },[params.playerId,selectedSeason])
    
    
    // function getPlayerStatistcis(leagueId){
    //     getPlayerProfile(params.playerId,selectedSeason,leagueId).then((result)=>
    //         setPlayerStats(result.data.response[0])
    //     )  
    // }

    // function playerStatsArr(leagueId){
    //     let arr=[]
    //     Object.entries(playerStats.statistics.filter(e=>e.league.id===leagueId)).map((elem)=>{
    //         elem.map((elem)=>{
    //             arr.push(elem);
    //         })
    //     })
    //     console.log("arr",arr);
    //     return  arr[1]
    // }
   
    // console.log("player stats",playerStats);
    // console.log("league id",leagueId);
    return ( 
        <div>
            <div>
                <h2>{playerStats?.player?.name}</h2>
                <img src={playerStats?.player?.photo} alt={playerStats?.player?.name}/>
                <div>
                    {/*seasons dropdown box when select a season then leagues dropdown box will be manipulated*/}
                    <select onChange={(e)=>setSelectedSeason(parseInt(e.target.value))} defaultValue={season}> 
                    {                        
                        playerSeasons?.map((item,index)=>{
                            return(
                                <option key={index} value={item}>{item}</option>
                            )
                        })            
                    }
                    </select>
                    {/* leagues dropdownbox */}
                    <select onChange={(e)=>setLeagueId(parseInt(e.target.value))}>  
                    {
                        playerStats?.statistics?.map((item,index)=>{                  
                            return(                                
                                <option key={index}  value={index}><div>{item.league.name}</div></option>
                            )
                        })
                    }
                    </select>

                </div>                               
            </div>
            <div>
                {                
                    playerStats?.statistics?
                    [<div>
                        <div> {/** team div */}
                            <p>
                                <span>Team</span><span> {playerStats.statistics[leagueId].team.name}</span>
                                <img src={playerStats.statistics[leagueId].team.logo} alt={playerStats.statistics[leagueId].team.name}/>
                            </p>                      
                        </div>
                        <div> {/** leaguw div */}
                            <p>
                                <img src={playerStats.statistics[leagueId].league.logo} alt={playerStats.statistics[leagueId].league.name} />
                                <span>Name</span><span> {playerStats.statistics[leagueId].league.name}</span>
                                
                            </p>
                            <p>
                                <span>Country</span>
                                <span>{playerStats.statistics[leagueId].league.country}</span> <img src={playerStats.statistics[leagueId].league.flag} alt={playerStats.statistics[leagueId].league.country} />                   
                            </p>                           
                        </div>
                    </div>,
                    Object.entries(playerStats.statistics[leagueId]).map((item,index)=>{
                        return(
                            <>
                            {
                                index>1 ?
                                // <div>
                                // <p key={index}>{item[0]}</p>
                            
                                //     {
                                //     Object.entries(item[1]).map((elem,index)=>{                                       
                                //         return(
                                //             Object.values(elem)[0] !== 'id' ?
                                //             <div>
                                //             <span>{Object.values(elem)[0][0].toUpperCase()+Object.values(elem)[0].slice(1)}</span>
                                //             {
                                //                 Object.values(elem)[1] === null ?
                                //                 <span>NA</span> :
                                //                 Object.values(elem)[0] === 'logo' ?
                                //                 <img src= {Object.values(elem)[1]} alt='NA'/>:
                                //                 <span>{Object.values(elem)[1]}</span>
                                //             }
                                //             </div>
                                //              :null
                                //         )                                       
                                //     })                        
                                //     }
                                // </div>
                                // :
                                <>
                                <p key={index}>{item[0]}</p>
                                <div>{
                                    Object.entries(item[1]).map((elem,index)=>{
                                        return(
                                            <div>
                                            <span>{Object.values(elem)[0][0].toUpperCase()+Object.values(elem)[0].slice(1)}</span>
                                            {
                                                Object.values(elem)[1] === null ?
                                                <span>NA</span> :
                                                <span>{Object.values(elem)[1]}</span>
                                            }
                                            </div>
                                        )
                                    })                        
                                }</div>
                                </>
                                :null
                            }
                           
                            </>
                        )
                    })
                    ]
                    :null
                }
            </div>
            
        </div>
        
     );
}

export default Player;