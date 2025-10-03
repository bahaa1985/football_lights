import { useState, useEffect, useRef } from "react";
import { getLeagues } from "../../api/LeaguesTeams.js";
import { useParams } from "react-router-dom";
import { getCookie } from "../../api/Cookie.js";
import { leaguesArray } from '../../Components/Leagues.jsx';
import { getTranslation } from "../../Translation/labels.js";
import { getLeagueTranslationByCountry } from "../../Translation/leagues.js";
import { getCountryNameBylang } from "../../Translation/countries.js";
import { useSelector, useDispatch } from "react-redux";
import { requestsIncrement, resetRequests } from "../../ReduxStore/counterSlice.js";
import Standings from "./Standing.js";
import LeagueFixtures from "./LeagueFixtures.js";
import TopPlayers from "./TopPlayers.js";
import Favourite from '../../Components/Favourite.jsx';
import Tabs from '../../Components/Tabs.jsx';
import { faEarth } from "@fortawesome/free-solid-svg-icons";


export default function League() {

  const leagueId = parseInt(useParams().leagueId);

  const preferedLeagues = getCookie("prefered_leagues");

  const [activeTab, setActiveTab] = useState(0);
  const [seasons, setSeasons] = useState([]);
  const [selectedleague, setSelectedLeague] = useState(leagueId ? leagueId : preferedLeagues[0].id);
  const [selectedSeason, setSelectedSeason] = useState(seasons.length > 0 ? seasons?.at(seasons.length - 1).year : 2025);
  const [leagueInfo, setLeagueInfo] = useState();
  const [isLoaded, setLoaded] = useState(false);

  const startSeason= useRef(),endSeason=useRef();

  const lang = JSON.parse(localStorage.getItem("user_preferences"))?.lang || 'en';

  const requests_count = useSelector((state) => state.counter.requestsCount);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {

      try {
        const leagueData = await getLeagues(null, selectedleague);
        if (
          !leagueData ||
          !leagueData.data ||
          !leagueData.data.response ||
          leagueData.data.response.length === 0
        ) {
          setLeagueInfo(null);
          setSeasons([]);
          alert(getTranslation('No league data found for the selected league.', lang));
        } else {
          setLeagueInfo(leagueData.data.response[0]);
          setSeasons(leagueData.data.response[0].seasons);
          startSeason.current=leagueData.data.response[0].seasons.at(-1).start;
          endSeason.current = leagueData.data.response[0].seasons.at(-1).end;

          console.log("seasons",startSeason.current,endSeason.current);

        }
        //redux reducer increase requests count by one:
        dispatch(requestsIncrement());
        //
        setLoaded(true);
      } catch (error) {
        setLeagueInfo(null);
        setSeasons([]);
        alert(getTranslation('Failed to load league data. Please try again later.', lang));
      }
    }

    if (requests_count < 10) {
      fetchData();
    }
    else {
      alert("API request limit reached. Please wait a minute before making more requests.");
    }

    //reset api requests to zero
    dispatch(resetRequests());

  }, [selectedleague, selectedSeason])

  function handleSelectedLeague(leagueId) {
    setSelectedLeague(leagueId);
  }

  function handleTabChange(index) {
    setActiveTab(index);
  }

  return (
    <div className="mt-20 w-[95%] max-w-6xl mx-auto">
      {/* Leagues Selector */}
      {
        preferedLeagues.length > 0 && (
          <div className="flex flex-wrap items-center gap-4 w-full my-6 bg-white rounded-xl shadow p-4">
            <label className="font-semibold text-gray-700">{getTranslation('Your Favourite Leagues', lang)}</label>
            <div className="flex flex-wrap gap-3 items-center">
              {preferedLeagues.map((league) => (
                <button
                  key={league.id}
                  onClick={() => [handleSelectedLeague(league.id)]}
                  className={`flex flex-col items-center px-3 py-2 rounded-lg transition border-2
                    ${selectedleague === league.id
                      ? 'border-blue-600 bg-blue-50 shadow'
                      : 'border-transparent hover:bg-gray-100'}`}
                  style={{ minWidth: 60 }}
                >
                  <img src={league.logo} alt={league.name} className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
                </button>
              ))}
            </div>
          </div>
        )}


      {/* League Info */}
      {isLoaded && leagueInfo && (
        <div className="flex flex-col gap-3 items-start bg-gradient-to-r from-slate-200 via-slate-400 to-slate-300 rounded-xl px-4 py-2 my-6 shadow">
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2">
               <img className="w-24 h-24 sm:w-20 sm:h-20 object-contain" src={leagueInfo?.league.logo} alt={leagueInfo?.league.name} />
              <span className="text-2xl sm:text-3xl font-bold text-gray-800 border-none">
                {lang === 'ar' ?
                  getLeagueTranslationByCountry(leagueInfo?.country.name, leagueInfo?.league.name)
                  : leagueInfo?.league.name} &nbsp;
                {selectedSeason}
              </span>
              {
                //To show favourite icon if only the league is in the user's favourites
                !leaguesArray.find(league => league.id === selectedleague) &&
                <Favourite
                  elem_id={selectedleague}
                  cookie_name={'prefered_leagues'}
                  obj={{
                    id: leagueInfo?.league.id,
                    name: leagueInfo?.league.name,
                    logo: leagueInfo?.league.logo,
                    country: leagueInfo?.country.name,
                    season: leagueInfo?.seasons.at(-1).year,
                    end: leagueInfo?.seasons.at(-1).end
                  }}
                />
              }
            </div>
            <div className="flex items-center gap-2">
              {
                leagueInfo?.country.name !== 'World' &&
                <img className="w-12 h-10 rounded object-cover" src={leagueInfo?.country.flag} alt={leagueInfo?.country.name} />
              }
              <span className="text-xl font-bold text-gray-700 border-none">{getCountryNameBylang(leagueInfo?.country.name, lang)}</span>
            </div>
            {/*  */}
                  <div className="w-full">
                    <progress
                    className="w-full h-4 rounded-lg overflow-hidden mt-4"
                    value={
                      Math.floor((Date.now() - Date.parse(startSeason.current)) / (1000 * 60 * 60 * 24))
                    }
                    max={
                      Math.floor((Date.parse(endSeason.current) - Date.parse(startSeason.current)) / (1000 * 60 * 60 * 24))
                    }
                    >
                    {
                      (
                      (Math.floor((Date.now() - Date.parse(startSeason.current)) / (1000 * 60 * 60 * 24)) /
                        Math.floor((Date.parse(endSeason.current) - Date.parse(startSeason.current)) / (1000 * 60 * 60 * 24))
                      ) * 100
                      ).toFixed(2)
                    }%
                    </progress>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span className="border-none">{startSeason.current}</span>
                    <span className="border-none">{endSeason.current}</span>
                    </div>
                  </div>
                </div>
                )}

                {/* Season Selector */}
      {isLoaded && (
        <div className="flex flex-wrap items-center gap-4 bg-white my-6 py-4 px-4 rounded-xl shadow">
          <span className="font-medium text-gray-700 border-none">{getTranslation('Select Season', lang)}</span>
          <select
            className="p-2 border rounded-md bg-gray-50 shadow-sm focus:outline-none w-32"
            onChange={(e) => setSelectedSeason(e.target.value)}
            value={selectedSeason}
          >
            {seasons.map((season) => (
              <option key={season.year} value={season.year}>{season.year}</option>
            ))}
          </select>
        </div>
      )}

      {/* Tabs */}
      {isLoaded && (
        <Tabs
          className="w-full sm:w-1/2 lg:w-1/3 mx-auto my-4"
          tabs={['Fixtures', 'Standings', 'Scorers', 'Assists']}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}

      {/* Tab Content */}
      <div className="p-4 my-6 bg-white rounded-xl shadow">
        {selectedleague && selectedSeason ? (
          activeTab === 0 ? (
            <LeagueFixtures league={selectedleague} season={selectedSeason} />
          ) : activeTab === 1 ? (
            <Standings league={selectedleague} season={selectedSeason} />
          ) : activeTab === 2 ? (
            <TopPlayers league={selectedleague} season={selectedSeason} type={"Goals"} />
          ) : activeTab === 3 ? (
            <TopPlayers league={selectedleague} season={selectedSeason} type={"Assists"} />
          ) : (
            <div className="text-center text-gray-500 py-8">No content available for the selected tab.</div>
          )
        ) : (
          <div className="text-center text-gray-500 py-8">Please select a league and season to view the content.</div>
        )}
      </div>
    </div>
  );
}
