import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayerSeasons, getPlayerStats } from '../Api/getPlayerProfile.js';

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
    
    
    // function seasonsDropDownBox(){
    //     let seasonArr=[];
    //     for(let i=2012;i<2025;i++){
    //         seasonArr.push(i);
    //     }
    //     return seasonArr
    // }

    function playerStatsArr(leagueId){
        let arr=[]
        Object.entries(playerStats.statistics.filter(e=>e.league.id===leagueId)).map((elem)=>{
            elem.map((elem)=>{
                arr.push(elem);
            })
        })
        console.log("arr",arr);
        return  arr[1]
    }
   
    console.log("player stats",playerStats);
    console.log("league id",leagueId);
    return ( 
        <div>
            <div>
                <h2>{playerStats?.player?.name}</h2>
                <img src={playerStats?.player?.photo} alt={playerStats?.player?.name}/>
                <div>
                    <select onChange={(e)=>setSelectedSeason(parseInt(e.target.value))}>
                    {                        
                       playerSeasons?.map((item,index)=>{
                            return(
                                <option key={index} value={item}>{item}</option>
                            )
                        })            
                    }
                    </select>

                    <select onChange={(e)=>setLeagueId(parseInt(e.target.value))}> 
                    {
                        playerStats?.statistics?.map((item,index)=>{                  
                            return(                                
                                <option key={index}  value={item.league.id}><div>{item.league.name}</div></option>
                            )
                        })
                    }
                    </select>

                </div>                               
            </div>
            <div>
                {
                    playerStats?.statistics? 
                    playerStatsArr(leagueId)
                    // .filter(item=>item?.league?.id===leagueId)
                    .map((element,index) => {
                        return(
                            index > 3 ?
                            <div key={index}>
                                {
                                    index % 2 === 0 ?
                                    <p>{element[1][0].toUpperCase()+element[1].slice(1)}</p>
                                    :     
                                    element.map((elem,index)=>{
                                        return(
                                            Object.entries(elem).map((ele,index)=>{
                                                return(
                                                    <div key={index}> 
                                                    {
                                                        isNaN(ele[0]) ?
                                                        <>
                                                            <span>{ele[0][0].toUpperCase()+ele[0].slice(1)}</span>
                                                            {
                                                                ele[1] === null ?   <span>NA</span> :   <span>{ele[1]}</span>
                                                            }
                                                        </>
                                                        :null
                                                    }                                                                                                              
                                                    </div>                                                    
                                                )
                                                
                                            })
                                        )
                                    })
                                }
                            </div>
                            :null
                        )
                        
                    })
                    :null
                }
            </div>
            
        </div>
        
     );
}

export default Player;