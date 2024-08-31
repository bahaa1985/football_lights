import { React } from "react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { groupDateFixtures,groupLiveFixtures } from "../Api/getFixtures.js";
import { getCookies, setCookies } from "../Api/cookie.js";
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
        })

        setInterval(()=>{
            groupLiveFixtures().then(result=>{
                setLiveFixtures(result);
            })          
        },1000*60*10)
        
    },[dateString])

    console.log("today",todayFixtures);
    console.log("live",liveFixtures);

    return(
        <div className="relative top-20 left-0 p-4">
                   
            {
                getCookies("prefered_leagues").length>0 ?
                <>
                <div>  
                    <h4>Live</h4>
                    {              
                    liveFixtures?.length > 0 ?
                        <FixtureRow fixturesSource={liveFixtures} />
                    :
                    <p className="text-md font-bold">No current games</p>
                
                    }
                </div>
                <div> 
                    <h4>Today Fixtures</h4>
                    {
                        // todayFixtures.length > 0 ?
                            <FixtureRow fixturesSource={todayFixtures}/>
                        // :
                        // <p className="text-md font-bold">No current games</p>
                    }
                </div>  
                </>
                :<p className="text-md font-bold">Go to Preference and select your prefered leagues.</p>
            }
                     
        </div>         
    )
    
}