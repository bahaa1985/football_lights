import React, { memo } from "react";
import getStatistics from "../../Api/getStatistics.js";
import getPlayers from "../../Api/getPlayers.js";
import PlayerStats from "./PlayerStats.js";
import { useState,useMemo } from "react";

function Statistics(props){

    const fixtureId=props.fixtureId

    const [homeStatistics,setHomeStatistics]=useState([]); 
    const [homePlayers, setHomePlayers] = useState([]);
    const [awayPlayers, setAwayPlayers] = useState([]);   
    const [awayStatistics,setAwayStatistics]=useState([]);
    const [isLoaded,setLoaded] = useState(false);

    useMemo(()=>{
        async function fetchStatistics() {
            const stats_response = await getStatistics(fixtureId);
            const players_response = await getPlayers(fixtureId);
            //
            setHomeStatistics(stats_response.data.response[0].statistics);
            setAwayStatistics(stats_response.data.response[1].statistics);
            //
            setHomePlayers(players_response.data.response[0].players);
            setAwayPlayers(players_response.data.response[1].players);
            //
            setLoaded(true);
        }
        fetchStatistics();                 
    },[fixtureId])

    let total=0;

    return(
         
        <div style={{width:'90%',height: 'auto',margin:'auto',textAlign: 'center'}}>                                                      
        {
            isLoaded ?
            [
            homeStatistics?.map((item,index)=>{
                return (item.value === null ? item.value = 0 : null)
            }),
            awayStatistics?.map((item,index)=>{
                return (item.value === null ? item.value = 0 : null)
            }),
            
            homeStatistics?.map((item,index)=>{
                               
                total=Number.parseInt(item.value)+Number.parseInt(awayStatistics[index].value);             
                return(
                    <div key={index} className="w-[90%] text-center">                       
                        
                        <div>{item.type}</div>
                            
                            <div className="flex justify-center">
                            <div className="flex justify-between">  
                               <span className="border-none">{`${item.value === null ? 0 : item.value}`}</span>
                               <div className="w-56 bg-gray-200 rounded-r-full h-2 rotate-180">
                                   {
                                       item.value !== null && item.value !== 0 && !item.value.toString().includes('%')  ?
                                       <div style={{width:`${Number.parseInt(item.value) *100 / total}%`}} className={`bg-green-600 rounded-r-full  h-2`}></div>:
                                       item.value.toString().includes('%') ? 
                                       <div style={{width:`${item.value}`}} className={`bg-green-600 rounded-r-full  h-2`}></div>
                                       :null
                                   }   
                               </div>                            
                           </div>

                           <div className="flex justify-between"> 
                               <div className="w-56 bg-gray-200 rounded-r-full h-2">
                                   {
                                       awayStatistics[index].value !== null && awayStatistics[index].value !== 0 && !awayStatistics[index].value.toString().includes('%')  ?
                                       <div style={{width:`${Number.parseInt(awayStatistics[index].value) *100 / total}%`}} className={` bg-blue-600 rounded-r-full h-2`}></div>:
                                       awayStatistics[index].value.toString().includes('%') ?
                                       <div style={{width:`${awayStatistics[index].value}`}} className={` bg-blue-600 rounded-r-full h-2`}></div>
                                       :null
                                   }
                               </div>                              
                               <span className="border-none">{`${awayStatistics[index].value === null ? 0 : awayStatistics[index].value}`}</span> 
                           </div>
                        </div>
                    </div>
                )
            }),
            <PlayerStats statistics={{home:homePlayers,away:awayPlayers}}  />
            ]
            :null
        }      
                                    
        </div>
        
    )
}

export default memo(Statistics)