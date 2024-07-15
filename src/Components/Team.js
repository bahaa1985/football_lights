import React, { useState, useEffect,useCallback } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { getTeamSeasons, getTeamInformation, getTeamStatistics , getTeamLeagues} from '../Api/getTeamDetails.js';
import NestedTeamStatistics from './NestedTeamStatistics.js';

export default function Team(){

    const {search}=useLocation();
    const leagueQuery=parseInt(new URLSearchParams(search).get("league"));
    const seasonQuery=parseInt(new URLSearchParams(search).get("season"));

    const teamId =parseInt(useParams().teamId);
    const [teamSeasons,setTeamSeasons]=useState([]);   
    const [teamLeagues,setTeamLeagues]=useState([]);
    const [teamInformation,setTeamInformation]=useState([]);
    const [teamStatistics,setTeamStatistics]=useState([]);
    const [selectedSeason,setSelectedSeason]=useState(seasonQuery);
    const [leagueId,setLeagueId]=useState(leagueQuery);

    const fetchTeamData = useCallback(() => {
        getTeamInformation(teamId)
            .then(result => {
                setTeamInformation(result.data.response[0])
                console.log("info triggered");
            }
            );

        getTeamSeasons(teamId)
            .then(result =>{
                setTeamSeasons(result.data.response);
                console.log("seasons triggered");
            });

        getTeamLeagues(teamId, selectedSeason)
            .then((result)=>{
                setTeamLeagues(result.data.response)
                console.log("leagues triggered");
                // setLeagueId(result.data.response[0].league.id)
            });

        getTeamStatistics(teamId, selectedSeason, leagueId)
            .then(result =>{
                console.log("stats triggered");
            });
    }, [teamId,selectedSeason,leagueId]);

    useEffect(()=>{
        fetchTeamData();
    },[fetchTeamData])

    // console.log("leagues",teamLeagues);
    // console.log("selected season:",selectedSeason);
    
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
                    <select onChange={(e)=>setSelectedSeason(parseInt(e.target.value))}> 
                    {                        
                        
                        teamSeasons?.map((item,index)=>{
                            return(
                                <option key={index} value={item}>{item}</option>
                            )
                        })           
                    }
                    </select>
                    {/* leagues dropdownbox */}
                    <select onChange={(e)=>setLeagueId(parseInt(e.target.value))} >  
                    {
                        [<option>Select league</option>,
                        teamLeagues?.map((item,index)=>{                  
                            return(                                
                                <option key={index} value={item.league.id}>{item.league.name}</option>
                            )
                        })]
                    }
                    </select>
            </div>    
            {/** Team statistics specified to a league */}
            <div>
                {
                    teamStatistics? 
                    <NestedTeamStatistics data={teamStatistics} isParent={false}/>                                                                         
                    :"No data"
                }
            </div>
        </div>
    )
}
