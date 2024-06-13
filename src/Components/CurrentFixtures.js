import { React } from "react";
import { useState, useEffect } from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { getLiveFixtures, getTodayFixtures } from "../Api/getFixtures.js";
import { getLeagues } from "../Api/getLeaguesTeams.js";
import { getLeaguesCookie } from "../Api/cookie.js";

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
        console.log("pref leagues",prefLeagues);     
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
        // let arr=[];
        // getLeaguesCookie();
        // console.log("leaguesIds",...leaguesIds);
        // for(let i=0;i<leaguesIds.length;i++){
        //     getLeagues(null,leaguesIds[i]).then(result=>{
        //         console.log("current result:",result.data.response[0]);
        //         arr.push(result.data.response[0]);               
        //         // console.log("current prefered cooki",arr);
        //     })
        // };
        // setPreferedLeagues(arr);
    },[])
    
    console.log("current prefered cookie",preferedLeagues);

    return(
        <div> Welcome to home!
           <div id="div-leagues"> HI
                {
                //     preferedLeagues?
                //     preferedLeagues?.map((elem,index)=>{
                //         return(
                //             <div>
                //                 {elem.league.name}
                //                 <img src={elem.league.logo} alt={elem.league.name} />
                //             </div>
                //         )
                //         })
                //     :
                //     <p>No current games</p> 
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