import React ,{useState, useEffect} from "react";
import { groupDateFixtures, getPromisedTeamFixtures } from "../../Api/getFixtures.js";
import 'react-calendar/dist/Calendar.css';
import FixtureRow from "./FixtureRow.jsx";
import { getCookie } from "../../Api/cookie.js";

export default function DayFixtures(){

    function getCurrentDate(){
        const day=new Date().getDate()<10 ? '0'+ new Date().getDate(): new Date().getDate();
        const month=new Date().getMonth()+1 <10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1;
        const year=new Date().getFullYear();
        const currentDate=year.toString()+'-'+month.toString()+'-'+day.toString();
        return currentDate;
    }

    const [selectedDate,setSelectedDate]=useState(getCurrentDate());
    const [dateFixtures,setDateFixtures]=useState([]);
    const [teamsFixtures,setTeamsFixtures]=useState([]);
    const [isLoaded,setLoaded]=useState(false);

    const leagues=getCookie("prefered_leagues");
    const teams=getCookie("prefered_teams");

    useEffect(()=>{
        async function fetchFixtures(){
            const date_response = await groupDateFixtures(selectedDate);
            const teams_response = await getPromisedTeamFixtures(selectedDate);
            setDateFixtures(date_response);
            setTeamsFixtures(teams_response);
            setLoaded(true);
        }
        fetchFixtures();

        console.log("ty",dateFixtures);
        
    },[selectedDate])  

    return(

            <div className="w-[90%] flex flex-row sm:flex sm:flex-row sm:justify-between sm:gap-6">           
                {
                    isLoaded ? 
                    (
                    <div className="absolute hidden left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-10">Loading ....</div>,
                    {/* selected date fixtures */},
                    <div className="w-full sm:w-[90%] mx-auto rounded-md bg-slate-50 p-2">
                    <div>
                        <input type="date" onChange={(e)=>setSelectedDate(e.target.value)} value={selectedDate} />
                    </div>
                    {/* favourite champions games */}
                    <div className="block sm:flex flex-row justify-between">
                    <div className="w-full sm:w-[48%]">
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
                    <div className="w-full sm:w-[48%]">
                    {
                        
                        <>
                            <div className="p-2 bg-slate-800 text-slate-50">Favourite Teams</div>
                            {
                                teamsFixtures?.length > 0 ?
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
                    
                    </div>)
                    :
                    <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-10">Loading ....</div>
                }
                

                {/* Prefered leagues and teams */}
                {/* <div className="xs:w-full sm:w-[30%]  flex flex-col gap-6">
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
                </div> */}
            </div>
        
    )
}