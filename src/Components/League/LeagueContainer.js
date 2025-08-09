import { useState, useEffect } from "react";
import Standings from "./Standing.js";
import LeagueFixtures from "./LeagueFixtures.js";
import TopPlayers from "./TopPlayers.js";
import Favourite from "../Tools/Favourite.jsx";
import Tabs from "../Tools/Tabs.jsx";
import { getLeagues } from "../../Api/LeaguesTeams.js";
import { useParams } from "react-router-dom";
import { getCookie } from "../../Api/cookie.js";
import { leaguesArray } from "../Tools/Leagues.jsx";
import { getTranslation } from "../Translation/labels.js";
import { getLeagueTranslationByCountry } from "../Translation/leagues.js";
import { getCountryNameTranslation } from "../Translation/countries.js";

export default function League() {
  
  const leagueId = parseInt(useParams().leagueId);

  const preferedLeagues = getCookie("prefered_leagues");

  const [activeTab, setActiveTab] = useState(0);
  const [seasons,setSeasons]=useState([]);
  const [selectedleague, setSelectedLeague] = useState(leagueId ? leagueId : preferedLeagues[0].id);
  const [selectedSeason, setSelectedSeason] = useState(seasons.length > 0  ? seasons.at(-1).year : 2024);
  const [leagueInfo, setLeagueInfo] = useState();
  const [isLoaded, setLoaded] = useState(false);
  
  const lang= JSON.parse(localStorage.getItem("user_preferences"))?.lang || 'en';

  useEffect(() => {
      async function fetchData() {
        const leagueData = await getLeagues(null, selectedleague);
        setLeagueInfo(leagueData.data.response[0]);
        //
        setSeasons(leagueData.data.response[0].seasons);
        // 
        setLoaded(true);
      }
      fetchData();

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
        <div className="flex flex-col sm:flex-row gap-3 items-center bg-gradient-to-r from-slate-200 via-slate-400 to-slate-300 rounded-xl p-6 my-6 shadow">
          <div className="flex-shrink-0 flex justify-center items-center w-24 h-24 rounded-full mr-0 sm:mr-6 mb-4 sm:mb-0">
            <img className="w-16 h-16 sm:w-20 sm:h-20 object-contain" src={leagueInfo?.league.logo} alt={leagueInfo?.league.name} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-2xl sm:text-3xl font-bold text-gray-800 border-none">
                {lang === 'ar' ? 
                  getLeagueTranslationByCountry(leagueInfo?.country.name, leagueInfo?.league.name) 
                    : leagueInfo?.league.name} &nbsp;
                    {selectedSeason}/{(parseInt(selectedSeason.toString())+1)}
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
              <img className="w-12 h-10 rounded object-cover" src={leagueInfo?.country.flag} alt={leagueInfo?.country.name} />
              <span className="text-xl font-bold text-gray-700 border-none">{getCountryNameTranslation(leagueInfo?.country.name, lang)}</span>
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
            onChange={(e)=>setSelectedSeason(e.target.value)}
            
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
