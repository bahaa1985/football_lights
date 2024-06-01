import { React } from "react";
import { useState, useEffect } from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import { CookiesProvider,useCookies } from "react-cookie";
import Cookies from "universal-cookie";
import { getLiveFixtures, getTodayFixtures } from "../Api/getFixtures.js";

export default function CurrentFixtures() {

    const [liveFixtures,setLiveFixtures]=useState([]);
    const [todayFixtures,setToDayFixtures]=useState([])
    const selectedLeagues=document.cookie.selected;
    const [cookies]=useCookies(['selectedLeagues'])
    function getLeaguesCookie(){
        const cookies = new Cookies();
        const cookie=cookies.get('selectedLeagues')
        console.log("cookie",cookie);
        return cookie
    }
    const leaguesArr=getLeaguesCookie();
    function getTeamsCookie(){
        const cookies = new Cookies();
        const cookie=cookies.get('preferedTeams')
        console.log("cookie",cookie);
        return cookie
    }
    const teamsArr=getTeamsCookie()
    return(
        <div>
           <div id="div-leagues" onLoad={()=>getLeaguesCookie()}> HI
                {
                    leaguesArr?
                        leaguesArr.map((elem,index)=>{
                        return(<div>{elem}</div>)
                        })
                    :
                    <p>No current games</p> 
                }
            <div id="div-teams" onLoad={()=>getTeamsCookie()}></div>
                {
                    teamsArr?
                    teamsArr.map((elem,index)=>{
                    return(<div>{elem}</div>)
                    })
                :
                <p>No current games</p>
                }
            </div>
        </div>  
    )
    
}