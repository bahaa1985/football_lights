import {React, useState, useEffect, useMemo, createContext, memo} from 'react'
import { useParams,useLocation,NavLink  } from 'react-router-dom'
// import getFixture from '../../Api/getFixture.js' 
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import arena from '../../icons/arena.png';
import Events from "./Events.js";
import Statistics from "./Statistics.js";
import LineUp from "./LineUp.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TeamsContext= createContext();

function Fixture(){

    const params=useParams();
    const fixtureId=params.fixtureId;
    const fixture_data = useLocation().state?.fixture_data;
    const [tab, setTab] = useState("Line Up");
    const [left,setLeft]=useState(0)

    return(
      <TeamsContext.Provider value={fixture_data.teams} className="w-full">
      
      <div className="relative top-12 left-[50%] -translate-x-[50%] font-bold">
        {/*  */}
        <div className='bg-gradient-to-r from-slate-200 via-slate-400 to-slate-300 rounded-md 
        p-2 my-2 mx-auto w-full sm:w-[90%]'>
          {/* league info */}
          <div className='flex flex-col justify-center  space-y-1 items-center
           py-2 border-b sm:border-none text-md sm:text-xl border-solid border-slate-400'>
            <div className='flex flex-row justify-start items-center space-x-2'>
              <img className='w-8 h-8 sm:w-10 sm:h-10' src={fixture_data.league.logo} alt={fixture_data.league.name} />
              <span className='border-none text-xs sm:text-xl'>{fixture_data.league.name} {fixture_data.league.season}/{new Date().getFullYear()}</span>
            </div>
            <div className='flex flex-row justify-start items-center space-x-2'>
              <span className='border-none text-xs sm:text-xl'>{fixture_data.league.round}</span>
            </div>  
          </div>  
           {/* score table */}
          <div key={fixture_data.fixture?.id} className="flex justify-around space-x-3 w-full md:w-[90%] lg:w-[60%] items-center mx-auto py-2 
           text-sm sm:text-xl border-b sm:border-none border-solid border-slate-400">
            <NavLink className='flex flex-row justify-start space-x-2 items-center w-[40%]' to={`/team/${fixture_data.teams?.home?.id}?league=${fixture_data.league?.id}`}>
              <img className="w-10 h-10 sm:w-12 sm:h-12" alt={fixture_data.teams?.home?.name} src={fixture_data.teams?.home?.logo}></img>
              <span className='border-none ml-0'>{fixture_data.teams?.home?.name}</span>
            </NavLink>
            <div className='flex flex-row justify-between space-x-2 sm:space-x-4 mx-auto  w-[20%]'>
              <span className="w-6 h-6 sm:w-8 sm:h-8 border-none bg-slate-900 text-slate-50 flex justify-center items-center text-sm sm:text-lg">{fixture_data.goals?.home}</span>
              <span className="w-6 h-6 sm:w-8 sm:h-8 border-none bg-slate-900 text-slate-50 flex justify-center items-center text-sm sm:text-lg">{fixture_data.goals?.away}</span>
            </div>
            
            <NavLink className='flex flex-row justify-end space-x-2 items-center w-[40%]' to={`/team/${fixture_data.teams?.away?.id}?league=${fixture_data.league?.id}`}>
              <span className='border-none mr-0'>{fixture_data.teams?.away?.name}</span>
              <img className="w-10 h-10 sm:w-12 sm:h-12" alt={fixture_data.teams?.away?.name} src={fixture_data.teams?.away?.logo}></img>
            </NavLink>
          </div>
          {/* fixture info */}
          <div className='flex flex-row flex-wrap justify-start space-x-2 sm:space-x-4 py-2'>
            {/* fixture status */}
            <div className='py-auto'>
              {
                fixture_data.fixture.status.short === "1H" ||
                fixture_data.fixture.status.short === "2H" ||
                fixture_data.fixture.status.short === "HT" ||
                fixture_data.fixture.short === "ET" ||
                fixture_data.fixture.short === "BT" ||
                fixture_data.fixture.short === "P" ||
                fixture_data.fixture.short === "SUSB" ||
                fixture_data.fixture.short === "INT" ? (
                  <div className="flex ml-2">
                    <span class="relative flex h-3 w-3 border-none">
                      <span class="animate-ping absolute top-[50%]   inline-flex h-full w-full rounded-full bg-red-400 opacity-75 border-none"></span>
                      <span class="relative top-[50%] inline-flex rounded-full h-3 w-3 bg-red-700 border-none"></span>
                    </span>
                    <span className="text-red-800 border-none">{fixture_data.fixture.status.short}</span>
                  </div>
                ) : 
                <div className="py-auto">
                  <span className="h-[50%] mx-2 sm:my-auto px-2 rounded-sm bg-green-600 text-slate-100 border-none text-xs sm:text-lg">
                    {fixture_data.fixture.status.short}
                  </span>
                </div>
              }
            </div>
            {/* fixture time */}
            <div className="flex flex-row justify-between items-center space-x-2">
              <FontAwesomeIcon icon={faClock} size='' />
              <span className='border-none text-xs sm:text-lg'>{new Date(fixture_data.fixture.date).getHours() +
                      ":" + (new Date(fixture_data.fixture.date).getMinutes().toString().length < 2 ? 
                      "0" +  new Date(fixture_data.fixture.date).getMinutes().toString() 
                      : new Date(fixture_data.fixture.date).getMinutes().toString())}
              </span>
            </div>            
            {/* fixture date */}
            <div className="flex flex-row justify-between items-center space-x-2">
              <FontAwesomeIcon icon={faCalendar} size='' />
              <span className='border-none text-xs sm:text-lg'>{new Date(fixture_data.fixture.date).toDateString()}</span>              
            </div>
            {/* fixture arena */}
            <div className="flex flex-row justify-between items-center space-x-2">
              <img className='w-8 h-8' src={arena} alt='Arena' />
              <span className='border-none text-xs sm:text-lg'>{fixture_data.fixture.venue.name}, {fixture_data.fixture.venue.city}</span>
            </div>
          </div>
            
        </div>     

<div className='w-[90%] sm:w-96 mx-auto  border-b border-solid border-slate-800 text-center'>
  {/* tabs */}
  <div className='flex flex-row justify-around'>     
    <div className='w-[33%] sm:w-32 h-10 text-slate-900 cursor-pointer' onClick={(e) => {e.stopPropagation();setTab("Line Up");setLeft(0)}}>Line Up</div>
    <div className='w-[33%] sm:w-32 h-10 text-slate-900 cursor-pointer' onClick={(e) => {e.stopPropagation();setTab("Events");setLeft(33.3)}}>Events</div>
    <div className='w-[33%] sm:w-32 h-10 text-slate-900 cursor-pointer' onClick={(e) => {e.stopPropagation(); setTab("Statistics");setLeft(66.6)}}>Statistics</div>
  </div>
  {/* indicator */}
  <div className={`h-1 w-[33%] sm:w-32 bg-blue-700`} style={{marginLeft:(left).toString()+'%'}}></div>
</div>
        <div class="w-[90%] mx-auto">
        
            {
              // to display events, statistics and lineup panes below the fixture,
              // depending on what user click:
              tab === "Events" ? (
                <Events fixtureId={fixtureId} teams={fixture_data?.teams} />
              ) : tab === "Statistics" ? (
                <Statistics fixtureId={fixtureId} />
              ) : tab === "Line Up" ? (
                <LineUp fixtureId={fixtureId} teams={fixture_data?.teams} />
              ) : null
            }
          
        </div>
      </div>
    </TeamsContext.Provider>
    )
}

export default Fixture