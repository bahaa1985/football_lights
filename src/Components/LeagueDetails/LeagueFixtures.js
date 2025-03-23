import { Fragment, React } from "react";
import { useState, useEffect } from "react";
import { groupLeagueFixtures } from "../../Api/getFixtures.js";
import { getLeagueRounds } from "../../Api/getLeaguesTeams.js";

import FixtureRow from "../Fixtures/FixtureRow.jsx";

export default function LeagueFixtures(props) {
  const league = props.league;
  const season = props.season;
  
  const [fixtures, setFixtures] = useState([]);
  const [rounds,setRounds] = useState([]);
  const [filteredFixtures,setFilteredFixtures]= useState([]);
  const [isLoaded,setLoaded]=useState(false);
  const [firstRound,setFirstRound] = useState("");

  useEffect(() => {
    async function fetchData(){
      
      const fixturesData = await groupLeagueFixtures(league, season);
      const roundsData = await getLeagueRounds(league,season);
      setFixtures(fixturesData);
      setFilteredFixtures(fixturesData);  
      setRounds(roundsData.data.response); 
      // setFirstRound(Object.keys(fixtures[Object.keys(fixturesData)[0]][0].league.round));      
      //
      setLoaded(true);
    }
    fetchData();
  }, []);

  function filterByGameWeek(e){
      setFilteredFixtures(Object.keys(fixtures).map((elem,index)=>
        fixtures[elem].filter(elem => elem.league.round === e.target.value)));
  }

  function filterByTeam(e){
    const value = e.target.value.toLowerCase();
    if (value === "") {
      setFilteredFixtures(fixtures); // Reset to original fixtures
    } else {
      setFilteredFixtures(Object.keys(fixtures).map((elem, index) =>
        fixtures[elem].filter((elem) => elem.teams.home.name.toLowerCase().includes(value) || 
      elem.teams.away.name.toLowerCase().includes(value)
      )));
      
    }
  }

  return (
    <div className="w-[70%] lg:w-[50%] mx-auto">
      {
        isLoaded ? 
        <Fragment>
          <div className="absolute hidden left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-10">Loading ....</div>
          <div className="w-full flex justify-start space-x-2 flex-wrap my-2">
            <span className="border-none">Filter by</span>
            {/* <input className="w-52 border border-solid border-slate-800 rounded-sm" type="text" placeholder="Enter number of game week" onChange={(e)=>filteringByGW(e)} /> */}
            <select className="w-52 border border-solid border-slate-800 rounded-sm" onChange={(e)=>filterByGameWeek(e)} >
              <option value="">{rounds[0].includes('Regular Season') ? 'Select GameWeek' : 'Select Round'}</option>
              {
                    rounds.map((round,index)=>{
                      return(
                        <option key={index} value={round}>{round.includes('Regular Season') ? round.replace('Regular Season','GameWeek') : round}</option>
                      )
                    })
              }
            </select>
            <input className="w-52 border border-solid border-slate-800 rounded-sm"type="text" placeholder="Enter team name" onChange={(e)=>filterByTeam(e)} />
          </div>
          <FixtureRow type={"all_fixtures"} fixturesSource={filteredFixtures} />
        </Fragment>
        :
        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-10">Loading ....</div>
      }
    </div>
  );
}
