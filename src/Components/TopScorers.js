import React, {useState,useEffect} from 'react';
import { getTopScorers } from '../Api/getPlayerProfile.js';

export default function TopScoresrs(props) {
    const leagueId=props.league;
    const season=props.season;

    const [topScorers,setTopscorers]=useState([]);

    useEffect(()=>{
        getTopScorers(leagueId,season)
        .then(result=>{
            setTopscorers(result.data.response);
        })
    },[leagueId,season])

    console.log("top", topScorers);
    return(
        <div>
            {
                topScorers?
                topScorers?.map((elem,index)=>{
                    return(
                        <div key={index}>
                            <div>
                                <span>Name</span><span>{elem.player.name}</span><img src={elem.player.photo} alt={elem.player.name} />
                                <span>Team</span><span>{elem.statistics[0].name}</span><img src={elem.statistics[0].team.logo} alt={elem.statistics[0].name} />
                            </div>
                            <div>
                                <span>{elem.statistics[0].goals.total}</span>
                            </div>
                        </div>    
                    )
                })
                :null
            }
        </div>
    )
}

