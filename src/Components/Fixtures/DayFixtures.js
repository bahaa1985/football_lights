import React ,{useState, useEffect} from "react";
import { groupDateFixtures } from "../../Api/getFixtures.js";
// import  Calendar  from 'primereact/calendar/calendar.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FixtureRow from "./FixtureRow.js";

export default function DayFixtures(){

    const [groupFixtures,setGroupFixtures]=useState([]);
    const [fixturesDate,setFixturesDate]=useState('');
    
    useEffect(()=>{
        groupDateFixtures(fixturesDate).then(result=>{
            setGroupFixtures(result);
        })        
    },[fixturesDate])

    // 
    const handleDateChange = (date) => {
        const day=date.getDate()<10 ? '0'+ date.getDate(): date.getDate();
        const month=date.getMonth()+1 <10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
        const year=date.getFullYear();
        const dateString=year.toString()+'-'+month.toString()+'-'+day.toString();
        setFixturesDate(dateString);
        console.log("Selected date:", dateString);
    };
   
    return(
        <div className="relative top-20 left-[50%] -translate-x-[50%] w-[90%] flex justify-between">
            {/* <div className="flex justify-center mx-auto">
                {
                    dates.map((date,index)=>{
                        return(
                        <button key={index} className="w-auto text-lg mx-2 p-2  rounded-md bg-slate-900 text-[#fff]"
                            onClick={()=>setDateString(dates[index].year+'-'+dates[index].month+'-'+dates[index].date)}>
                            {date.date + '/' + date.month}
                        </button>)
                    })
                }
            </div> */}
            <div className="w-[30%] ">
            <Calendar onChange={handleDateChange} className="rounded-md bg-slate-50" />
                {/* <input type="date"/> */}
                {/* <Calendar value={fixturesDate} onChange={(e) => console.log("calenadar:",e.value)} inline  /> */}
            </div>
            {/* selected date fixtures */}
            <div className="sm:w-[40%]  mx-auto rounded-md bg-slate-50 p-2">
                {
                    groupFixtures?
                    <FixtureRow fixturesSource={groupFixtures}/>
                    :
                    <p>No current games</p>
                }
            </div>
        </div>
        
    )
}