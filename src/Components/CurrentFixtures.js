import { React } from "react";
import { useState, useEffect } from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { getLiveFixtures, getTodayFixtures } from "../Api/getFixtures.js";

export default function CurrentFixtures() {

    const [liveFixtures,setLiveFixtures]=useState([]);
    const [todayFixtures,setToDayFixtures]=useState([])
    const [preferedLeagues,setPreferedLeagues] = useState([]);
    const [preferedTeams,setPreferedTeams]=useState([]);

    function getLeaguesCookie(){
        const cookies = new Cookies();
        const cookie=cookies.get('preferedLeagues');
        return cookie
    }
    const leaguesArr=getLeaguesCookie();
    function getTeamsCookie(){
        const cookies = new Cookies();
        const cookie=cookies.get('preferedTeams')
        return cookie
    }
    const teamsArr=getTeamsCookie()

    useEffect(()=>{
        if(getLeaguesCookie().length>0) { setPreferedLeagues(getLeaguesCookie())}

        if(getTeamsCookie().length > 0) { setPreferedTeams(getTeamsCookie())}
    },[])
    
    return(
        <div> Welcome to home!
           <div id="div-leagues" onLoad={()=>getLeaguesCookie()}> HI
                {
                    preferedLeagues?
                    preferedLeagues.map((elem,index)=>{
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