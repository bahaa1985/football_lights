import React, { memo } from "react";
import getStatistics from "../../Api/Statistics.js";
import getPlayers from "../../Api/Players.js";
import PlayerStats from "./PlayerStats.js";
import { useState,useMemo } from "react";
import { getCookie } from "../../Api/cookie.js";
import { getTranslation } from "../../Translation/labels.js";

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
            if(stats_response.data.response.length > 0 ){
                setHomeStatistics(stats_response.data.response[0].statistics);
                setAwayStatistics(stats_response.data.response[1].statistics);
                //
                setHomePlayers(players_response.data.response[0].players);
                setAwayPlayers(players_response.data.response[1].players);
                //
                setLoaded(true);
            }
           
        }
        fetchStatistics();                 
    },[fixtureId])

    let total=0;

    const lang = getCookie('language').lang || 'en';

    return(
         
        <div className="w-[90%] sm:w-auto mx-auto text-center ">                                                      
        {
            isLoaded ?
            [
            homeStatistics.length > 0?.map((item,index)=>{
                               
                total=Number.parseInt(item.value)+Number.parseInt(awayStatistics[index].value);             
                return(
                    <div key={index} className="w-[90%] text-center my-2 mx-auto ">                       
                            
                        <div className="flex justify-center">
                            <div>  
                               <div className="w-full text-left font-bold px-2 sm:px-4">{`${item.value === null ? 0 : item.value}`}</div>
                               <div className="w-36 sm:w-56 bg-gray-200 rounded-r-full h-2 rotate-180">
                                   {
                                       item.value !== null && item.value !== 0 && !item.value.toString().includes('%')  ?
                                       <div style={{width:`${Number.parseInt(item.value) *100 / total}%`}} className={`bg-green-600 rounded-r-full  h-2`}></div>:
                                       item.value?.toString().includes('%') ? 
                                       <div style={{width:`${item.value}`}} className={`bg-green-600 rounded-r-full  h-2`}></div>
                                       :null
                                   }   
                               </div>                            
                           </div>

                           <div> 
                                <div className="w-full text-right font-bold px-2 sm:px-4">{`${awayStatistics[index].value === null ? 0 : awayStatistics[index].value}`}</div> 
                               <div className="w-36 sm:w-56 bg-gray-200 rounded-r-full h-2">
                                   {
                                       awayStatistics[index].value !== null && awayStatistics[index].value !== 0 && !awayStatistics[index].value.toString().includes('%')  ?
                                       <div style={{width:`${Number.parseInt(awayStatistics[index].value) *100 / total}%`}} className={` bg-blue-600 rounded-r-full h-2`}></div>:
                                       awayStatistics[index].value?.toString().includes('%') ?
                                       <div style={{width:`${awayStatistics[index].value}`}} className={` bg-blue-600 rounded-r-full h-2`}></div>
                                       :null
                                   }
                               </div>                                                            
                           </div>
                        </div>
                        <div>{getTranslation(item.type.replace('_',' '),lang)}</div>
                    </div>
                )
            }),
            <PlayerStats statistics={{home:homePlayers,away:awayPlayers}}  />
            ]
            :<p>No Data Available</p>
        }      
                                    
        </div>
        
    )
}

export default memo(Statistics)