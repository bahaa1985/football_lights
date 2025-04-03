import React, { useState, useEffect,useMemo,useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getTeamSeasons, getTeamInformation, getTeamStatistics , getTeamLeagues} from '../../Api/getTeamDetails.js';
import { getCookie } from '../../Api/cookie.js';

export default function Team(){

    const teamIdParam =parseInt(useParams().teamId);
    const teams = getCookie("prefered_teams");
    const [searchParams] = useSearchParams();
    const leagueParam= searchParams.get('league');
    console.log("leagueParam",leagueParam);
    
    const season = searchParams.get('season');
    
    const [selectedTeam,setSelectedTeam] = useState(teamIdParam ? teamIdParam : teams[0].id);
    const [teamSeasons,setTeamSeasons]=useState([]); 
    const [teamLeagues,setTeamLeagues]=useState([]);
    const [teamInformation,setTeamInformation]=useState([]);
    const [teamStatistics,setTeamStatistics]=useState({});
    const [selectedSeason,setSelectedSeason]=useState(season ? season  : new Date().getFullYear()-1);
    const [statsLoaded,setStatsLoaded]=useState(false);
    const [selectedLeague,setSelectedLeague]=useState(leagueParam);

    const leaguesOption=useRef();  

    // let [yellowCards,setYellowCards] = useState(0);
    // let [redCards,setRedCards] = useState(0);

    const yellowCards= useRef(0), redCards= useRef(0);

    useEffect(()=>{
              
        async function fetchData(){

            const fetchedInfo = await getTeamInformation(selectedTeam);
            const fetchedSeasons= await getTeamSeasons(selectedTeam);
            const fetchedLeagues = await getTeamLeagues(selectedTeam, selectedSeason);
            const fetchedStats= await  getTeamStatistics(selectedTeam, selectedSeason, selectedLeague);

            setTeamInformation(fetchedInfo.data.response[0]);
            setTeamSeasons(fetchedSeasons.data.response);
            setTeamLeagues(fetchedLeagues.data.response);
            setTeamStatistics(fetchedStats.data.response);
            //
            // if(statsLoaded){
                //get total of colored cards:
                    console.log(fetchedStats.data.response.cards.yellow);
                    Object.entries(fetchedStats.data.response.cards.yellow).map(([key,value],index)=>{
                        // Object.entries(value).map(([subKey,subValue])=>{
                            yellowCards.current += value.total
                        // })
                    })
                    Object.entries(fetchedStats.data.response.cards.red).map(([key,value],index)=>{
                        // Object.entries(value).map(([subKey,subValue])=>{
                            redCards.current += value.total
                        // })
                    })
            // }
            //
            setStatsLoaded(true);
            //
            
        }
        fetchData();
        //
        
    },
    [selectedSeason,selectedLeague,selectedTeam,teamIdParam])

    

    return(
        <div>
            {/* Teams dropdown */}
            <div className='flex justify-start space-x-2'>
                <span className='border-none'>Select team</span>
                <select onChange={(e)=>setSelectedTeam(parseInt(e.target.value))} value={selectedTeam}>
                    {
                        teams.map((team,index)=>{
                            return(
                                <option key={index} value={team.id}>{team.name}</option>
                            )
                        })
                    }
                </select>
            </div>
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
            {
                // statsLoaded ? // if all data is loaded fill drop boxes:
                <div>                                       
                {
                    <select onChange={(e)=>setSelectedSeason(parseInt(e.target.value))} value={selectedSeason} > 
                    {/* <option>Select season</option> */}
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
                }
                
                {/* leagues dropdownbox */}
                <select ref={leaguesOption} onChange={(e)=>setSelectedLeague(parseInt(e.target.value))} value={selectedLeague} >  
                    {/* <option>Select a league</option> */}
                    {
                        teamLeagues?.map((item,index)=>{                  
                        return(                                
                            <option key={index} value={item.league.id}>{item.league.name}</option>
                        )})
                    }
                    </select>
                </div> 
                // :null
            }

              
            {/** Team statistics specified to a selected league */}
            <div>
                {
                    statsLoaded && Object.keys(teamStatistics).length > 0 ?   // if statistics are ready, display it:               
                    <>
                    <div>
                        {/* fixtures */}
                        <div>Fixtures</div>
                        <table className='w-full table-fixed'>
                            <thead>                                
                                <tr>
                                    <td></td>
                                    <td>Home</td>
                                    <td>Away</td>
                                    <td>total</td>                                   
                                </tr>
                            </thead>
                            <tbody>
                            {                                                         
                                Object.entries(teamStatistics?.fixtures).map(([key, value],index) => (                                                       
                                    <React.Fragment key={key}>
                                    <tr key={index}>
                                        <td>{key}</td>
                                        {Object.entries(value).map(([subKey, subValue],index) => (
                                            <td key={index}>{subValue}</td>                                            
                                        ))}
                                    </tr>
                                      
                                    </React.Fragment>
                                  ))                    
                            }
                            </tbody>
                        </table>
                    </div>
                    {/* Goals */}
                    <div>
                    <div>Goals</div>
                    <table className='w-full table-fixed'>
                        <thead>                                
                            <tr>
                                <td></td>
                                <td>Home</td>
                                <td>Away</td>
                                <td>total</td>                                   
                            </tr>
                        </thead>
                        <tbody>
                        {    
                            // statsLoaded ?  
                            // Iterate over the "goals" object using map
                            Object.entries(teamStatistics?.goals).map(([key, value],index) => (                                    
                                <React.Fragment key={index}>
                                    <tr key={key}>{key}</tr>                                    
                                        {
                                            Object.entries(value).map(([subKey, subValue],index) => (
                                            subKey === "total" || subKey === "average" ? 
                                                <tr key={index}>
                                                    
                                                    <td key={subKey}>{subKey}</td>
                                                    {
                                                        Object.entries(subValue).map(([nestedKey, nestedValue]) => (
                                                        <td key={nestedKey}>{nestedValue}</td>
                                                    ))  
                                                    }
                                                </tr>
                                            :null
                                    ))}
                                </React.Fragment>
                                ))                                                                      
                        }
                        </tbody>
                    </table>
                    </div>
                    {/* biggest results */}
                    <div>
                        <div>Biggest Results</div>
                        <table className='w-full table-fixed'>
                        <thead>                                
                            <tr>
                                <td></td>
                                <td>Home</td>
                                <td>Away</td>
                                <td></td>                                  
                            </tr>
                        </thead>
                        <tbody>
                        {
                            Object.entries(teamStatistics?.biggest).map(([key,value],index)=>(
                                <React.Fragment key={index}>
                                    {
                                        key === "wins" || key === "loses" ? 
                                        <tr key={key}>{key}
                                            {Object.entries(value).map(([subKey, subValue],index)=>                                                 
                                                <td key={index}>{subValue}</td>
                                            )}
                                        </tr>                                            
                                        : null
                                    }
                                </React.Fragment>
                            ))
                        }
                        </tbody>
                        </table>
                    </div>
                    {/* biggest goals */}
                    <div>
                        <div>Biggest Goals</div>
                        <table className='w-full table-fixed'>
                        <thead>                                
                            <tr>
                                <td></td>
                                <td>Home</td>
                                <td>Away</td>
                                <td>Total</td>                                 
                            </tr>
                        </thead>
                        <tbody>
                        {
                            Object.entries(teamStatistics?.biggest.goals).map(([key,value],index)=>(
                                <React.Fragment key={index}>
                                    {                                      
                                        <tr key={key}>{key}
                                            {Object.entries(value).map(([subKey, subValue],index)=> 
                                                <td>                                              
                                                    <td key={index}>{subValue}</td>
                                                </td>
                                            )}
                                        </tr>
                                    }
                                </React.Fragment>
                            ))
                        }
                        </tbody>
                        </table>
                    </div>
                    {/* clean sheet */}
                    <div>
                        <div>Clean Sheet</div>
                        <table className='w-full table-fixed'>
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>Home</td>
                                    <td>Away</td>
                                    <td>Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td></td>
                                {
                                    Object.entries(teamStatistics?.clean_sheet).map(([key,value],index)=>
                                    (
                                        // console.log(`${key},${value}`)
                                        
                                        // Object.entries(value).map(([key,value],index)=>{
                                            <td key={index}>
                                                {value}
                                            </td>
                                        // })
                                    ))
                                }
                                 </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* penalty */}
                    <div>
                        <div>Penalty</div>
                        <table className='w-full table-fixed'>
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>Total</td>
                                    <td>Percentage</td>
                                    <td>Total</td>
                                </tr>
                                {
                                    Object.entries(teamStatistics?.penalty).map(([key,value],index)=>(
                                        <tr key={index}>
                                            <td>{key}</td>
                                            {
                                                key !== 'total' ?
                                                Object.entries(value).map(([subKey,subValue])=>(
                                                    <td key={subKey}>{subValue}</td>
                                                ))
                                                :
                                                <td>{value}</td>
                                                
                                            }
                                        </tr>
                                    ))
                                }
                            </thead>
                        </table>
                    </div>
                    {/* Cards */}
                    <div>
                    <div>Cards</div>
                        <table className='w-full table-fixed'>
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>Yellow</td>
                                    <td>Red</td>
                                    <td>Total</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    {

                                    }
                                    <td>{yellowCards.current}</td>
                                    <td>{redCards.current}</td>
                                    <td>{yellowCards.current + redCards.current}</td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    </>                                                                       
                    :"No data"
                }
            </div>
        </div>
    )
}
