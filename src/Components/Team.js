import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { getTeamSeasons, getTeamInformation, getTeamStatistics , getTeamLeagues} from '../Api/getTeamDetails.js';

export default function Team(props){
    const season=props.season;
    const teamId=useParams().teamId;
    const {search}=useLocation();
    const leagueQuery=new URLSearchParams(search).get("league");
    // console.log("search",query);
    const [teamSeasons,setTeamSeasons]=useState([]);   
    const [teamLeagues,setTeamLeagues]=useState([]);
    const [teamInformation,setTeamInformation]=useState([]);
    const [teamStatistics,setTeamStatistics]=useState([]);
    const [selectedSeason,setSelectedSeason]=useState(season);
    const [leagueId,setLeagueId]=useState(leagueQuery);

    useEffect(()=>{

        // getTeamInformation(teamId)
        // .then(result=>{
        //     setTeamInformation(result.data.response[0])
        // })

        // getTeamSeasons(teamId)
        // .then(result=>{
        //     setTeamSeasons(result.data.response);
        // })
        // .catch(()=>setTeamSeasons([]))

        // getTeamLeagues(teamId,selectedSeason)
        // .then(result=>{
        //     setTeamLeagues(result.data.response)
        // })
        // .catch(()=>setTeamLeagues([]))

        getTeamStatistics(teamId,selectedSeason,leagueId)
        .then(result=>{
            setTeamStatistics(result.data.response)
        })
        .catch(()=>setTeamStatistics([]))
    },[teamId,selectedSeason,leagueId,season])

    // console.log("team statistics",teamStatistics);

    let statsElements=[];
    let divElement=new HTMLDivElement();
    function teamStatisticsFunc(obj){
        statsElements.push(divElement);
        for(let key in obj){
            if(typeof(obj[key])==='object' && obj[key]!==null){
                statsElements.push(<div>{key}</div>)
                teamStatisticsFunc(obj[key])
                divElement=new HTMLDivElement()
            }
            else{
                divElement.appendChild(<div><span>{key}</span><span>{obj[key]}</span></div>)
                // statsElements.push(<span><span>{key}</span><span>{obj[key]}</span></span>)
            }
        }
    }


    return(
        <div>
            {/** Team's basic information */}
            {/* <div className='team-basic'>
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
            </div> */}
            {/** Venue details */}            
            {/* <div className='venue'>
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
            </div> */}
            {/** Season and leagues dropdowns */}
            <div>
                    {/*seasons dropdown box when select a season then leagues dropdown box will be manipulated*/}
                    {/* <select onChange={(e)=>setSelectedSeason(parseInt(e.target.value))} defaultValue={season}> 
                    {                        
                        teamSeasons?.map((item,index)=>{
                            return(
                                <option key={index} value={item}>{item}</option>
                            )
                        })            
                    }
                    </select> */}
                    {/* leagues dropdownbox */}
                    {/* <select onChange={(e)=>setLeagueId(parseInt(e.target.value))}>  
                    {
                        teamLeagues?.map((item,index)=>{                  
                            return(                                
                                <option key={index}  value={item.league.id}><div>{item.league.name}</div></option>
                            )
                        })
                    }
                    </select> */}
            </div>    
            {/** Team statistics specified to a league */}
            <div>
                {
                    teamStatistics?
                    [
                    //     Object.entries(teamStatistics).map((item,index)=>{
                    //     return (
                    //         <div>
                    //             <p>{item[0]}</p>
                    //             {
                    //                 // Object.entries(item[1]).map((elem,index)=>{
                    //                 //     return(
                    //                 //         <>
                    //                 //         <span>{Object.values(elem)[0]}</span>
                    //                 //         {
                    //                 //             // !Array.isArray(Object.values(elem)[1][0]) ?

                    //                 //             // :null
                    //                 //         }
                    //                 //         <span>{Object.values(elem[1])[0]}</span>
                    //                 //         </>
                    //                 //     )
                    //                 // })
                    //             }
                    //         </div>
                    //     )
                    // }),
                    teamStatisticsFunc(teamStatistics),
                    statsElements.map((item,index)=>{
                        return(
                            <div key={index}>{item}</div>
                        )
                    }),
                    console.log("array",...statsElements)
                ]
                    :null
                }
            </div>
        </div>
    )
}
