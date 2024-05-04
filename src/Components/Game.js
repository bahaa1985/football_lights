import {React, useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import   getSelectedGame   from "../Api/getGame.js";
import Events from "./Events.js";
import Statistics from "./Statistics.js";
import LineUp from "./LineUp.js";

function Game(){

    const [id,setId]=useState(0)
    const [gameData,setGameData]=useState([]);

    useEffect(()=>{
        console.log("ues effect ....")
        // setId(4);
        getSelectedGame(239625).then((result)=>{
            setGameData(result.data.response[0])
        })
    },[])
console.log(gameData);
    return(
        <div>
            Hi Game {id}
            <div key={gameData.fixture.id} className="fixture-teams">
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