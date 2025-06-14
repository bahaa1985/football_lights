import React, { useState, useEffect } from "react";
import {
  groupDateFixtures,
  getPromisedTeamFixtures,
} from "../../Api/Fixtures.js";
import "react-calendar/dist/Calendar.css";
import FixtureRow from "../Tools/FixtureRow.jsx";
import { getCookie } from "../../Api/cookie.js";
import Tabs from '../Tools/Tabs.jsx';
import getLocalLabels from "../../Api/Localization.js";
import { getAllTranslations, getTranslation } from "../../multi_language_translations.js";
import { getLeagueTranslationByCountry } from "../../leagues.js";

export default function DayFixtures() {
  function getCurrentDate() {
    const day =
      new Date().getDate() < 10
        ? "0" + new Date().getDate()
        : new Date().getDate();
    const month =
      new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const currentDate =
      year.toString() + "-" + month.toString() + "-" + day.toString();
    return currentDate;
  }

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [dateFixtures, setDateFixtures] = useState([]);
  const [teamsFixtures, setTeamsFixtures] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [activeTab,setActiveTab] = useState(0);
  const [deviceWidth,setDeviceWidth] = useState(window.innerWidth);

  const leagues = getCookie("prefered_leagues");
  const teams = getCookie("prefered_teams");
  const language = getCookie('language') || 'en';

  const labels = getAllTranslations(language.lang);
  console.log('labels',labels);
  
  useEffect(() => {

    async function fetchFixtures() {
      const date_response = await groupDateFixtures(selectedDate);
      const teams_response = await getPromisedTeamFixtures(selectedDate);
      setDateFixtures(date_response);
      setTeamsFixtures(teams_response);
      setLoaded(true);
    }
    fetchFixtures();

    window.addEventListener('resize',()=>{
      setDeviceWidth(window.innerWidth);
    })
    return () =>{
      window.removeEventListener('resize',()=>{
        setDeviceWidth(window.innerWidth);
      })
    }
  }, [selectedDate]);

  function handleSelectedTab(index){
    setActiveTab(index);
  }

  return (
    <div className="w-full sm:w-[65%] mx-auto my-2 bg-slate-50 rounded-md">
      {isLoaded ? (
        (
          <div className="w-full mx-auto rounded-md bg-slate-50 p-2">
            <div className="w-full p-2 text-center text-sm lg:text-lg bg-slate-800 text-slate-50 rounded-md">
              {getTranslation('Fixtures',language.lang) || 'Fixtures'}
            </div>
            {/* date picker */}
            <div className="flex justify-center my-4">
              <input
                type="date"
                onChange={(e) => setSelectedDate(e.target.value)}
                value={selectedDate}
                className="border border-slate-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 shadow-sm transition"
              />
            </div>
            <div className="w-full">
              <Tabs tabs={['Leagues','Teams']} activeTab={activeTab} onTabChange={handleSelectedTab}/>
              <div className="w-full h-auto sm:h-96 sm:overflow-y-scroll">
                {
                  activeTab === 0 ? 
                    dateFixtures? 
                      <FixtureRow  type={"day_matches"}  fixturesSource={dateFixtures} />
                      : 
                      <div className="flex justify-center items-center">
                        { getTranslation('No Current Fixtures',language.lang) }
                      </div>
                  :
                  activeTab === 1 ?
                    teamsFixtures.length>0 ? 
                      <FixtureRow type={"fav_teams_matches"} fixturesSource={teamsFixtures}    />
                      : 
                      <div className="flex justify-center items-center">
                        {getTranslation('No Current Fixtures',language.lang) || 'No Current Fixtures' }
                      </div>  
                  :null                    
                }
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-10">
          Loading ....
        </div>
      )}
    </div>
  );
}
