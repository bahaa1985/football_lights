import { React, useState, createContext } from 'react'
import { useParams, useLocation, NavLink } from 'react-router-dom'
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import arena from '../../icons/arena.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTranslation } from '../../Translation/labels.js';
import { getLeagueTranslationByCountry, getRoundTranslation } from '../../Translation/leagues.js';
import { getTeamByName } from '../../Translation/teams.js';
import Events from "./Events.js";
import Statistics from "./Statistics.js";
import LineUp from "./LineUp.js";
import Tabs from '../../Components/Tabs.jsx'

export const TeamsContext = createContext();

function Fixture() {

  const params = useParams();
  const fixtureId = params.fixtureId;
  const fixture_data = useLocation().state?.fixture_data;
  console.log("fixture_data", fixture_data);

  const [tab, setTab] = useState(0);
  const lang = JSON.parse(localStorage.getItem('user_preferences'))?.lang || 'en';

  const handleTabChange = (index) => {
    setTab(index);
  };

  return (
    <TeamsContext.Provider value={fixture_data.teams} className="w-full">

      <div className="flex-1  mt-20 font-bold h-full">
        {/*  */}
        <div className='w-[90%] flex flex-col justify-center items-center sm:w-[80%] lg:w-[60%] bg-gradient-to-r from-slate-200 via-slate-400 to-slate-300 rounded-md 
        p-2 my-2 mx-auto'>
          {/* league info */}
          <div className='flex flex-col justify-center  space-y-1 items-center
           py-2 border-b sm:border-none text-md sm:text-xl border-solid border-slate-400'>
            <div className='flex flex-row justify-start items-center gap-2'>
              <img className='size-8 sm:size-16' referrerPolicy="no-referrer" src={fixture_data.league.logo} alt={fixture_data.league.name} />
              <span className='border-none text-sm sm:text-lg'>{lang === 'ar' ? getLeagueTranslationByCountry(fixture_data.league.country, fixture_data.league.name) : fixture_data.league.name} {fixture_data.league.season}</span>
              <span className='border-none text-sm sm:text-lg'>{lang === 'ar' ? getRoundTranslation(fixture_data.league.round) : fixture_data.league.round}</span>
            </div>
            <div className='flex flex-row justify-start items-center space-x-2'>

            </div>
          </div>
          {/* score table */}
          <div key={fixture_data.fixture?.id} className="flex justify-around space-x-2 md:space-x-0 w-full md:w-[80%] xl:w-[50%] items-center mx-auto py-2 
           text-sm sm:text-lg border-b sm:border-none border-solid border-slate-400">
            <NavLink className='flex flex-row justify-start gap-2 items-center w-[40%]' to={`/teams/${fixture_data.teams.home.id}?league=${fixture_data.league.id}`}>
              <img className="size-6 sm:size-10" referrerPolicy="no-referrer" alt={lang === 'ar' ? getTeamByName(fixture_data.teams.home.name) : fixture_data.teams?.home?.name} src={fixture_data.teams?.home?.logo}></img>
              <span className='border-none ml-0'>{lang === 'ar' ? getTeamByName(fixture_data.teams.home.name) : fixture_data.teams.home.name}</span>
            </NavLink>
            <div className='flex flex-row justify-between  w-[20%]'>
              <span className="size-6 sm:size-8 border-none bg-slate-900 text-slate-50 flex justify-center items-center text-sm sm:text-lg">{fixture_data.goals?.home}</span>
              <span className="size-6 sm:size-8 border-none bg-slate-900 text-slate-50 flex justify-center items-center text-sm sm:text-lg">{fixture_data.goals?.away}</span>
            </div>

            <NavLink className='flex flex-row justify-end gap-2 items-center w-[40%]' to={`/teams/${fixture_data.teams.away.id}?league=${fixture_data.league.id}`}>
              <span className='border-none mr-0'>{lang === 'ar' ? getTeamByName(fixture_data.teams.away.name) : fixture_data.teams.away.name}</span>
              <img className="size-6 sm:size-10" referrerPolicy="no-referrer" alt={getTeamByName(fixture_data.teams?.away?.name)} src={fixture_data.teams?.away?.logo}></img>
            </NavLink>
          </div>
          {/* fixture info */}
          <div className='flex flex-row flex-wrap justify-start items-center gap-2 sm:gap-4 py-2'>
            {/* fixture status */}
            <div className='flex flex-row justify-between items-center gap-2'>
              {
                fixture_data.fixture.status.short === "1H" ||
                  fixture_data.fixture.status.short === "2H" ||
                  fixture_data.fixture.status.short === "HT" ||
                  fixture_data.fixture.short === "ET" ||
                  fixture_data.fixture.short === "BT" ||
                  fixture_data.fixture.short === "P" ||
                  fixture_data.fixture.short === "SUSB" ||
                  fixture_data.fixture.short === "INT" ? ( //if the game is live show the red dot
                  <span className="text-lg font-bold border-none text-red-700 animate-pulse">{fixture_data.fixture.status.short}</span>
                ) : null
              }
            </div>
            {/* fixture time */}
            <div className="flex flex-row justify-between items-center gap-2">
              <FontAwesomeIcon icon={faClock} />
              <span className='border-none text-xs sm:text-lg'>{new Date(fixture_data.fixture.date).getHours() +
                ":" + (new Date(fixture_data.fixture.date).getMinutes().toString().length < 2 ?
                  "0" + new Date(fixture_data.fixture.date).getMinutes().toString()
                  : new Date(fixture_data.fixture.date).getMinutes().toString())}
              </span>
            </div>
            {/* fixture date */}
            <div className="flex flex-row justify-between items-center gap-2">
              <FontAwesomeIcon icon={faCalendar} size='' />
              <span className='border-none text-xs sm:text-lg'>{new Date(fixture_data.fixture.date).toDateString()}</span>
            </div>
            {/* fixture arena */}
            <div className="flex flex-row justify-between items-center gap-2">
              <img className='w-8 h-8' referrerPolicy="no-referrer" src={arena} alt='Arena' />
              <span className='border-none text-xs sm:text-lg'>{fixture_data.fixture.venue.name}, {fixture_data.fixture.venue.city}</span>
            </div>
          </div>

        </div>

        <div className='w-[90%] sm:w-96 mx-auto  border-b border-solid border-slate-800 text-center'>
          {/* tabs */}
          <Tabs tabs={[getTranslation('Line Up', lang), getTranslation('Events', lang), getTranslation('Statistics', lang)]} activeTab={tab} onTabChange={handleTabChange} />

        </div>
        <div class="w-[90%] mx-auto">

          {
            // to display events, statistics and lineup panes below the fixture,
            // depending on what user click:
            tab === 0 ? (
              <LineUp fixtureId={fixtureId} teams={fixture_data?.teams} />
            ) : tab === 1 ? (
              <Events fixtureId={fixtureId} teams={fixture_data?.teams} />
            ) : tab === 2 ? (
              <Statistics fixtureId={fixtureId} teams={fixture_data?.teams} />
            ) : null
          }

        </div>
      </div>
    </TeamsContext.Provider>
  )
}

export default Fixture