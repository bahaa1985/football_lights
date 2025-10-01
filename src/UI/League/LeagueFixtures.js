import { Fragment, React } from "react";
import { useState, useEffect } from "react";
import { groupLeagueFixtures } from "../../api/Fixtures.js";
import { getLeagueRounds, getLeagueTeams } from "../../api/LeaguesTeams.js";
import { getTranslation } from "../../Translation/labels.js";
import { getTeamByArabicName, getTeamByName } from "../../Translation/teams.js";
import { useSelector, useDispatch } from "react-redux";
import { requestsIncrement, resetRequests } from "../../ReduxStore/counterSlice.js";
import FixtureRow from '../../Components/FixtureRow.jsx';
import Spinner from "../../Components/Spinner.jsx";
import { getRoundTranslation } from "../../Translation/leagues.js";

export default function LeagueFixtures(props) {
  const league = props.league;
  const season = props.season;

  const [fixtures, setFixtures] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [filteredFixtures, setFilteredFixtures] = useState([]);
  const [teams,setTeams] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const requests_count = useSelector(state => state.counter.requestsCount);
  const dispatch = useDispatch();

  const lang = JSON.parse(localStorage.getItem('user_preferences')).lang || 'en';

  useEffect(() => {
    async function fetchData() {
      try {
        if(league === '' || season === '') return;
        //
        const fixturesData = await groupLeagueFixtures(league, season);
        const roundsData = await getLeagueRounds(league, season);
        const leagueTeams = await getLeagueTeams(league,season);

        setFixtures(fixturesData);
        setFilteredFixtures(fixturesData);
        setRounds(roundsData.data.response); // round names with translation
        setTeams(leagueTeams.data.response
          .map(elem=>[elem.team.id,lang === 'ar' ? getTeamByName(elem.team.name):elem.team.name]) // teams names with translation
          .sort((a,b)=>a[1].localeCompare(b[1])));
        //
        setLoaded(true);

        //redux reducer increase requests count by one:
        dispatch(requestsIncrement());
      }
      catch(err) {
        alert('ُError in League fixtures')
      }
    }

    if (requests_count < 10) {
      fetchData()
    }
    else {
      alert("API request limit reached. Please wait a minute before making more requests.");
    }

    //reset api requests to zero
    dispatch(resetRequests());

  }, [league, season]);

  

  function filterByRound(e) {
    if (e.target.value !== "") {
      setFilteredFixtures(Object.keys(fixtures).map((elem, index) =>
        fixtures[elem].filter(elem => elem.league.round === rounds[e.target.value])));
      // setFilteredFixtures(rounds[e.target.value] || []); // filter by selected round
    }
    else {
      setFilteredFixtures(fixtures); // reset to original fixtures
    }

  }

  function filterByTeam(e) {
    let value = e.target.value;
    if (value === "") {
      setFilteredFixtures(fixtures); // Reset to original fixtures
    } else {
      setFilteredFixtures(Object.keys(fixtures).map((elem, index) =>
        fixtures[elem].filter((elem) => elem.teams.home.id === parseInt(value) ||
          elem.teams.away.id === parseInt(value)
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
                onChange={(e) => filterByRound(e)}
              >
                <option value="">
                  {rounds[0]?.includes('Regular Season')
                    ? getTranslation('GameWeek', lang)
                    : getTranslation('Round', lang)}
                </option>
                {rounds.map((round, index) => (
                  <option key={index} value={index}>
                    {lang === 'ar' ? getRoundTranslation(round) : round}
                  </option>
                ))}
              </select>
              {/*  */}
              <span className="text-gray-500 border-none">{getTranslation('or', lang)}</span>
              {/*  */}
              <select
                className="p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
                onChange={(e) => filterByTeam(e)}
              >
                <option value="">
                 {getTranslation('Team Name', lang)}
                </option>
                {teams.map((team, index) => (
                  <option key={index} value={team[0]}>
                    {team[1]}                    
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="rounded-lg p-2">
            <FixtureRow type={"all_fixtures"} fixturesSource={filteredFixtures} />
          </div>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
