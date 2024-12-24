import {React, useState, useEffect, Fragment} from 'react'
import { useParams,NavLink  } from 'react-router-dom'
import  getGame from '../../Api/getGame.js' 
import Events from "./Events.js";
import Statistics from "./Statistics.js";
import LineUp from "./LineUp.js";

function Game(){

    const [gameData,setGameData]=useState([]);
    const [tab, setTab] = useState("");
    const params=useParams();
   
    useEffect(()=>{               
         getGame(params.fixtureId).then((result)=>{
            setGameData(result.data.response[0])
        })
    },
    [params.fixtureId]
)
console.log("gd",gameData);

    return(
        <div>                            
            <div key={gameData?.fixture?.id} className="flex justify-around">
              <NavLink to={`/team/${gameData?.teams?.home?.id}?league=${gameData?.league?.id}`}><img alt={gameData?.teams?.home?.name} src={gameData?.teams?.home?.logo}></img></NavLink>
              <NavLink to={`/team/${gameData?.teams?.home?.id}?league=${gameData?.league?.id}`}><span className="team">{gameData?.teams?.home?.name}</span></NavLink>
              <span className="result">{gameData?.goals?.home}</span>
              <span className="result">{gameData?.goals?.away}</span>
              <NavLink to={`/team/${gameData?.teams?.away?.id}?league=${gameData?.league?.id}`}><span className="team">{gameData?.teams?.away?.name}</span></NavLink>
              <NavLink to={`/team/${gameData?.teams?.away?.id}?league=${gameData?.league?.id}`}><img alt={gameData?.teams?.away?.name} src={gameData?.teams?.away?.logo}></img></NavLink>
            </div>

            <div className="fixture-details">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setTab("Events");
          }}
        >
          Events
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setTab("Statistics");
          }}
        >
          Statistics
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setTab("Line Up");
          }}
        >
          Line Up
        </button>
        <Fragment>
          {
            //to display events, statistics and lineup panes below the fixture,
            //depending on what user click:
            tab === "Events" ? (
              <Events fixtureId={gameData?.fixture?.id} teams={gameData?.teams} />
            ) : tab === "Statistics" ? (
              <Statistics fixtureId={gameData?.fixture?.id} teams={gameData?.teams} />
            ) : tab === "Line Up" ? (
              <LineUp fixtureId={gameData?.fixture?.id} teams={gameData?.teams} />
            ) : null
          }
        </Fragment>
      </div>
        </div>
    )
}

export default Game