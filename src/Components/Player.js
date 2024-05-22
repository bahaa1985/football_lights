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
                    <select onChange={(e)=>setSelectedSeason(parseInt(e.target.value))}> 
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
                    // playerStats?.statistics? 
                    // Object.entries(playerStats.statistics[leagueId]).map((element,index) => {
                    //     return(
                    //         index > 3 ?
                    //         <div key={index}>
                    //             {
                    //                 index % 2 === 0 ?
                    //                 <p>{element[1][0].toUpperCase()+element[1].slice(1)}</p>
                    //                 :     
                    //                 element.map((elem,index)=>{
                    //                     return(
                    //                         Object.entries(elem).map((ele,index)=>{
                    //                             return(
                    //                                 <div key={index}> 
                    //                                 {
                    //                                     isNaN(ele[0]) ?
                    //                                     <>
                    //                                         <span>{ele[0][0].toUpperCase()+ele[0].slice(1)}</span>
                    //                                         {
                    //                                             ele[1] === null ?   <span>NA</span> :   <span>{ele[1]}</span>
                    //                                         }
                    //                                     </>
                    //                                     :null
                    //                                 }                                                                                                              
                    //                                 </div>                                                    
                    //                             )
                                                
                    //                         })
                    //                     )
                    //                 })
                    //             }
                    //         </div>
                    //         :null
                    //     )
                        
                    // })
                    // :null
                    playerStats?.statistics?
                    [
                    Object.entries(playerStats.statistics[leagueId]).map((item,index)=>{
                        return(
                        // console.log("item",item)
                        <>
                        <p key={index}>{item[0]}</p>
                        <p>{
                            Object.entries(item[1]).map((elem,index)=>{
                                return(
                                    <p>{Object.keys(elem)[1][index]}</p>
                                )
                            })
                            // Object.keys(item[1]).map((item,index)=>{
                            //     return(
                            //         <>
                            //             <span>{item}</span>
                            //             <span>{Object.values(item[1][index])}</span>
                            //         </>
                            //     )
                            // })
                            // [console.log("item branch",item[1]),
                            // <>
                            // <span>{Object.keys(item[1])}</span> 
                            // <span>{Object.values(item[1])}</span>
                            // </>   
                        // ]
                            }</p>
                        </>
                    )
                    })]
                    :null
                }
            </div>
            
        </div>
        
     );
}

export default Player;