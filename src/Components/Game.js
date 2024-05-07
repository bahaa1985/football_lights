import {React, useState, useEffect} from 'react'
import { useParams, useLocation  } from 'react-router-dom'
import  getGame from '../Api/getGame.js' 
// import Events from "./Events.js";
// import Statistics from "./Statistics.js";
// import LineUp from "./LineUp.js";

function Game(){

    const [gameData,setGameData]=useState([]);
    const params=useParams();
    const [fixtureId,setFixtureId]=useState(0);   
   
    useEffect(()=>{               
         getGame(params.fixtureId).then((result)=>{
            setGameData(result.data.response[0])
        })
        console.log(`game${fixtureId}`);
    },
    [params.fixtureId,fixtureId]
)
console.log("gd",gameData);

    return(
        <div>                            
            <div key={gameData?.fixture?.id} className="fixture-teams">
              <img alt="" src={gameData?.teams?.home?.logo}></img>
              <span className="team">{gameData?.teams?.home?.name}</span>
              <span className="result">{gameData?.goals?.home}</span>
              <span className="result">{gameData?.goals?.away}</span>
              <span className="team">{gameData?.teams?.away?.name}</span>
              <img alt="" src={gameData?.teams?.away?.logo}></img>
            </div>
        </div>
    )
}

export default Game