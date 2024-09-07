import { React } from "react";
import { useState, useEffect } from "react";
import { groupDateFixtures } from "../Api/getFixtures.js";
import { getCookie, setCookie } from "../Api/cookie.js";
import FixtureRow from "./FixtureRow.js";

export default function CurrentFixtures(props) {

    const [liveFixtures,setLiveFixtures]=useState([]);
    const [todayFixtures,setToDayFixtures]=useState([])

    // Get current date
    var currentDate = new Date();

    // Extract date components
    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Months are zero based
    var day = ('0' + currentDate.getDate()).slice(-2);

    // Form the date string in 'yyyy-mm-dd' format
    var dateString = year.toString() + '-' + month.toString() + '-' + day.toString();

    useEffect(()=>{            

        groupDateFixtures(dateString).then(result=>{
            setToDayFixtures(result);
        });

        setInterval(()=>{ //to update live fixtures events every 10 minutes
            groupDateFixtures(dateString).then(result=>{
            setToDayFixtures(result);
        })         
        },1000*60*10)
        
    },[dateString])

    console.log("today",todayFixtures);
    
    return(
        <div className="relative top-20 left-0 p-4">
                   
            {
                getCookie("prefered_leagues").length>0 ?
                <>
                {/* <div>  
                    <h4>Live</h4>
                    {              
                    liveFixtures?.length > 0 ?
                        <FixtureRow fixturesSource={liveFixtures} />
                    :
                    <p className="text-md font-bold">No current games</p>                
                    }
                </div> */}
                <div> 
                    <h4>Today Fixtures</h4>
                    {
                       <FixtureRow fixturesSource={todayFixtures}/>
                    }
                </div>  
                </>
                :<p className="text-md font-bold">Go to Preference and select your prefered leagues.</p>
            }
                     
        </div>         
    )
    
}