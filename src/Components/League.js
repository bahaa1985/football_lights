import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Standings from './Standing.js';
import Fixtures from "./Fixtures.js";
import TopPlayers from "./TopPlayers.js";
import { getPreferdLeaguesFromCookie } from "../Api/cookie.js";
import { getLeagues } from "../Api/getLeaguesTeams.js";


export default function League(props){
    
    // const season=props.season;
    let leaguesCookie=getPreferdLeaguesFromCookie();
    // let {leagueId} = useParams()
    let [tab,setTab]=useState(true)
    const [leagueId,setLeagueid]=useState(0);
    const[search,setSearch]=useState('')
    const [season,setSeason]=useState(0);
    const [leagues,setLeagues]=useState([]);

    useEffect(()=>{
        let leaguesArr=[];
        for(const league in leaguesCookie){
            getLeagues(null,league.id)
            .then(result=>{
                leaguesArr.push(result.data.response[0]);
            })
        }
        setLeagues(leaguesArr);

        console.log(`league${leagueId}`)
    })
    return(
        <div>
            <div>
                <select>

                </select>
                <input type="text" onChange={(e)=>setSearch(e.target.value)} />
                {/* div for display search leagues result */}
                <div> 

                </div>
            </div>
            <div>
                <button onClick={()=>setTab("Standing")}>Standing</button> 
                <button onClick={()=>setTab("Fixtures")}>Fixtures</button>
                <button onClick={()=>setTab("TopScorer")}>Top Scorers</button>
                <button onClick={()=>setTab("TopAssists")}>Top Assists</button>
                {
                    tab === "Standing" ?
                    <Standings league={leagueId} season ={season} />
                    :
                    tab === "Fixtures" ?
                    <Fixtures league={leagueId} season={season}/>
                    : tab==="TopScorer" ?
                    <TopPlayers league={leagueId} season={season} type={'goals'} />
                    : tab === "TopAssists" ?
                    <TopPlayers league={leagueId} season={season} type={'assists'} />
                    :null
                }
            </div>
           
          
        </div>
    )
}