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

    // useMemo(()=>{
    //     async function fetchData(){
    //         const fetchedInfo = await getTeamInformation(selectedTeam);
    //         const fetchedSeasons= await getTeamSeasons(selectedTeam);

    //         setTeamInformation(fetchedInfo.data.response[0]);
    //         console.log("info triggered");
    //         setTeamSeasons(fetchedSeasons.data.response);
    //         console.log("seasons triggered");
    //     }  
    //     fetchData();
    // },[])

    useEffect(()=>{
              
        async function fetchData(){

            const fetchedInfo = await getTeamInformation(selectedTeam);
            const fetchedSeasons= await getTeamSeasons(selectedTeam);

            setTeamInformation(fetchedInfo.data.response[0]);
            console.log("info triggered");
            setTeamSeasons(fetchedSeasons.data.response);
            console.log("seasons triggered");

            const fetchedLeagues = await getTeamLeagues(selectedTeam, selectedSeason);
            setTeamLeagues(fetchedLeagues.data.response);
            // if(!isNaN(leagueParam)){
            //     setSelectedLeague(teamLeagues[teamLeagues.length-1])
            // }
            console.log("leagues triggered");

            console.log("team-league-season",selectedTeam,selectedLeague,selectedSeason);
            
            const fetchedStats= await  getTeamStatistics(selectedTeam, selectedSeason, selectedLeague);
            setTeamStatistics(fetchedStats.data.response);
            setStatsLoaded(true);
            console.log("stats triggered",teamStatistics);
        }
        fetchData();
    },
    [selectedSeason,selectedLeague,selectedTeam,selectedLeague])

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

              
            {/** Team statistics specified to a league */}
            <div>
                {
                    statsLoaded && Object.keys(teamStatistics).length > 0 ?   // if statistics are ready, display it:               
                    <>
                    <div>
                        {/* fixtures */}
                        <div>Fixtures</div>
                        <table className='w-full table-auto'>
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
                                Object.entries(teamStatistics?.fixtures).map(([key, value]) => (                                                       
                                    <React.Fragment key={key}>
                                    {/* <tr>{key}</tr> */}
                                    <tr key={key}>
                                        <td>{key}</td>
                                        {Object.entries(value).map(([subKey, subValue]) => (                                    
                                            //<tr key={subKey}>
                                            // <React.Fragment key={key}>
                                            //<td>{subKey}</td>
                                            <td>{subValue}</td>
                                            // </React.Fragment>
                                            
                                            /* {Object.entries(subValue).map(([nestedKey, nestedValue]) => (
                                                <td key={nestedKey}>
                                                {nestedKey === "total" ? (
                                                    <strong>{nestedValue}</strong>
                                                ) : (
                                                    nestedValue
                                                )}
                                                </td>
                                            ))} */
                                            //</tr>
                                        ))}
                                    </tr>
                                      
                                    </React.Fragment>
                                  ))                    
                            }
                            </tbody>
                        </table>
                    </div>
                    {/*  */}
                    <div>
                    <div>Goals</div>
                    <table className='w-full table-auto'>
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
                            Object.entries(teamStatistics?.goals).map(([key, value]) => (                                    
                                <React.Fragment key={key}>
                                    <tr key={key}>{key}</tr>
                                    
                                        {/* <td>{key}</td> */}
                                        {Object.entries(value).map(([subKey, subValue]) => (
                                            subKey === "total" || subKey === "average" ? 
                                                // [
                                                <tr>
                                                    
                                                    <td key={subKey}>{subKey}</td>
                                                    {
                                                        Object.entries(subValue).map(([nestedKey, nestedValue]) => (
                                                        <td>{nestedValue}</td>
                                                    ))  
                                                    }
                                                </tr>
                                                //     (<td></td>),
                                                //     (<td key={subKey}></td>),
                                                // Object.entries(subValue).map(([nestedKey, nestedValue]) => (
                                                //     <td>{nestedValue}</td>
                                                // ))]                                                    
                                               
                                            :null
                                    ))}
                                     
                                        {/* <td>{key}</td>
                                        {Object.entries(value).map(([subKey, subValue]) => (
                                            subKey === "total" || subKey === "average" ?
                                                <tr key={subKey}>
                                                     <td>{subKey}</td>
                                                    {Object.entries(subValue).map(([nestedKey, nestedValue]) => (
                                                        <td>{nestedValue}</td>
                                                    // <td key={nestedKey}>
                                                    //     {nestedKey === "total" ? (
                                                    //     <strong>{nestedValue}</strong>
                                                    //     ) : (
                                                    //     nestedValue
                                                    //     )}
                                                    // </td>
                                                    ))}
                                                </tr>
                                            :null
                                    ))} */}
                                    
                                    
                                </React.Fragment>
                                ))                         
                            // Object.entries(teamStatistics?.goals).map((elem,index)=>{
                            //     return(
                            //         <>
                            //         {/* for/agianst */}
                            //         <tr key={index}>{elem[0]}</tr> 
                            //         {/* <tr>
                            //             <td></td>
                            //             <td>Home</td>
                            //             <td>Away</td>
                            //             <td>total</td>                                   
                            //         </tr> */}
                            //         {
                            //         Object.entries(elem)[1].map((ele,index)=>{
                            //             return(
                            //             <tr key={index} className="even:bg-slate-200 odd:bg-slate-50">
                            //                 <td>{ele[1]}</td>
                            //                 {/* <td>{ele[1].home}</td>
                            //                 <td>{ele[1].away}</td>
                            //                 <td>{ele[1].total}</td> */}
                            //             </tr>)
                            //             })
                            //         }
                            //         </>                                                                                                                        
                            //     )
                            // })        
                            // :null                    
                        }
                        </tbody>
                    </table>
                    </div>
                    </>
                    // <NestedTeamStatistics data={teamStatistics} isParent={false}/>                                                                         
                    :"No data"
                }
            </div>
        </div>
    )
}
