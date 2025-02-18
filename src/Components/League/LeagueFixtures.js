import { Fragment, React } from "react";
import { useState, useEffect } from "react";
import { groupLeagueFixtures } from "../../Api/getFixtures.js";

import FixtureRow from "../Fixtures/FixtureRow.jsx";

export default function LeagueFixtures(props) {
  const league = props.league;
  const season = props.season;

  console.log("ll",league);
  
  const [fixtures, setFixtures] = useState([]);

  const [isLoaded,setLoaded]=useState(false);

  useEffect(() => {
    async function fetchData(){
      
      const fixturesData = await groupLeagueFixtures(league, season);
      setFixtures(fixturesData);
      //
      setLoaded(true);
    }
    fetchData();
  }, []);

  return (
    <div className="w-[70%] md:w-[50%] mx-auto">
      {
        isLoaded ? 
        (<div className="absolute hidden left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-10">Loading ....</div>,
          <FixtureRow type={"all_fixtures"} fixturesSource={fixtures} />

        )
        :
        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-10">Loading ....</div>
      }
    </div>
  );
}
