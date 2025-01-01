import { React } from "react";
import { useState, useEffect } from "react";
import { groupLeagueFixtures } from "../../Api/getFixtures.js";
import FixtureRow from "../Fixtures/FixtureRow.js";

export default function LeagueFixtures(props) {
  const league = props.league;
  const season = props.season;

  const [fixtures, setFixtures] = useState([]);

  const [isLoaded,setLoaded]=useState(false);

  useEffect(() => {
    groupLeagueFixtures(league, season).then((result) => {
      setFixtures(result);
    })
    .then(()=>{
      setLoaded(true);
    })}, []);

  // console.log("fixtures", fixtures);

  return (
    <div className="w-[70%] md:w-[50%] mx-auto">
      {
        isLoaded ? 
        <FixtureRow type={"all_fixtures"} fixturesSource={fixtures} />
        :null
      }
    </div>
  );
}
