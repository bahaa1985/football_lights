import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { faCalendar, faClock, faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  {getLeagueTranslationByCountry, getRoundTranslation} from '../Translation/leagues.js'
import { getTeamByCountry,getTeamByName } from "../Translation/teams.js";
import { getTranslation } from "../Translation/labels.js";
function FixtureRow(props) {
  
  const fixtures = props.fixturesSource;

  // console.log(fixtures);
  
  const type = props.type;

  const [deviceWidth,setDeviceWidth]=useState(window.innerWidth);

  useEffect(()=>{
    window.addEventListener('resize',()=>{
      setDeviceWidth(window.innerWidth);
  }) 
  },[])

   const lang = JSON.parse(localStorage.getItem('user_preferences'))?.lang || 'en';  

  return Object.keys(fixtures).map((elem, index) => {
    return (
      <div key={index} className="block w-full">
        {
          <>
            {
                // checking if this component is rendered from leagueFixtures or todayFixtures as some designs will be changed
                type === "day_matches" ? (
                <div className="flex justify-start items-center my-2 p-2 bg-blue-500 text-slate-50 shadow-md border border-slate-300">
                  <img  alt=""  loading="lazy"  src={fixtures[elem][0].league.logo}  className="ml w-8 h-8 sm:w-10  sm:h-10"/>
                  <NavLink  className="my-auto ml-2"  to={`/league/${fixtures[elem][0].league.id}/${fixtures[elem][0].league.season}`}>
                  <span className="text-left border-none font-semibold">
                    {lang === 'ar' ? 
                    getLeagueTranslationByCountry(fixtures[elem][0]?.league.country,fixtures[elem][0]?.league.name) :
                    fixtures[elem][0]?.league.name
                    }
                  </span>
                  &nbsp;
                  </NavLink>
                   <span className="border-none font-medium"> {
                    lang === 'ar' ?
                    getRoundTranslation(fixtures[elem][0]?.league.round)
                    : fixtures[elem][0]?.league.round
                  }</span>
                </div>
                ) : type === "all_fixtures" && fixtures[elem].length !== 0 ? ( // to remove empty gameweeks after filtering by round number
                // div to display round title
                <div className="w-full bg-slate-800 text-lg text-slate-50 text-center p-2"> 
                  {
                    fixtures[elem][0]?.league.round.includes('Regular Season')
                    ? getTranslation('GameWeek',lang) + ' ' + parseInt(index + 1)
                    :  getRoundTranslation(fixtures[elem][0]?.league.round) || fixtures[elem][0]?.league.round}
                </div>
              ) : null
            }

            {fixtures[elem].map((elem, i) => {
              return (
                <div key={i} className="w-full mx-auto my-1 shadow-md">
                  {
                    type === "fav_teams_matches" ?
                      <div className="flex justify-start items-center my-2 p-2 bg-slate-400 text-slate-50 rounded-lg">
                        <img  alt=""  loading="lazy"  src={elem.league.logo}  className="ml w-8 sm:w-10 h-8 sm:h-10"/>  
                        <NavLink  className="my-auto ml-2"  to={`/league/${elem.league.id}/${elem.league.season}`}>
                          <span className="text-left border-none">
                            {
                              lang === 'ar' ? getLeagueTranslationByCountry(elem.league.country,elem.league.name) 
                                : elem.league.name
                            }
                          </span>
                        </NavLink>
                        <span className="border-none"> {getRoundTranslation(elem.league.round,lang)}</span>
                      </div>
                      :null
                  }

                  {/* Match date */}
                  <div className="flex flex-row justify-between w-full px-2  my-1">
                      {type === "all_fixtures" ? (
                        <div className="flex justify-start items-center">
                          <FontAwesomeIcon
                            className="mx-2 h-4"
                            icon={faCalendar}
                          ></FontAwesomeIcon>
                          <span className="border-none text-sm lg:text-lg">
                            {new Date(elem.fixture.date).toDateString().substring(4)}
                          </span>
                          <br />
                        </div>
                      ) : null}

                      <div className="w-1/4  flex flex-row justify-start">
                        
                        {/*  */}
                        <div className="flex flex-row justify-start items-center">
                        {
                          // live indicator:
                          elem.fixture.status.short === "1H" ||
                          elem.fixture.status.short === "2H" ||
                          elem.fixture.short === "ET" ||
                          elem.fixture.short === "BT" ||
                          elem.fixture.short === "P" ||
                          elem.fixture.short === "SUSB" ||
                          elem.fixture.short === "INT" ? (
                            <div className="flex flex-row justify-start items-start">
                              {/* <span class="relative flex h-3 w-3 border-none left-2">
                                <span class="animate-ping absolute top-[50%]   inline-flex h-full w-full rounded-full bg-red-400 opacity-75 border-none"></span>
                                <span class="relative top-[50%] inline-flex rounded-full h-3 w-3 bg-red-700 border-none"></span>
                              </span> */}
                              <span className="text-sm font-bold border-none text-red-700 animate-pulse">'{ new Date(new Date() - new Date(elem.fixture.date)).getMinutes()}</span>
                              {/* <span className="relative left-4 text-red-800 border-none">{elem.fixture.status.short}</span> */}
                            </div>
                          ) : 
                        <div className="flex justify-start items-center mx-2">
                        <FontAwesomeIcon className="mx-2 h-4" icon={faClock}></FontAwesomeIcon>
                        <span className="border-none text-sm lg:text-lg">
                          {new Date(elem.fixture.date).getHours() +
                            ":" +
                            (new Date(elem.fixture.date).getMinutes().toString()
                              .length < 2
                              ? "0" +
                                new Date(elem.fixture.date).getMinutes().toString()
                              : new Date(elem.fixture.date).getMinutes().toString())}
                          </span>
                          <span className="mx-2 sm:my-auto px-2 rounded-sm text-slate-800 border-none">
                            {elem.fixture.status.short}                            
                          </span>
                        </div>                          
                        }
                        </div>
                      </div>
                       {Date.parse(elem.fixture.date) - Date.now() <= 1000*60*30 ?
                          <div className="flex justify-end">
                            <NavLink to={`/fixture/${elem?.fixture?.id}`} state={{fixture_data:elem}}>Details</NavLink>
                              {/* <a href={`/fixture/${elem?.fixture?.id}`}>Details</a> */}
                          </div>:null}
                      </div>

                    {/* Fixture Teams */}
                    <div
                      className={`w-full sm:w-[75%] xl:w-[60%] my-1 mx-auto flex flex-col items-center sm:flex-row sm:justify-between`}
                      key={i}
                    >
                      {/* Home team */}
                      <div className="w-full md:w-[48%] flex flex-row justify-center gap-2 lg:justify-between lg:gap-0 items-center my-1">
                        <img
                          src={elem.teams.home.logo}
                          loading="lazy"
                          className="size-8 sm:size-10"
                          alt={elem.teams.home.name}
                        />

                        <NavLink
                          className="w-[50%] text-center"
                          to={`/team/${elem.teams.home.id}?league=${elem.league.id}&season=${elem.league.season}`}
                        >
                          <span className="border-none text-sm  lg:text-lg">
                            {
                              lang === 'ar' ? getTeamByName(elem.teams.home.name) :elem.teams.home.name
                            }
                          </span>
                        </NavLink>

                        <span className="w-[10%] bg-red-800 text-slate-100 text-center rounded-sm border-none">
                          {elem.goals.home === null ? "-" : elem.goals.home}
                        </span>
                      </div>

                      {/* Away team */}
                      <div className={`w-full md:w-[48%] flex flex-row justify-center gap-2 lg:justify-between lg:gap-0 items-center my-1 ${deviceWidth > 600 ? "flex-row-reverse" : null}`}
                      >
                        <img
                          src={elem.teams.away.logo}
                          loading="lazy"
                          className="size-8 sm:size-10"
                          alt={elem.teams.away.name}
                        />

                        <NavLink
                          className="w-[50%] text-center"
                          to={`/team/${elem.teams.away.id}?league=${elem.league.id}&season=${elem.league.season}`}
                        >
                          <span className="border-none text-sm  lg:text-lg">
                            {
                              lang === 'ar' ? getTeamByName(elem.teams.away.name) :elem.teams.away.name
                            }
                          </span>
                        </NavLink>

                        <span className="w-[10%] bg-red-800 text-slate-100 text-center rounded-sm border-none">
                          {elem.goals.away === null ? "-" : elem.goals.away}{" "}
                        </span>
                      </div>                      
                    </div>
                  {/* </NavLink> */}
                </div>
                
              );
            })}
          </>
        }
      </div>
    );
  });
}

export default FixtureRow;
