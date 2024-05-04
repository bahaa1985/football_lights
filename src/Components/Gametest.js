
import { React, useState , Fragment, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "../styles/fixtures.css";
import   getSelectedGame   from "../Api/getGame.js";
import getAllFixtures from "../Api/getFixtures.js";
import Events from "./Events.js";
import Statistics from "./Statistics.js";
import LineUp from "./LineUp.js";

 function Game() {
  const [tab, setTab] = useState("");
  const [gameData, setGameData] = useState([]);
  const [searchparams] = useSearchParams();
  console.log("search",searchparams);
  const teams = [searchparams.get("home"), searchparams.get("away")]; //get teams ids from url  query string
  let  {fixture_id}  = useParams(); //get fixture id from /game/:fixture_id route

  // get the selected Game from Api:
  useEffect(()=>{
   getAllFixtures(135,2023).then(result=>{
      setGameData(result)
    })
  },[fixture_id])
  console.log("game data",gameData);

  return (
    <div>
      <div key={gameData.fixture.id} className="fixture-teams">
        <img alt="" src={gameData.teams.home.logo}></img>
        <span className="team">{gameData.teams.home.name}</span>
        <span className="result">{gameData.goals.home}</span>
        <span className="result">{gameData.goals.away}</span>
        <span className="team">{gameData.teams.away.name}</span>
        <img alt="" src={gameData.teams.away.logo}></img>
      </div>

      <div className="fixture-details">
        <span
          onClick={(e) => {
            e.stopPropagation();
            setTab("Events");
          }}
        >
          Events
        </span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            setTab("Statistics");
          }}
        >
          Statistics
        </span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            setTab("Line Up");
          }}
        >
          Line Up
        </span>
        <Fragment>
          {
            //to display events, statistics and lineup panes below the fixture,
            //depending on what user click:
            tab === "Events" ? (
              <Events fixture={fixture_id} teams={teams} />
            ) : tab === "Statistics" ? (
              <Statistics fixture={fixture_id} teams={teams} />
            ) : tab === "Line Up" ? (
              <LineUp fixture={fixture_id} teams={teams} />
            ) : null
          }
        </Fragment>
      </div>
    </div>
  );
}

export default Game