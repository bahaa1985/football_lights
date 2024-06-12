import { React } from "react";
import { useState, useEffect } from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { getLiveFixtures, getTodayFixtures } from "../Api/getFixtures.js";
import { getLeagues } from "../Api/getLeaguesTeams.js";

export default function CurrentFixtures() {

    const [liveFixtures,setLiveFixtures]=useState([]);
    const [todayFixtures,setToDayFixtures]=useState([])
    const [preferedLeagues,setPreferedLeagues] = useState([]);
    const [leaguesIds,setLeaguesIds]=useState([]);
    const [preferedTeams,setPreferedTeams]=useState([]);
    const [teamsIds,setTeamsIds]=useState([]);

    async function getLeaguesCookie(){
        const cookies = new Cookies();
        const prefLeagues=cookies.get('preferedLeagues');       
        if(prefLeagues){
          setLeaguesIds(prefLeagues);                
        }
        else{
          setLeaguesIds([]);          
        }
    }

    function getTeamsCookie(){
        const cookies = new Cookies();
        const cookie=cookies.get('preferedTeams')
        return cookie
    }

    // if(getLeaguesCookie){
    //     console.log("current cookie",getLeaguesCookie());
    // }

    useEffect(()=>{       
        // if(getLeaguesCookie().length>0) { setPreferedLeagues(getLeaguesCookie())}

        // if(getTeamsCookie().length > 0) { setPreferedTeams(getTeamsCookie())}
        getLeaguesCookie().then(()=>{
            console.log("leaguesIds",...leaguesIds);    
            for(let i=0;i<leaguesIds.length;i++){
                getLeagues(null,leaguesIds[i]).then(result=>{
                    console.log("current result:",result.data.response);
                    setPreferedLeagues(preferedLeagues.push(result.data.response));               
                })
            }
            // if(fetchedLeagues.length > 0) setPreferedLeagues(fetchedLeagues)
            console.log("current prefered cookie",preferedLeagues);
        });

       
    },[])
    
    return(
        <div> Welcome to home!
           <div id="div-leagues" onLoad={()=>getLeaguesCookie()}> HI
                {
                    preferedLeagues?
                    preferedLeagues?.map((elem,index)=>{
                        return(
                            <div>
                                {elem.league.name}
                                <img src={elem.league.logo} alt={elem.league.name} />
                            </div>
                        )
                        })
                    :
                    <p>No current games</p> 
                }
            <div id="div-teams" onLoad={()=>getTeamsCookie()}></div>
                {
                    preferedTeams?
                    preferedTeams.map((elem,index)=>{
                        return(
                            <div>
                                {elem.team.name}
                                <img src={elem.team.logo} alt={elem.team.name} />
                            </div>
                        )
                    })
                :
                <p>No current games</p>
                }
            </div>
        </div>  
    )
    
}