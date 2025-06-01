import { useState, useEffect } from "react";
import Standings from "./Standing.js";
import LeagueFixtures from "./LeagueFixtures.js";
import TopPlayers from "./TopPlayers.js";
import Favourite from "../Tools/Favourite.jsx";
import Tabs from "../Tools/Tabs.jsx";
import { getLeagues } from "../../Api/LeaguesTeams.js";
import { useParams } from "react-router-dom";
import { getCookie } from "../../Api/cookie.js";
import { getTranslation } from "../../multi_language_translations.js";
import { getLeagueTranslationByCountry } from "../../leagues.js";
import { getCountryNameTranslation } from "../../countries.js";

export default function League() {
  const leagueParam = parseInt(useParams().leagueId);
  const season = parseInt(useParams().season);

  const leagues = getCookie("prefered_leagues");
  const lastSeason = new Date().getFullYear() - 1;

  const seasons = () => {
    let seasonsArr = [];
    for (let i = 2010; i < lastSeason + 1; i++) {
      seasonsArr.push(i);
    }
    return seasonsArr;
  }

  const [activeTab, setActiveTab] = useState(0);
  const [selectedleague, setSelectedLeague] = useState(leagueParam ? leagueParam : leagues[0].id);
  const [selectedSeason, setSelectedSeason] = useState(season ? season : lastSeason);
  const [leagueInfo, setLeagueInfo] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  
  const lang = getCookie('language').lang || 'en';

  useEffect(() => {
    // if (isClicked) {
      async function fetchData() {
        const leagueData = await getLeagues(null, selectedleague);
        setLeagueInfo(leagueData.data.response[0]);
        // setClicked(false);
        setLoaded(true);
      }
      fetchData();
    // }
  }, [selectedleague, selectedSeason])

  function handleSelectedLeague(leagueId) {
    setSelectedLeague(leagueId);
  }

  function handleSelectedSeason(e) {
    setSelectedSeason(e.target.value);
  }

  function handleSelect(league) {
    setSelected(league);
  };

  function handleTabChange(index) {
    setActiveTab(index);
  }

  return (
    <div className="mt-20 w-[95%] max-w-6xl mx-auto">
      {/* Leagues Selector */}
      <div className="flex flex-wrap items-center gap-4 w-full my-6 bg-white rounded-xl shadow p-4">
        <label className="font-semibold text-gray-700">{getTranslation('Your Favourite Leagues', lang)}</label>
        <div className="flex flex-wrap gap-3 items-center">
          {leagues.map((league) => (
            <button
              key={league.id}
              onClick={() => handleSelectedLeague(league.id)}
              className={`flex flex-col items-center px-3 py-2 rounded-lg transition border-2
                ${selectedleague === league.id
                  ? 'border-blue-600 bg-blue-50 shadow'
                  : 'border-transparent hover:bg-gray-100'}`}
              style={{ minWidth: 60 }}
            >
              <img src={league.logo} alt={league.name} className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
              {/* <span className="text-xs mt-1">{league.name}</span> */}
            </button>
          ))}
        </div>
      </div>

      {/* League Info */}
      {isLoaded && leagueInfo && (
        <div className="flex flex-col sm:flex-row gap-3 items-center bg-gradient-to-r from-slate-200 via-slate-400 to-slate-300 rounded-xl p-6 my-6 shadow">
          <div className="flex-shrink-0 flex justify-center items-center w-24 h-24 bg-white rounded-full shadow mr-0 sm:mr-6 mb-4 sm:mb-0">
            <img className="w-16 h-16 sm:w-20 sm:h-20 object-contain" src={leagueInfo?.league.logo} alt={leagueInfo?.league.name} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-2xl sm:text-3xl font-bold text-gray-800 border-none">
                {getLeagueTranslationByCountry(leagueInfo?.country.name, leagueInfo?.league.name)} {lastSeason}/{lastSeason + 1}
              </span>
              <Favourite
                elem_id={leagueInfo?.league.id}
                cookie_name={'prefered_leagues'}
                obj={{
                  id: leagueInfo?.league.id,
                  name: leagueInfo?.league.name,
                  logo: leagueInfo?.league.logo,
                  season: leagueInfo?.seasons.at(-1).year,
                  end: leagueInfo?.seasons.at(-1).end
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <img className="w-8 h-8 rounded object-cover border" src={leagueInfo?.country.flag} alt={leagueInfo?.country.name} />
              <span className="text-lg text-gray-700 border-none">{getCountryNameTranslation(leagueInfo?.country.name, lang)}</span>
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
            onChange={handleSelectedSeason}
            value={selectedSeason}
          >
            {seasons().map((season) => (
              <option key={season} value={season}>{season}</option>
            ))}
          </select>
        </div>
      )}

      {/* Tabs */}
      {isLoaded && (
        <Tabs
          className="w-full sm:w-1/2 md:w-1/3 mx-auto my-4"
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
