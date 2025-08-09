import { Fragment, React } from "react";
import { useState, useEffect } from "react";
import { groupLeagueFixtures } from "../../Api/Fixtures.js";
import { getLeagueRounds } from "../../Api/LeaguesTeams.js";
import { getCookie } from "../../Api/cookie.js";
import { getTranslation } from "../../Translation/labels.js";
import FixtureRow from '../../Components/FixtureRow.jsx';

export default function LeagueFixtures(props) {
  const league = props.league;
  const season = props.season;
  
  const [fixtures, setFixtures] = useState([]);
  const [rounds,setRounds] = useState([]);
  const [filteredFixtures,setFilteredFixtures]= useState([]);
  const [isLoaded,setLoaded]=useState(false);

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
      console.log("fixtires",filteredFixtures);
      
    }
    fetchData();
  }, [league,season]);

  const lang = getCookie('user_preferences').lang || 'en';

  function filterByGameWeek(e){
    if(e.target.value !== ""){
      setFilteredFixtures(Object.keys(fixtures).map((elem,index)=>
        fixtures[elem].filter(elem => elem.league.round === e.target.value)));
    }
    else{
      setFilteredFixtures(fixtures); // reset to original fixtures
    }
      
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
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-2 mt-2">
      {isLoaded ? (
        <Fragment>
          <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-4 mb-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
              <span className="font-semibold text-gray-700 border-none">{getTranslation('Filter By', lang)}</span>
              <select
                className="p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
                onChange={filterByGameWeek}
              >
                <option value="">
                  {rounds[0]?.includes('Regular Season')
                    ? getTranslation('GameWeek', lang)
                    : getTranslation('Round', lang)}
                </option>
                {rounds.map((round, index) => (
                  <option key={index} value={round}>
                    {round.includes('Regular Season')
                      ? round.replace('Regular Season', 'GameWeek')
                      : round}
                  </option>
                ))}
              </select>
              <span className="text-gray-500 border-none">{getTranslation('or', lang)}</span>
              <input
                className="p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
                type="text"
                placeholder={getTranslation('Enter Team Name', lang)}
                onChange={filterByTeam}
              />
            </div>
          </div>
          <div className="rounded-lg p-2">
            <FixtureRow type={"all_fixtures"} fixturesSource={filteredFixtures} />
          </div>
        </Fragment>
      ) : (
        <div className="flex justify-center items-center h-40">
          <span className="text-blue-500 font-semibold text-lg border-none">Loading ...</span>
        </div>
      )}
    </div>
  );
}
