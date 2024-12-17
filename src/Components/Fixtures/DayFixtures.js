import React ,{useState, useEffect} from "react";
import { groupDateFixtures, getPromisedTeamFixtures } from "../../Api/getFixtures.js";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FixtureRow from "./FixtureRow.js";

export default function DayFixtures(){

    const [selectedDate,setSelectedDate]=useState('');
    const [dateFixtures,setDateFixtures]=useState([]);
    const [teamsFixtures,setTeamsFixtures]=useState([]);
    
    useEffect(()=>{
        // groupDateFixtures(selectedDate).then(result=>{
        //     setDateFixtures(result);
        // });
        
        getPromisedTeamFixtures().then(result=>{
            setTeamsFixtures(result)
        })
    },[selectedDate])

    // 
    const handleDateChange = (date) => {
        const day=date.getDate()<10 ? '0'+ date.getDate(): date.getDate();
        const month=date.getMonth()+1 <10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
        const year=date.getFullYear();
        const dateString=year.toString()+'-'+month.toString()+'-'+day.toString();
        setSelectedDate(dateString);
        console.log("Selected date:", dateString);
    };
   
    console.log("team fix:",teamsFixtures);
    

    return(
        <div className="relative top-20 left-[50%] -translate-x-[50%] w-[90%] flex justify-between">           
            
            {/* selected date fixtures */}
            <div className="xs: sm:w-[90%] sm:flex justify-around  mx-auto rounded-md bg-slate-50 p-2">
                <div className="relative top-2 z-10">
                    <Calendar onChange={handleDateChange} className="rounded-md bg-slate-50" />              
                </div>
                {/* favourite champions games */}
                <div>
                {
                    dateFixtures?
                    <FixtureRow type={"day_matches"} fixturesSource={dateFixtures}/>
                    :
                    <p>No current games</p>
                }
                </div>
                {/* favourite teams games */}
                <div>
                {
                    teamsFixtures.length>0?
                    <FixtureRow type={"fav_teams_matches"} fixturesSource={teamsFixtures}/>
                    :
                    <p>No current games</p>
                }
                </div>
                
            </div>
        </div>
        
    )
}