import { useState, useEffect } from "react";
import Standings from "./Standing.js";
import LeagueFixtures from "./LeagueFixtures.js";
import TopPlayers from "./TopPlayers.js";
import Favourite from "../Tools/Favourite.jsx";
import Tabs from "../Tools/Tabs.jsx";
import { getLeagues } from "../../Api/LeaguesTeams.js";
import { useParams } from "react-router-dom";
import { getCookie } from "../../Api/cookie.js";

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
  const [isDisabled, setDisabled] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

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
    // handleTabChange(-1);
    // handleTabChange(0);
    // setDisabled(false);
  }

  function handleSelectedSeason(e) {
    setSelectedSeason(e.target.value);
    // handleTabChange(-1);
    // handleTabChange(0);
    // setDisabled(false);
  }

  function handleTabChange(index) {
    setActiveTab(index);
  }

  return (
    <div className="relative top-20 w-[90%] mx-auto">
     
      <div className="w-full my-4 bg-slate-50 rounded-md p-2">
         {/* Leagues dropdown */}
         <div className="flex flex-row justify-around items-center w-full sm:w-[50%]">
          <label className="w-44">Select League</label>
          {leagues.map((league, index) => (
              <div
                key={index}
                onClick={() => [handleSelect(league), handleSelectedLeague(league.id),console.log('kioploiu',selectedleague)
                ]}
                className="flex flex-col items-center px-4 py-2 hover:bg-gray-100 cursor-pointer space-x-2"
              >
                <img src={league.logo} alt={league.name} className="size-6 sm:size-10" />
                <span className="text-sm text-center border-none">{league.name}</span>
              </div>
            ))}
         </div>
        {/* <div className="w-full flex justify-start space-x-2 my-4">
          <span className="w-30 h-auto my-auto border-none text-slate-900">Select League</span>
          <div className="w-auto flex flex-wrap justify-start space-x-2">
            {
              leagues.length > 0 ? (
                <div className="auto">
                  <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex items-center justify-between border px-4 py-2 rounded bg-white shadow"
                  >
                    {selected ? (
                      <div className="flex items-center space-x-2">
                        <img src={selected.logo} alt={selected.name} className="w-6 h-6" />
                        <span className="border-none">{selected.name}</span>
                      </div>
                    ) : (
                      <span className="border-none">Select a league</span>
                    )}
                    <span className="border-none">▼</span>
                  </button>

                  {open && (
                    <div className="absolute z-10 mt-2 w--[50%] border rounded bg-white shadow">
                      {leagues.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => [handleSelect(option), handleSelectedLeague(option.id)]}
                          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer space-x-2"
                        >
                          <img src={option.logo} alt={option.name} className="w-6 h-6" />
                          <span className="text-sm md:text-lg border-none">{option.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null
            }
          </div>
        </div> */}
        
        {/* Button */}
        {/* <div className="w-full flex justify-center  my-4">
          <button className={`rounded-lg w-40 p-2 ${!isDisabled ? 'cursor-pointer bg-slate-400 text-slate-900' : 'cursor-default bg-slate-800 text-slate-50'}`}
            onClick={() => [setClicked(true), setDisabled(true)]}
            disabled={isDisabled ? true : false}>
            Display
          </button>
        </div> */}
      </div>    
      {
        isLoaded ?         
          <div className="w-[90%] mx-auto">  {/* league info */}
            <div className="flex justify-center bg-gradient-to-r from-slate-300 via-slate-500 to-slate-400 rounded-lg p-4 my-4">
              <div className="flex justify-start items-center w-[15%] mx-2">
                <img className="w-14 h-14 sm:w-24 sm:h-24" src={leagueInfo?.league.logo} alt={leagueInfo?.league.name} />
              </div>
              <div className="w-[85%] mx-2">
                <div className="flex flex-row justify-start items-center space-x-2">
                  <span className="text-[30px] border-none">{leagueInfo?.league.name} {lastSeason}/{lastSeason + 1}</span>
                  <Favourite elem_id={leagueInfo?.league.id} cookie_name={'prefered_leagues'}
                    obj={
                      {
                        id: leagueInfo?.league.id,
                        name: leagueInfo?.league.name,
                        logo: leagueInfo?.league.logo,
                        season: leagueInfo?.seasons.at(-1).year,
                        end: leagueInfo?.seasons.at(-1).end
                      }}
                  />
                </div>
                <div className="flex justify-start space-x-2">
                  <img className="w-16 h-16 rounded" src={leagueInfo?.country.flag} alt={leagueInfo?.country.name} />
                  <span className="w-auto my-auto text-[20px] border-none">{leagueInfo?.country.name}</span>
                </div>
              </div>
            </div>
            {/* seasons dropdown  */}
            <div className="flex justify-center items-center space-x-3 bg-slate-50 my-4 py-3">
              <span className="w-30 border-none text-slate-900">Select Season</span>
              <select className="p-2 border rounded-md bg-white shadow-sm focus:outline-none w-full sm:w-auto" onChange={(e) => [handleSelectedSeason(e),console.log('yyyy',selectedSeason)
              ]} value={selectedSeason}>
                {
                  seasons().map((season, index) => {
                    return (
                      <option key={index} value={season}>{season}</option>
                    )
                  })
                }
              </select>
            </div>
            {/* tabs */}
            <Tabs className="w-full sm:w-1/3 md:w-1/4 mx-auto my-2 sm:my-4" tabs={['Fixtures', 'Standings', 'Scorers', 'Assists']} activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
          : null
      }

      {        
          <div className="bg-slate-50 rounded-lg p-2 my-2 sm:my-4">
            { 
            selectedleague && selectedSeason ? (
              activeTab === 0 ? (
                <LeagueFixtures league={selectedleague} season={selectedSeason} />
              ) : activeTab === 1 ? (
                <Standings league={selectedleague} season={selectedSeason} />
              ) : activeTab === 2 ? (
                <TopPlayers league={selectedleague} season={selectedSeason} type={"Goals"} />
              ) : activeTab === 3 ? (
                <TopPlayers league={selectedleague} season={selectedSeason} type={"Assists"} />
              ) : (
                <div>No content available for the selected tab.</div>
              )
            ) : (
              <div>Please select a league and season to view the content.</div>
            )}
          </div>
      }
    </div>
  );
}
