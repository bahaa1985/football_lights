import React ,{useState, useEffect} from "react";
import { groupDateFixtures, getPromisedTeamFixtures } from "../../Api/getFixtures.js";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FixtureRow from "./FixtureRow.js";
import { getCookie } from "../../Api/cookie.js";

export default function DayFixtures(){

    const [selectedDate,setSelectedDate]=useState('');
    const [dateFixtures,setDateFixtures]=useState([]);
    const [teamsFixtures,setTeamsFixtures]=useState([]);
    const [isLoaded,setLoaded]=useState(false);

    const leagues=getCookie("prefered_leagues");
    const teams=getCookie("prefered_teams");

    useEffect(()=>{
        
        // groupDateFixtures(selectedDate).then(result=>{
        //     setDateFixtures(result);
        // });
        
        // getPromisedTeamFixtures(selectedDate).then(result=>{
        //     setTeamsFixtures(result)
        // })
    },[selectedDate])

    // 
    const handleDateChange = (date) => {
        // const day=date.getDate()<10 ? '0'+ date.getDate(): date.getDate();
        // const month=date.getMonth()+1 <10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
        // const year=date.getFullYear();
        // const dateString=year.toString()+'-'+month.toString()+'-'+day.toString();
        setSelectedDate(date);
        console.log("Selected date:", date);
    };
   
    // console.log("team fix:",teamsFixtures);   

    return(
        <div className="relative top-20 left-[50%] -translate-x-[50%] w-[90%] flex flex-col-reverse sm:flex sm:justify-between">           

            {/* selected date fixtures */}
            <div className="sm:w-full sm:flex justify-around mx-auto rounded-md bg-slate-50 p-2">
                <div className="w-64">
                    <input type="date" onChange={(e)=>handleDateChange(e.target.value)} />
                    {/* <Calendar onChange={handleDateChange} className="rounded-md bg-slate-50" />               */}
                </div>
                {/* favourite champions games */}
                <div className="w-4/12">
                {
                    dateFixtures?
                    <FixtureRow type={"day_matches"} fixturesSource={dateFixtures}/>
                    :
                    <p>No current games</p>
                }
                </div>
                {/* favourite teams games */}
                <div className="w-4/12">
                {
                    teamsFixtures?
                    <FixtureRow type={"fav_teams_matches"} fixturesSource={teamsFixtures}/>
                    :
                    <p>No current games</p>
                }
                </div>
                
            </div>

            {/* Prefered leagues and teams */}
            <div className="xs:w-full sm:w-[30%]">
                <div className="w-full">
                    {
                        leagues.map((league,index)=>{

                        })
                    }
                </div>
                <div className="w-full">
                    {
                        teams.map((team,index)=>{
                            
                        })
                    }
                </div>
            </div>
        </div>
        
    )
}