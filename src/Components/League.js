import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Standings from './Standing.js';
import LeagueFixtures from "./LeagueFixtures.js";
import TopPlayers from "./TopPlayers.js";
import { getPreferdLeaguesFromCookie } from "../Api/cookie.js";
import { getLeagues } from "../Api/getLeaguesTeams.js";


export default function League(props){
    
    // const season=props.season;
    let leaguesCookie=getPreferdLeaguesFromCookie();
    // let {leagueId} = useParams()
    let [tab,setTab]=useState(true)
    const [leagueId,setLeagueId]=useState(0);
    const[search,setSearch]=useState('')
    const [season,setSeason]=useState(0);
    const [leagues,setLeagues]=useState([]);

    useEffect(()=>{
        let leaguesArr=[];
        for(let i=0;i < leaguesCookie.length ; i++){
            setLeagueId(leaguesCookie[i].id);
            getLeagues(null,leaguesCookie[i].id)
            .then(result=>{
                leaguesArr.push(result.data.response[0]);
                setLeagues(leaguesArr);
            })
        }
       
    },[])

    console.log("leagues",leagues)

    return(
        <div>
            <div>
                <select>
                {
                    leagues?.map((elem,index)=>{
                        return(
                            // <option key={index} value={elem?.league.id}>
                                <div key={index}>
                                    <span>{elem?.league.name}</span>
                                    <img src={elem?.league.logo} alt={elem?.league.name} />
                                </div>
                            // </option>
                        )
                    })
                }
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
                    <LeagueFixtures league={leagueId} season={season}/>
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