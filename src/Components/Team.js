import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { getTeamSeasons, getTeamInformation, getTeamStatistics , getTeamLeagues} from '../Api/getTeamDetails.js';
import NestedTeamStatistics from './NestedTeamStatistics.js';

export default function Team(props){
    const season=props.season;
    const teamId=useParams().teamId;
    const {search}=useLocation();
    const leagueQuery=new URLSearchParams(search).get("league");
    console.log("leagueQuert",leagueQuery);
    const [teamSeasons,setTeamSeasons]=useState([]);   
    const [teamLeagues,setTeamLeagues]=useState([]);
    const [teamInformation,setTeamInformation]=useState([]);
    const [teamStatistics,setTeamStatistics]=useState([]);
    const [selectedSeason,setSelectedSeason]=useState(season);
    const [leagueId,setLeagueId]=useState(leagueQuery);

    useEffect(()=>{

        getTeamInformation(teamId)
        .then(result=>{
            setTeamInformation(result.data.response[0])
        })

        getTeamSeasons(teamId)
        .then(result=>{
            setTeamSeasons(result.data.response);
        })
        // .catch(()=>setTeamSeasons([]))

        getTeamLeagues(teamId,selectedSeason)
        .then(result=>{
            setTeamLeagues(result.data.response)
        })
        // .catch(()=>setTeamLeagues([]))

        getTeamStatistics(teamId,selectedSeason,leagueId)
        .then(result=>{
            setTeamStatistics(result.data.response)
        })
        // .catch(()=>setTeamStatistics([]))
    },[teamId,selectedSeason,leagueId,season])

    console.log(teamStatistics);
    
    return(
        <div>
            {/** Team's basic information */}
            <div className='team-basic'>
                <div className='team'>
                    <div>
                        <img src={teamInformation?.team?.logo} alt={teamInformation?.team?.name}/>
                    </div>
                    <div>
                        <p>
                            <span>Name</span><span>{teamInformation?.team?.name}</span>
                        </p>
                        <p>
                            <span>Country</span><span>{teamInformation?.team?.country}</span>
                        </p>
                        <p>
                            <span>Founded</span><span>{teamInformation?.team?.founded}</span>
                        </p>
                    </div>                  
                </div>               
            </div>
            {/** Venue details */}            
            <div className='venue'>
                <div>
                    <p>
                        <span>Name</span><span>{teamInformation?.venue?.name}</span>
                    </p>
                    <p>
                        <span>City</span><span>{teamInformation?.venue?.city}</span>
                    </p>
                    <p>
                        <span>Capacity</span><span>{teamInformation?.venue?.capacity}</span>
                    </p>
                </div>
                <div>
                    <img src={teamInformation?.venue?.image} alt={teamInformation?.venue?.name} />
                </div>
            </div>
            {/** Season and leagues dropdowns */}
            <div>
                    {/*seasons dropdown box. when select a season then leagues dropdown box will be manipulated*/}
                    <select onChange={(e)=>setSelectedSeason(parseInt(e.target.value))} defaultValue={()=>teamSeasons[teamSeasons[teamSeasons.length-1]]}> 
                    {                        
                        teamSeasons?.map((item,index)=>{
                            return(
                                <option key={index} value={item}>{item}</option>
                            )
                        })            
                    }
                    </select>
                    {/* leagues dropdownbox */}
                     <select onChange={(e)=>setLeagueId(parseInt(e.target.value))} defaultValue={parseInt(leagueId)}>  
                    {
                        teamLeagues?.map((item,index)=>{                  
                            return(                                
                                <option key={index}  value={item.league.id}>{item.league.name}</option>
                            )
                        })
                    }
                    </select>
            </div>    
            {/** Team statistics specified to a league */}
            <div>
                {
                    teamStatistics? 
                    <NestedTeamStatistics data={teamStatistics} isParent={false}/>                                                                         
                    :null
                }
            </div>
        </div>
    )
}
