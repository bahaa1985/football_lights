import { React } from "react";
import { useState, useEffect } from "react";
import { groupDateFixtures,groupLiveFixtures } from "../../Api/getFixtures.js";
import { getCookie, setCookie } from "../../Api/cookie.js";
import FixtureRow from "../Fixtures/FixtureRow.jsx";

export default function LiveFixtures(props) {

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

        // groupDateFixtures(dateString).then(result=>{
        //     setToDayFixtures(result);
        // });
        groupLiveFixtures().then((result)=>{
            setLiveFixtures(result)  
        })

        setInterval(()=>{ //to update live fixtures events every 10 minutes
            groupLiveFixtures().then((result)=>{
              setLiveFixtures(result)            
        })         
        },1000*60*10)
        
    },[dateString])

    console.log("live",liveFixtures);
    
    return(
        <div className="relative top-20 left-0 p-4">
                   
            {
                getCookie("prefered_leagues").length > 0 ?
                <>
                <div>  
                    <div className="flex ml-auto">
                        <span class="relative flex h-3 w-3">
                            <span class="animate-ping absolute top-[50%]   inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span class="relative top-[50%] inline-flex rounded-full h-3 w-3 bg-red-700"></span>
                        </span>
                        <span className={` ${liveFixtures?.length > 0 ? "text-red-800" : "text-slate-500"} `}>{"  Live"}</span>
                    </div>
                    {              
                    liveFixtures ?
                        <FixtureRow fixturesSource={liveFixtures} />
                    :
                    <p className="text-md font-bold">No live games</p>                
                    }
                </div>
                {/* <div> 
                    <h4>Today Fixtures</h4>
                    {
                       <FixtureRow fixturesSource={todayFixtures}/>
                    }
                </div>   */}
                </>
                :<p className="text-md font-bold">Go to Preference and select your prefered leagues.</p>
            }
                     
        </div>         
    )
    
}