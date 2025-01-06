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
    const [seasonsLoaded,setSeasonsLoaded]= useState(false);  
    const [teamLeagues,setTeamLeagues]=useState([]);
    const [teamInformation,setTeamInformation]=useState([]);
    const [teamStatistics,setTeamStatistics]=useState({});
    const [selectedSeason,setSelectedSeason]=useState(0);
    const [statsLoaded,setStatsLoaded]=useState(false);
    const [leagueId,setLeagueId]=useState(0);
    /////
    const [teamFixtures,setTeamFixtures] = useState([]);
    const leaguesOption=useRef();

    const fetchTeamData = useCallback(() => {
       
    }, [teamId,selectedSeason,leagueId]);

    useEffect(()=>{
        getTeamInformation(teamId)
            .then(result => {
                setTeamInformation(result.data.response[0]);
                console.log("info triggered");
            }
            );
    },
    [teamId,selectedSeason,leagueId])

    useEffect(()=>{
        getTeamSeasons(teamId)
            .then(result =>{
                setTeamSeasons(result.data.response);
                console.log("seasons triggered");
            })
            .then(()=>{
               
                
                setSeasonsLoaded(true);
            })
    },[])

    useEffect(()=>{
        getTeamLeagues(teamId, selectedSeason)
            .then((result)=>{
                setTeamLeagues(result.data.response)
                console.log("leagues triggered");
                // setLeagueId(result.data.response[0].league.id)
            });
    },[teamId,selectedSeason])

    useEffect(()=>{
        getTeamStatistics(teamId, selectedSeason, leagueId)
        .then(result=>{
            setTeamStatistics(result.data.response);
            console.log("tt",Object.entries(result.data.response.fixtures));
        })
        .then(()=>{
            // if(teamStatistics.length > 0)
           
            setStatsLoaded(true);
        })
        // async function fetchData(){
        //     const result=await getTeamStatistics(teamId, selectedSeason, leagueId)
        //     console.log("stats triggered");            
        //     setTeamStatistics(result.data.response);
        //     // setTeamFixtures(teamStatistics?.fixtures);
        //     // console.log("fixtues:",teamStatistics.fixtures);   
        //     // setStatsLoaded(true);
        // }        
        // fetchData() 
            // .then(()=>{
            //     setStatsLoaded(true)
            // })
    },[teamId,selectedSeason,leagueId])

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
                    <img className="h-48 w-56" src={teamInformation?.venue?.image} alt={teamInformation?.venue?.name} />
                </div>
            </div>
            {/** Season and leagues dropdowns */}
            <div>
                    {/*seasons dropdown box. when select a season then leagues dropdown box will be manipulated*/}
                    {
                        seasonsLoaded ? 
                            <select onChange={(e)=>setSelectedSeason(parseInt(e.target.value))} defaultValue={selectedSeason} > 
                            <option>Select season</option>
                            {                        
                                teamSeasons?.map((item,index)=>{
                                    return(
                                        <option key={index} value={item}>{item}</option>
                                        // <button onClick={()=>setSelectedSeason(parseInt(item))}>{item}</button>
                                    )
                                })
                                // renderedSeasons           
                            }
                            </select>
                        :
                        null
                    }
                    
                    {/* leagues dropdownbox */}
                    <select ref={leaguesOption} onChange={(e)=>setLeagueId(parseInt(e.target.value))} defaultValue={leagueId} >  
                        <option>Select a league</option>
                        {
                            teamLeagues?.map((item,index)=>{                  
                                return(                                
                                    <option key={index} value={item.league.id}>{item.league.name}</option>
                                )})
                        }
                    </select>
                    {/* <button onClick={()=>[setLeagueId(leaguesOption.current.value),console.log("ref league",leaguesOption.current.value)
                    ]}>Display</button> */}
            </div>    
            {/** Team statistics specified to a league */}
            <div>
                {
                    // teamStatistics.length > 0 ?                  
                    <>
                        <table className='w-full table-auto'>
                            <thead>
                                {/* <tr>
                                    <td>Fixtures</td>
                                </tr> */}
                                <tr>
                                    <td></td>
                                    <td>Home</td>
                                    <td>Away</td>
                                    <td>total</td>                                   
                                </tr>
                            </thead>
                            <tbody>
                            {    
                                statsLoaded ?                            
                                Object.entries(teamStatistics?.fixtures).map((elem,index)=>{
                                    return(
                                    <tr key={index} className="even:bg-slate-200 odd:bg-slate-50">
                                        <td>{elem[0]}</td>
                                        <td>{elem[1].home}</td>
                                        <td>{elem[1].away}</td>
                                        <td>{elem[1].total}</td>
                                    </tr>
                                    )
                                })        
                                :null                    
                            }
                            </tbody>
                        </table>
                    </>
                    // <NestedTeamStatistics data={teamStatistics} isParent={false}/>                                                                         
                    // :"No data"
                }
            </div>
        </div>
    )
}
