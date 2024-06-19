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
            let leagues=getPreferdLeaguesFromCookie()
            console.log(leagues);
            let ids=leagues.map(league=>league.id).join('-');
            console.log("current prefered cookie",ids);
            // get live fixtures:
            getLiveFixtures(ids)
            .then(result=>{
                setLiveFixtures(result.data.response)
            });
            setInterval(()=>{
                getLiveFixtures(ids)
                .then(result=>{
                    setLiveFixtures(result.data.response)
                })
                console.log("triggered!");
            },1000*60*10)

            //get today fixtures:
            // Get current date
            var currentDate = new Date();

            // Extract date components
            var year = currentDate.getFullYear();
            var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Months are zero based
            var day = ('0' + currentDate.getDate()).slice(-2);

            // Form the date string in 'yyyy-mm-dd' format
            var dateString = year.toString() + '-' + month.toString() + '-' + day.toString();
            console.log(dateString);
            
            if(leagues.length>0){
                let  todayArray= [];
                for(let i=0;i<leagues.length;i++){
                    console.log("i",leagues[i]);
                    getTodayFixtures(leagues[i].id,leagues[i].season,dateString).then(result=>{ 
                        todayArray.push(...result.data.response)
                        setToDayFixtures(todayArray);
                })}               
            }
            
        // }        
    },[season])
    
    const groupedLiveFixtures=liveFixtures?.reduce((group,elem)=>{
        const title= elem.league.name + '  ' + elem.league.round;
        if(group[title] ==null){
            group[title]=[];
        }
        group[title].push(elem);
        return group;

    },{})

    const groupedTodayFixtures=todayFixtures?.reduce((group,elem)=>{
        const title= elem.league.name + '  ' + elem.league.round;
        if(group[title] ==null){
            group[title]=[];
        }
        group[title].push(elem);
        return group;

    },{})

    

    console.log("live",groupedLiveFixtures);
    console.log("today",groupedTodayFixtures);

    return(
        <div> Welcome to home!
           <div id="div-leagues"> Live
                {
                groupedLiveFixtures?
                Object.keys(groupedLiveFixtures)
                .sort((a,b)=>a-b)
                .map((elem,index)=>{
                    return(
                        <div>
                            <img src={groupedLiveFixtures[elem][0].league.logo} alt={''}/>
                            <span>{Object.keys(groupedLiveFixtures)[index]}</span>
                            <div>
                            {
                                 groupedLiveFixtures[elem].map((fixture,index)=>{
                                    return(
                                        <div key={index}>
                                            <span>{fixture.fixture.status.long}</span>
                                            <img className="image" src={fixture.teams.home.logo} alt={fixture.teams.home.name}/>
                                            <span>{fixture.teams.home.name}</span>
                                            <span>{fixture.goals.home}</span>
                                            <span>{fixture.goals.away}</span>
                                            <span>{fixture.teams.away.name}</span>
                                            <img className="image" src={fixture.teams.away.logo} alt={fixture.teams.away.name}/>
                                        </div>
                                    ) 
                            })
                            }
                            </div>
                        </div>  
                    )
                })
                :
                <p>No current games</p>
                }
                </div>
            <div id="div-teams"> Today Fixtures
                {
                    groupedTodayFixtures?
                    Object.keys(groupedTodayFixtures)
                    .sort((a,b)=>a-b)
                    .map((elem,index)=>{
                        return(
                            <div>
                                <img src={groupedTodayFixtures[elem][0].league.logo} alt={''}/>
                                <span>{Object.keys(groupedTodayFixtures)[index]}</span>
                                <div>
                                {
                                     groupedTodayFixtures[elem].map((fixture,index)=>{
                                        return(
                                            <div key={index}>
                                                <img className="image" src={fixture.teams.home.logo} alt={fixture.teams.home.name}/>
                                                <span>{fixture.teams.home.name}</span>
                                                <span>{fixture.goals.home}</span>
                                                <span>{fixture.goals.away}</span>
                                                <span>{fixture.teams.away.name}</span>
                                                <img className="image" src={fixture.teams.away.logo} alt={fixture.teams.away.name}/>
                                            </div>
                                        )
                                        
                                })
                                }
                                </div>
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