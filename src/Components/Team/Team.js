import React, { useState, useEffect,useCallback,useMemo,useRef } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { getTeamSeasons, getTeamInformation, getTeamStatistics , getTeamLeagues} from '../../Api/getTeamDetails.js';
import NestedTeamStatistics from './NestedTeamStatistics.js';

export default function Team(){

    const {search}=useLocation();
    // const leagueQuery=parseInt(new URLSearchParams(search).get("league"));
    // const seasonQuery=parseInt(new URLSearchParams(search).get("season"));

    const teamId =parseInt(useParams().teamId);
    const [teamSeasons,setTeamSeasons]=useState([]);   
    const [teamLeagues,setTeamLeagues]=useState([]);
    const [teamInformation,setTeamInformation]=useState([]);
    const [teamStatistics,setTeamStatistics]=useState([]);
    const [selectedSeason,setSelectedSeason]=useState(0);
    const [leagueId,setLeagueId]=useState(0);
    const leaguesOption=useRef();

    const fetchTeamData = useCallback(() => {
       
    }, [teamId,selectedSeason,leagueId]);

    useEffect(()=>{
        getTeamInformation(teamId)
            .then(result => {
                setTeamInformation(result.data.response[0])
                // console.log("info triggered");
            }
            );

        getTeamSeasons(teamId)
            .then(result =>{
                setTeamSeasons(result.data.response);
                // console.log("seasons triggered");
            });

        getTeamLeagues(teamId, selectedSeason)
            .then((result)=>{
                setTeamLeagues(result.data.response)
                // console.log("leagues triggered");
                // setLeagueId(result.data.response[0].league.id)
            });

        // getTeamStatistics(teamId, selectedSeason, leagueId)
        //     .then(result =>{
        //         // console.log("stats triggered");
        //         setTeamStatistics(result.data.response);
        //     });
    },
    [teamId,selectedSeason,leagueId])

    console.log("leagues",teamLeagues);
    // console.log("selected season:",selectedSeason);
    // Memoize the options rendering to avoid unnecessary re-renders
    // const renderedSeasons = useMemo(() => {
    //     getTeamSeasons(teamId)
    //         .then(result =>{
    //             result.data.response.map((season, index) => {
    //             return( 
    //             <option key={index} value={season}>
    //                 {season}
    //             </option>)   
    //         })})
                // setTeamSeasons(result.data.response);
                // console.log("seasons triggered");

        // return teamSeasons?.map((season, index) => (
        // <option key={index} value={season}>
        //     {season}
        // </option>
        // ));
    // }, [teamId]);

    // const renderedLeagues=useMemo(()=>{
    //     getTeamLeagues(teamId, selectedSeason)
    //         .then((result)=>{
    //             result.data.response.map((item,index)=>{
    //                 return(
    //                     <option key={index} value={item.league.id}>
    //                         {item.league.name}
    //                     </option>
    //                 )
    //             })
               
                // setTeamLeagues(result.data.response)
                // console.log("leagues triggered");
                // setLeagueId(result.data.response[0].league.id)
        // });
        // return teamLeagues?.map((item,index)=>(
        //     <option key={index} value={item.league.id}>
        //         {item.league.name}
        //     </option>
        // ))
    // },[teamId,selectedSeason])

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
                    <select onChange={(e)=>setSelectedSeason(parseInt(e.target.value))} defaultValue={''} > 
                    {                        
                        teamSeasons?.map((item,index)=>{
                            return(
                                // <option key={index} value={item}>{item}</option>
                                <button onClick={()=>setSelectedSeason(parseInt(item))}>{item}</button>
                            )
                        })
                        // renderedSeasons           
                    }
                    </select>
                    {/* leagues dropdownbox */}
                    <select ref={leaguesOption} defaultValue={''} >  
                    {
                        <>
                            <option>Select a league</option>
                            {
                                teamLeagues?.map((item,index)=>{                  
                                return(                                
                                    <option key={index} value={item.league.id}>{item.league.name}</option>
                                )})
                            }
                        </>                        
                        // renderedLeagues
                    }
                    </select>
                    <button onClick={()=>[setLeagueId(leaguesOption.current.value),console.log("ref league",leaguesOption.current.value)
                    ]}>Display</button>
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
