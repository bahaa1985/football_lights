import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Fixtures from "./Fixtures.js";

export default function League(props){
    
    const season=props.season;
    let {league_id} = useParams()
    let [tab,setTab]=useState(true)

    return(
        <div>
            <h1>{league_id}</h1>
           <button onClick={()=>setTab("Standing")}>Standing</button> 
           <button onClick={()=>setTab("Fixtures")}>Fixtures</button>
           {
            tab === "Fixtures" ?
            <Fixtures league={league_id} season={season}/>:null
           }
          
        </div>
    )
}