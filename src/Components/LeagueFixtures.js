import { React } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { groupAllFixtures } from "../Api/getFixtures.js";
import "../styles/fixtures.css";

export default function LeagueFixtures(props) {
  
  const league = props.league;
  const season = props.season;

  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    console.log(league, season);
    groupAllFixtures(league, season).then((result) => {
      setFixtures(result.data.response);
    });
  }, [league,season]);

  console.log("fixtures", fixtures);

  return (
    <div>       
      {Object.keys(fixtures)
        .sort((a, b) => Date.parse(a) - Date.parse(b))
        .map((elem, gw_index) => {
          // iterate to get GWs
          return (
            <div key={gw_index}>
              <div  className="fixture-date">
                { parseInt(league)!==2 ? 'Game Week ' + gw_index + 1 : 'Round ' + Object.keys(fixtures)[gw_index]}
              </div>
              {fixtures[elem].map((elem) => {
                //iterate to display GW fixtures
                return ( 
                  <Link to={`/game/${elem.fixture.id}`} >
                    <div>{new Date(elem.fixture.date).toDateString() + ' ' + new Date(elem.fixture.date).toTimeString()}</div>
                    <div key={elem.fixture.id} className="fixture-teams" onClick={(e)=>e.stopPropagation()}>                      
                      <img alt="" src={elem.teams.home.logo}></img>
                      <span className="team">{elem.teams.home.name}</span>
                      <span className="result">{elem.goals.home}</span>
                      <span>{elem.fixture.status.short}</span>
                      <span className="result">{elem.goals.away}</span>
                      <span className="team">{elem.teams.away.name}</span>
                      <img alt="" src={elem.teams.away.logo}></img>
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        })}              
    </div>
  );
}

