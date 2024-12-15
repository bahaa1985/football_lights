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
        <FixtureRow type={"league"} fixturesSource={fixtures} />
    </div>
  );
}

