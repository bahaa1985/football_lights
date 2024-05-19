import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayerStats } from '../Api/getPlayerProfile.js';

function Player(props) {
    const season=props.season;
    const [playerStats,setPlayerStats]=useState([]); 
    const [seasonIndex,setSeasonIndex]=useState(0);
    const [selectedSeason,setSelectedSeason]=useState(0);
    const params =useParams();
    
    useEffect(()=>{
        getPlayerStats(params.playerId,season)
        .then((result)=>{
            setPlayerStats(result.data.response[0]);   
        });               
       
    },[params.playerId,season])   

    function playerStatsArr(seasonIndex){
        let arr=[]
        Object.entries(playerStats.statistics[seasonIndex]).map((elem)=>{
            elem.map((elem)=>{
                arr.push(elem);
            })
        })
        return  arr
    }
    let seasonArr=[];
    return ( 
        <div>
            <div>
                <h2>{playerStats?.player?.name}</h2>
                <img src={playerStats?.player?.photo} alt={playerStats?.player?.name}/>
                <div>
                <select onChange={(e)=>setSelectedSeason(parseInt(e.target.value))}>
                {[
                        playerStats?.statistics?.map((item,index)=>{
                        seasonArr.push(item.league.season)
                    })
                    ,
                    playerStats?.statistics?.map((item,index)=>{                  
                        return(                                
                            <option key={index}  value={index}><div>{item.league.season}</div></option>
                        )
                    })]
                }
                </select>
                <select onChange={(e)=>setSeasonIndex(parseInt(e.target.value))}>
                {
                    playerStats?.statistics?.filter(stat=>stat.league.season===selectedSeason).map((item,index)=>{                  
                        return(                                
                            <option key={index}  value={index}><div>{item.league.name}<img src={item.league.flag} alt={item.league.name}/></div></option>
                        )
                    })
                }
                </select>
                </div>
                
               
            </div>
            <div>
                {
                    playerStats?.statistics? 
                    Object.entries(playerStatsArr(seasonIndex)).map((element,index) => {
                        return(
                            index > 3 ?
                            <div key={index}>
                                {
                                    index % 2 === 0 ?
                                    <p>{element[1][0].toUpperCase()+element[1].slice(1)}</p>
                                    : 
                                    <div>
                                        {
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