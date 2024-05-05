import {React, useState, useEffect} from 'react'
import { useParams  } from 'react-router-dom'
import  getGame from '../Api/getGame.js' 
// import Events from "./Events.js";
// import Statistics from "./Statistics.js";
// import LineUp from "./LineUp.js";

function Game(){

    const [gameData,setGameData]=useState([]);
    const [fixtureId,setFixtureId]=useState(parseInt(useParams().fixtureId));
    // setFixtureId(parseInt(useParams()))
    useEffect(()=>{             
        getGame(fixtureId).then((result)=>{
            setGameData(result.data.response[0])
        })
        console.log("gd",gameData);
    },
    [fixtureId,gameData]
)
    
    return(
        <div>                    
            <div key={fixtureId} className="fixture-teams">
              <img alt="" src={gameData.teams.home.logo}></img>
              <span className="team">{gameData.teams.home.name}</span>
              <span className="result">{gameData.goals.home}</span>
              <span className="result">{gameData.goals.away}</span>
              <span className="team">{gameData.teams.away.name}</span>
              <img alt="" src={gameData.teams.away.logo}></img>
            </div>
        </div>
    )
}

export default Game