import {React, useState, useEffect} from 'react'
import { useParams  } from 'react-router-dom'
import  getGame from '../Api/getGame.js' 
// import Events from "./Events.js";
// import Statistics from "./Statistics.js";
// import LineUp from "./LineUp.js";

function Game(){

    const [gameData,setGameData]=useState([]);
    const params=useParams();
    // const [fixtureId,setFixtureId]=useState(0);
    console.log("fixture id:",params.fixtureId);
   
    useEffect(()=>{       
        // setFixtureId(params.fixtureId);
         getGame(params.fixtureId).then((result)=>{
            setGameData(result.data.response[0])
        })
        console.log(`game${params.fixtureId}`);
    },
    [params.fixtureId,gameData]
)
console.log("gd",gameData);

    return(
        <div>                  
            {/* <div key={fixtureId} className="fixture-teams">
              <img alt="" src={gameData?.teams.home.logo}></img>
              <span className="team">{gameData?.teams.home?.name}</span>
              <span className="result">{gameData?.goals.home}</span>
              <span className="result">{gameData?.goals.away}</span>
              <span className="team">{gameData?.teams.away.name}</span>
              <img alt="" src={gameData?.teams.away.logo}></img>
            </div> */}
        </div>
    )
}

export default Game