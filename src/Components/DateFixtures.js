import React ,{useState, useEffect} from "react";
import { groupDateFixtures } from "../Api/getFixtures.js";
import { NavLink } from "react-router-dom";
import FixtureRow from "./FixtureRow.js";

export default function DateFixtures(){

    const [groupFixtures,setGroupFixtures]=useState([]);
    //
    let dates=[{'date':16,'month':7,'year':2024}];
    for(let i=0;i<7 ;i++){
        const nowValue=Date.now();
        const date =new  Date((nowValue+ i*24*60*60*1000));
        const day=date.getDate()<10 ? '0'+ date.getDate(): date.getDate();
        const month=date.getMonth()+1 <10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
        const year=date.getFullYear();
        dates.push({'date':day,'month':month,'year':year});
    }
    // dates[0]=
    const [dateString,setDateString]=useState(dates[0].year.toString()+'-'+dates[0].month.toString()+'-'+dates[0].date.toString())

    useEffect(()=>{
        groupDateFixtures(dateString).then(result=>{
            setGroupFixtures(result);

        })        
    },[dateString])

    
    console.log("date fixtures",groupFixtures);
   
    return(
        <div>
            <div className="flex justify-center m"  display={"flex"} justifyContent={"center"} margin={2}>
                {
                    dates.map((date,index)=>{
                        return(
                        <button className="mx rounded-sm bg-red-950 text-[#fff]"
                            onClick={()=>setDateString(dates[index].year+'-'+dates[index].month+'-'+dates[index].date)}>
                            {date.date + '/' + date.month}
                        </button>)
                    })
                }
            </div>
            {/* selected date fixtures */}
            <div className="max-w-lg">
                <div className="m-2">
                    <span className="text-lg">
                        Fixtures of {dateString}
                    </span>
                </div>
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