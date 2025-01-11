import React ,{useState, useEffect} from "react";
import axios from "axios";
import { groupDateFixtures, getPromisedTeamFixtures } from "../../Api/getFixtures.js";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FixtureRow from "./FixtureRow.js";
import { getCookie } from "../../Api/cookie.js";
import { NavLink } from "react-router-dom";

export default function DayFixtures(){

    const [selectedDate,setSelectedDate]=useState(getCurrentDate());
    const [dateFixtures,setDateFixtures]=useState([]);
    const [teamsFixtures,setTeamsFixtures]=useState([]);
    const [isLoaded,setLoaded]=useState(false);

    const leagues=getCookie("prefered_leagues");
    const teams=getCookie("prefered_teams");

    useEffect(()=>{

        const response=axios.get('http://localhost:5000/default');
        response.then((result)=>{
            console.log("result:",result.data);
        });
        // const response=fetch('http://localhost:5000/default',{method:'GET'});
        // response.then((result)=>{
        //     result.json().then(data=>console.log("data",data));
            
        //     // result.today.json().then(data=>console.log("today",data));    
        // });
        // return response.json();
        // groupDateFixtures(selectedDate).then(result=>{
        //     setDateFixtures(result);
        //     console.log(dateFixtures);
            
        // })
        // .then(()=>{
        //     getPromisedTeamFixtures(selectedDate).then(result=>{
        //         setTeamsFixtures(result)
        //     })
        // })
        // .then(()=>{
        //     setLoaded(true);
        // })
            
    },[selectedDate])

    function getCurrentDate(){
        const day=new Date().getDate()<10 ? '0'+ new Date().getDate(): new Date().getDate();
        const month=new Date().getMonth()+1 <10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1;
        const year=new Date().getFullYear();
        const currentDate=year.toString()+'-'+month.toString()+'-'+day.toString();
        return currentDate;
    }
    // 
    function handleDateChange (date) {
        setSelectedDate(date);
    };
   
    console.log("selected date:",selectedDate);   

    return(

            <div className="relative top-20 left-[50%] -translate-x-[50%] w-[90%] 
            flex flex-col sm:flex sm:flex-row sm:justify-between sm:gap-6">           

                {/* selected date fixtures */}
                <div className="w-full sm:w-[70%] mx-auto rounded-md bg-slate-50 p-2">
                    <div>
                        <input type="date" onChange={(e)=>handleDateChange(e.target.value)} value={selectedDate} />
                    </div>
                    {/* favourite champions games */}
                    <div className="w-full">
                    {
                        <>
                        <div className="p-2 bg-slate-800 text-slate-50">Favourite Leagues</div>
                        {
                            dateFixtures?
                                <FixtureRow type={"day_matches"} fixturesSource={dateFixtures}/>
                            :
                            <div className="flex justify-center items-center">
                                No current games
                            </div>
                        }
                        </>
                    }
                    </div>
                    {/* favourite teams games */}
                    <div className="w-full">
                    {
                        
                        <>
                            <div className="p-2 bg-slate-800 text-slate-50">Favourite Teams</div>
                            {
                                teamsFixtures?
                                <FixtureRow type={"fav_teams_matches"} fixturesSource={teamsFixtures}/>
                                :
                                <div className="flex justify-center items-center">
                                    No current fixtures
                                </div>
                            }    
                        </>
                    }
                    </div>
                    
                </div>

                {/* Prefered leagues and teams */}
                <div className="xs:w-full sm:w-[30%]  flex flex-col gap-6">
                    <div className="w-full">
                    <div className="bg-slate-800 text-slate-50">Your leaguess</div>
                        {
                            leagues.length>0?
                            leagues.map((league,index)=>{
                                return(
                                <div className=" even:bg-slate-50 odd:bg-slate-300" key={index}> 
                                    <NavLink to={`/leagues/${league.id}/${league.season}`} className="flex justify-between">
                                    <img src={league.logo} alt={league.name} className="w-10 h-10 rounded-full"/>
                                    <span className="w-[50%] border-none my-auto">{league.name}</span>
                                    </NavLink>
                                </div>
                                )
                            })
                            :
                            null
                        }
                    </div>
                    <div className="w-full">
                        <div className="bg-slate-800 text-slate-50">Your teams</div>
                        {
                            teams.length>0?
                            teams.map((team,index)=>{
                                return(
                                    <div className="even:bg-slate-50 odd:bg-slate-300" key={index}>
                                        <NavLink to={`/teams/${team.id}`} className="flex justify-between">
                                        <img src={team.logo} alt={team.name} className="w-10 h-10 rounded-full" />
                                        <span className="w-[50%] border-none my-auto">{team.name}</span>
                                        </NavLink>
                                    </div>
                                    )
                            })
                            :null
                        }
                    </div>
                </div>
            </div>
        
    )
}