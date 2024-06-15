import { React } from "react";
import { useState, useEffect } from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { getLiveFixtures, getTodayFixtures } from "../Api/getFixtures.js";
import { getLeagues } from "../Api/getLeaguesTeams.js";
import { getPreferdLeaguesFromCookie } from "../Api/cookie.js";

export default function CurrentFixtures(props) {

    const season=props.season;
    const [liveFixtures,setLiveFixtures]=useState([]);
    const [todayFixtures,setToDayFixtures]=useState([])
    const [preferedLeagues,setPreferedLeagues] = useState([]);
    const [leaguesIds,setLeaguesIds]=useState([]);
    const [preferedTeams,setPreferedTeams]=useState([]);
    const [teamsIds,setTeamsIds]=useState([]);
    

    useEffect(()=>{       
        // if(getPreferdLeaguesFromCookie){
            let lees=getPreferdLeaguesFromCookie()
            console.log("current prefered cookie",lees);
            let ids=lees.join('-');
            //get live fixtures:
            getLiveFixtures(ids)
            .then(result=>{
                setLiveFixtures(result.data.response)
            })

            //get today fixtures:
            // Get current date
            var currentDate = new Date();

            // Extract date components
            var year = currentDate.getFullYear();
            var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Months are zero based
            var day = ('0' + currentDate.getDate()).slice(-2);

            // Form the date string in 'yyyy-mm-dd' format
            var dateString = year + '-' + month + '-' + day;

            if(lees.length>0){
                let  todayArray= [];
                for(const leagueId in leaguesIds){
                    getTodayFixtures(leagueId,season,dateString).then(result=>{ 
                        todayArray.push(result.data.response[0])
                })}
                setToDayFixtures(todayArray);
            }
            
        // }        
    },[])
    
  

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
                liveFixtures?.map((fixture,index)=>{
                    return(
                        <div>
                            <div><span>{fixture.teams.home.name}</span><span>{fixture.teams.away.name}</span></div>
                        </div>
                    )
                })
                }
            <div id="div-teams"></div>
                {
                    todayFixtures?
                    todayFixtures.map((elem,index)=>{
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