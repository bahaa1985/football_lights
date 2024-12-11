import React ,{useState, useEffect} from "react";
import { groupDateFixtures } from "../../Api/getFixtures.js";
import Calendar from 'react-calendar';
import FixtureRow from "./FixtureRow.js";

export default function DayFixtures(){

    const [groupFixtures,setGroupFixtures]=useState([]);
    const [fixturesDate,setFixturesDate]=useState('');
    //
    // let dates=[];
    // for(let i=-1;i<7 ;i++){
    //     const nowValue=Date.now();
    //     const date =new  Date((nowValue+ i*24*60*60*1000));
    //     const day=date.getDate()<10 ? '0'+ date.getDate(): date.getDate();
    //     const month=date.getMonth()+1 <10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
    //     const year=date.getFullYear();
    //     dates.push({'date':day,'month':month,'year':year});
    // }
    // const nowValue=Date.now();
    // const date = new Date(nowValue);
    // const day=date.getDate()<10 ? '0'+ date.getDate(): date.getDate();
    // const month=date.getMonth()+1 <10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
    // const year=date.getFullYear();
    // const dateString=year.toString()+'-'+month.toString()+'-'+day.toString()
    
    function handleSelectedDate(s_date){
        setFixturesDate(s_date);
        const date = new Date(s_date);
        const day=date.getDate()<10 ? '0'+ date.getDate(): date.getDate();
        const month=date.getMonth()+1 <10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
        const year=date.getFullYear();
        const dd =year.toString()+'-'+month.toString()+'-'+day.toString()    
        console.log(dd)
        setFixturesDate(dd);
    }

    useEffect(()=>{
        groupDateFixtures(fixturesDate).then(result=>{
            setGroupFixtures(result);
        })        
    },[fixturesDate])

    
    // console.log("date fixtures",dates);
   
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
            <div className="w-[20%] max-h-fit bg-slate-50">
                <Calendar onChange={handleSelectedDate} value={fixturesDate}></Calendar>
                {/* <input type="date"/> */}
                {/* <Calendar value={fixturesDate} onChange={(e) => setFixturesDate(e.value)} inline showWeek /> */}
            </div>
            {/* selected date fixtures */}
            <div className="w-[40%] mx-auto bg-slate-50">
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