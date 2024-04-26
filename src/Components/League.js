import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Fixtures from "./Fixtures.js";

export default function League(props){
    
    const season=props.season;
    let {id} = useParams()
    let [tab,setTab]=useState(true)

    return(
        <div>
           <button onClick={()=>setTab("Standing")}>Standing</button> 
           <button onClick={()=>setTab("Fixtures")}>Fixtures</button>
           {
            tab === "Fixtures" ?
            <Fixtures league={id} season={season}/>:null
           }
          
        </div>
    )
}