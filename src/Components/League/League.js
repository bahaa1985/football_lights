import { useState } from "react";
import Standings from './Standing.js';
import LeagueFixtures from "./LeagueFixtures.js";
import TopPlayers from "./TopPlayers.js";
import { useParams } from "react-router-dom";


export default function League(){
    
    const leagueId=parseInt(useParams().leagueId);
    const season = parseInt(useParams().season);
    console.log("league:",leagueId);console.log("season:",season);
    
    let [tab,setTab]=useState('Fixtures')

    return(
        <div>
            <div className="relative top-20 left-[50%] -translate-x-[50%] w-[90%]">
                <button onClick={()=>setTab("Fixtures")}>Fixtures</button>
                <button onClick={()=>setTab("Standing")}>Standing</button> 
                <button onClick={()=>setTab("TopScorer")}>Top Scorers</button>
                <button onClick={()=>setTab("TopAssists")}>Top Assists</button>
                {
                    tab === "Fixtures" ?
                    <LeagueFixtures league={leagueId} season ={season} />
                    :
                    tab === "Standing" ?
                    <Standings league={leagueId} season={season}/>
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