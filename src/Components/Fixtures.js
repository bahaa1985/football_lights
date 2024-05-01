import { React } from "react";
import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import getAllFixtures from "../Api/getFixtures.js";
import "../styles/fixtures.css";
import Game from "./Game.js";

function Fixtures(props) {
  const [Fixtures, setFixtures] = useState([]);
  const [fixture, setFixture] = useState(0);
  const [teams, setTeams] = useState([]);
  
  const league = props.league;
  const season = props.season;

  useEffect(() => {
    console.log(league, season);
    getAllFixtures(league, season).then((result) => {
      setFixtures(result.data.response);
    });
  }, [league, season]);

  const groupedFixtures = Fixtures.reduce((group, elem) => {
    const gw = elem.league.round;
    if (group[gw] == null) {
      group[gw] = [];
    }
    group[gw].push(elem);
    return group;
  }, {});

  return (
    <div> 
      <Routes>
        <Route path="/game" element={<Game teams={teams} />}>
          <Route path=":fixture_id"></Route>
        </Route>
      </Routes>   
      {Object.keys(groupedFixtures)
        .sort((a, b) => Date.parse(a) - Date.parse(b))
        .map((elem, gw_index) => {
          // iterate to get GWs
          return (
            <div key={gw_index}>
              <div  className="fixture-date">
                Game Week {gw_index + 1}
              </div>
              {groupedFixtures[elem].map((elem) => {
                //iterate to display GW fixtures
                return ( 
                  <NavLink to={`/game/${elem.fixture.id}?home=${elem.teams.home.id}&away=${elem.teams.away.id}`} >
                    <div key={elem.fixture.id} className="fixture-teams" onClick={(e)=>[e.stopPropagation(),setFixture(elem.fixture.id),setTeams([90,60])]}>
                      <img alt="" src={elem.teams.home.logo}></img>
                      <span className="team">{elem.teams.home.name}</span>
                      <span className="result">{elem.goals.home}</span>
                      <span className="result">{elem.goals.away}</span>
                      <span className="team">{elem.teams.away.name}</span>
                      <img alt="" src={elem.teams.away.logo}></img>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          );
        })}
       
       
    </div>
  );
}

export default Fixtures;
