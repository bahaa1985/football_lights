import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Fixtures from "./Fixtures.js";
import TopScoresrs from "./TopScorers.js";


export default function League(props){
    
    const season=props.season;

    let {leagueId} = useParams()
    let [tab,setTab]=useState(true)

    useEffect(()=>{
        console.log(`league${leagueId}`)
    })
    return(
        <div>
            <h1>{leagueId}</h1>
           <button onClick={()=>setTab("Standing")}>Standing</button> 
           <button onClick={()=>setTab("Fixtures")}>Fixtures</button>
           <button onClick={()=>setTab("TopScorer")}>Top Scorers</button>
           <button onClick={()=>setTab("TopAssists")}>Top Assists</button>
           {
            tab === "Fixtures" ?
            <Fixtures league={leagueId} season={season}/>
            : tab==="TopScorer" ?
            <TopScoresrs league={leagueId} season={season} />
            // : tab === "TopAssists" 
            :null
           }
          
        </div>
    )
}