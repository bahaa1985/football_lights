import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { faCalendar, faClock, faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCookie } from "../../Api/cookie.js";
import { getTranslation } from "../../multi_language_translations.js";
import  {getLeagueTranslationByCountry, getRoundTranslation} from '../../leagues.js';
import { getTeamByCountry,getTeamByName } from "../../teams.js";
function FixtureRow(props) {
  const fixtures = props.fixturesSource;
  console.log("fixtures",fixtures);
  
  const type = props.type;

  const [deviceWidth,setDeviceWidth]=useState(window.innerWidth);

  useEffect(()=>{
    window.addEventListener('resize',()=>{
      setDeviceWidth(window.innerWidth);
  }) 
  },[])

  const lang = getCookie('language').lang || 'en';

  return Object.keys(fixtures).map((elem, index) => {
    return (
      <div key={index} className="block w-full">
        {
          <>
            {
                // checking if this component is rendered from leagueFixtures or todayFixtures as some designs will be changed
                type === "day_matches" ? (
                <div className="flex justify-start items-center my-2 p-2 bg-slate-400 text-slate-50 rounded-lg shadow-md border border-slate-300">
                  <img  alt=""  loading="lazy"  src={fixtures[elem][0].league.logo}  className="ml w-8 sm:w-10 h-8 sm:h-10"/>
                  <NavLink  className="my-auto ml-2"  to={`/league/${fixtures[elem][0].league.id}/${fixtures[elem][0].league.season}`}>
                  <span className="text-left border-none font-semibold">
                    {lang === 'ar' ? 
                    getLeagueTranslationByCountry(fixtures[elem][0]?.league.country,fixtures[elem][0]?.league.name) :
                    fixtures[elem][0]?.league.name
                    }
                  </span>
                  </NavLink>
                   <span className="border-none font-medium"> {
                    lang === 'ar' ?
                    getRoundTranslation(fixtures[elem][0]?.league.round)
                    : fixtures[elem][0]?.league.round
                  }</span>
                </div>
                ) : type === "all_fixtures" && fixtures[elem].length !== 0 ? ( // to remove empty gameweeks after filtering by round number
                <div className="w-full bg-slate-800 text-slate-50 text-center p-2 rounded-lg">
                  {
                    fixtures[elem][0]?.league.round.includes('Regular Season')
                    ? lang === 'ar' ? "الأسبوع " + parseInt(index + 1) : "Game Week " + parseInt(index + 1)
                    :  getRoundTranslation(fixtures[elem][0]?.league.round) || fixtures[elem][0]?.league.round}
                </div>
              ) : null
            }

            {fixtures[elem].map((elem, i) => {
              return (
                <div key={i} className="w-full lg:w-[90%] mx-auto my-1 shadow-md">
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
                  <div className="flex flex-row justify-start w-full my-1">
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
                        </div>
                        
                        
                        <div className="flex justify-start items-center">
                        {/* <div  className="flex justify-center items-center"> */}
                        {
                          // live indicator:
                          elem.fixture.status.short === "1H" ||
                          elem.fixture.status.short === "2H" ||
                          elem.fixture.status.short === "HT" ||
                          elem.fixture.short === "ET" ||
                          elem.fixture.short === "BT" ||
                          elem.fixture.short === "P" ||
                          elem.fixture.short === "SUSB" ||
                          elem.fixture.short === "INT" ? (
                            <div className="flex flex-row justify-start items-start">
                              <span class="relative flex h-3 w-3 border-none left-2">
                                <span class="animate-ping absolute top-[50%]   inline-flex h-full w-full rounded-full bg-red-400 opacity-75 border-none"></span>
                                <span class="relative top-[50%] inline-flex rounded-full h-3 w-3 bg-red-700 border-none"></span>
                              </span>
                              <span className="relative left-4 text-red-800 border-none">{elem.fixture.status.short}</span>
                            </div>
                          ) : 
                          <span className="mx-2 sm:my-auto px-2 rounded-sm text-slate-800 border-none">
                            {elem.fixture.status.short}
                          </span>
                        }
                        </div>

                      </div>
                  {/* Fixture Teams */}
                  <NavLink to={`/fixture/${elem?.fixture?.id}`} state={{fixture_data:elem}}>
                  {/* <div  className="w-[95%] flex justify-center space-x-2 mx-auto my-2">                                                             */}
                    <div
                      className={`w-[95%] my-1 mx-auto flex flex-col items-center sm:flex-row sm:justify-between`}
                      key={i}
                    >
                      {/* Home team */}
                      <div className="w-full md:w-[48%] flex flex-row justify-center gap-2 lg:justify-between lg:gap-0 items-center my1">
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
                            {elem.teams.home.name}
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
                            {elem.teams.away.name}
                          </span>
                        </NavLink>

                        <span className="w-[10%] bg-red-800 text-slate-100 text-center rounded-sm border-none">
                          {elem.goals.away === null ? "-" : elem.goals.away}{" "}
                        </span>
                      </div>                      
                    </div>
                  </NavLink>
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
