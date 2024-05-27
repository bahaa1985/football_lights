import React, {useState,useEffect} from 'react';
import { getTopAssists} from '../Api/getPlayerProfile.js';

export default function TopScoresrs(props) {
    const leagueId=props.league;
    const season=props.season;

    const [topAssists,setTopAssists]=useState([]);

    useEffect(()=>{
        getTopAssists(leagueId,season)
        .then(result=>{
            setTopAssists(result.data.response);
        })
    },[leagueId,season])

    // console.log("top", topAssists);
    return(
        <div>
            {
                topAssists?
                topAssists?.map((elem,index)=>{
                    return(
                        <div key={index}>
                            <div>
                                <span>Name</span><span>{elem.player.name}</span><img src={elem.player.photo} alt={elem.player.name} />
                                <span>Team</span><span>{elem.statistics[0].name}</span><img src={elem.statistics[0].team.logo} alt={elem.statistics[0].name} />
                            </div>
                            <div>
                                <span>{elem.statistics[0].goals.assists}</span>
                            </div>
                        </div>    
                    )
                })
                :null
            }
        </div>
    )
}

