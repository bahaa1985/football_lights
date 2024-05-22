import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTeamSeasons, getTeamInformation, getTeamStatistics , getTeamLeagues} from '../Api/getTeamDetails.js';

export default function Team(props){
    const season=props.season;
    const teamId=useParams().teamId;
    const [teamSeasons,setTeamSeasons]=useState([]);   
    const [teamLeagues,setTeamLeagues]=useState([]);
    const [teamStatistics,setTeamStatistics]=useState([]);
    const [selectedSeason,setSelectedSeason]=useState(season);
    const [leagueId,setLeagueId]=useState(0);

    useEffect(()=>{
        getTeamSeasons(teamId)
        .then(result=>{
            setTeamSeasons(result.data.response);
        })
        .catch(()=>setTeamSeasons([]))

        getTeamLeagues(teamId,selectedSeason)
        .then(result=>{
            setTeamLeagues(result.data.response)
        })
        .catch(()=>setTeamLeagues([]))

        // getTeamStatistics(teamId,season,leagueId)
        // .then(result=>{
        //     setTeamStatistics(result.data.response)
        // })
        // .catch(()=>setTeamStatistics([]))
    },[teamId,selectedSeason,leagueId])

    console.log("team seasons",teamSeasons);
    return(
        <div>
            <div>
                    {/*seasons dropdown box when select a season then leagues dropdown box will be manipulated*/}
                    <select onChange={(e)=>setSelectedSeason(parseInt(e.target.value))} defaultValue={season}> 
                    {                        
                        teamSeasons?.map((item,index)=>{
                            return(
                                <option key={index} value={item}>{item}</option>
                            )
                        })            
                    }
                    </select>
                    {/* leagues dropdownbox */}
                    <select onChange={(e)=>setLeagueId(parseInt(e.target.value))}>  
                    {
                        teamLeagues?.map((item,index)=>{                  
                            return(                                
                                <option key={index}  value={item.league.id}><div>{item.league.name}</div></option>
                            )
                        })
                    }
                    </select>

                </div>    
        </div>
    )
}
