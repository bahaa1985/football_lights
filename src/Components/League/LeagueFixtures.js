import { React } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { groupLeagueFixtures } from "../../Api/getFixtures.js";
import FixtureRow from '../Fixtures/FixtureRow.js';
// import "../../styles/fixtures.css";

export default function LeagueFixtures(props) {
  
  const league = props.league;
  const season = props.season;

  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
      groupLeagueFixtures(league, season).then(result => {
      setFixtures(result);
    });
  }, [league,season]);

  console.log("fixtures", fixtures);

  return (
    <div className="">       
      {/* {Object.keys(fixtures)
        .sort((a, b) => Date.parse(a) - Date.parse(b))
        .map((elem, gw_index) => {
          // iterate to get GWs
          return (
            <div key={gw_index}>
              <div  className="bg-slate-500 text-slate-50">
                { parseInt(league)!==2 ? 'Game Week ' + parseInt(gw_index + 1) : 'Round ' + Object.keys(fixtures)[gw_index]}
              </div>
              {fixtures[elem].map((elem) => {
                //iterate to display GW fixtures
                return ( 
                  <Link to={`/game/${elem.fixture.id}`} >
                    <div className="w-full sm:w-[50%]">{new Date(elem.fixture.date).toDateString() + ' ' + new Date(elem.fixture.date).toTimeString()}</div>
                    <div key={elem.fixture.id} className="block sm:flex justify-center" onClick={(e)=>e.stopPropagation()}>                      
                      <div className="flex justify-between space-x-3">
                        <img alt="" className="h-12 w-12" src={elem.teams.home.logo}></img>
                        <span className="team">{elem.teams.home.name}</span>
                        <span className="result">{elem.goals.home}</span>
                      </div>
                      <div className="flex justify-between space-x-3">
                        <span className="result">{elem.goals.away}</span>
                        <span className="team">{elem.teams.away.name}</span>
                        <img alt="" className="h-12 w-12" src={elem.teams.away.logo}></img>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        })}               */}
        <FixtureRow type={"league"} fixturesSource={fixtures} />
    </div>
  );
}

