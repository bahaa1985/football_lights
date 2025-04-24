import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FixtureRow(props) {
  const fixtures = props.fixturesSource;
  const type = props.type;

  const [deviceWidth,setDeviceWidth]=useState(window.innerWidth);

  useEffect(()=>{
    window.addEventListener('resize',()=>{
      setDeviceWidth(window.innerWidth);
  }) 
  },[])

  return Object.keys(fixtures).map((elem, index) => {
    return (
      <div key={index} className="block w-full">
        {
          <>
            {
              // checking if this component is rendered from leagueFixtures or todayFixtures as some designs will be changed
              type === "day_matches" ? (
                <div className="flex justify-start items-center p-2">
                  <img  alt=""  loading="lazy"  src={fixtures[elem][0].league.logo}  className="ml w-8 sm:w-10 h-8 sm:h-10"/>

                  <NavLink  className="my-auto ml-2"  to={`/leagues/${fixtures[elem][0].league.id}/${fixtures[elem][0].league.season}`}>
                    <span className="text-left border-none">{elem}</span>
                  </NavLink>
                </div>
              ) : type === "all_fixtures" && fixtures[elem].length !== 0 ? ( // to remove empty gameweeks after filtering by round number
                <div className="">
                  {fixtures[elem][0]?.league.round.includes('Regular Season')
                    ? "Game Week " + parseInt(index + 1)
                    : fixtures[elem][0]?.league.round}
                </div>
              ) : null
            }

            {fixtures[elem].map((elem, i) => {
              return (
                <div key={i} className="w-full lg:w-[80%] mx-auto">
                  {
                    type === "fav_teams_matches" ?
                      <div className="flex justify-start items-center p-2">
                        <img  alt=""  loading="lazy"  src={elem.league.logo}  className="ml w-8 sm:w-10 h-8 sm:h-10"/>  
                        <NavLink  className="my-auto ml-2"  to={`/leagues/${elem.league.id}/${elem.league.season}`}>
                          <span className="text-left border-none">{elem.league.name}</span>
                        </NavLink>
                        <span className="border-none">{' '+elem.league.round}</span>
                      </div>
                      :null
                  }
                  
                  <div  className="flex justify-between sm:justify-center mx-auto my-2 border-b border-b-slate-600 border-solid">
                    {/* Match calendar */}
                    <div className="flex flex-col justify-start w-[10%] my-2 ml-0">
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

                      <div className="flex justify-start items-center">
                        <FontAwesomeIcon  icon={faClock}></FontAwesomeIcon>
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
                        
                        
                        <div className="flex justify-start">
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
                    <div
                      className={`w-[75%]  my-2 mx-auto flex flex-col items-center sm:flex-row sm:justify-between`}
                      key={i}
                    >
                      {/* Home team */}
                      <div className="w-[90%] md:w-[48%] flex justify-center space-x-1 lg:justify-between items-center my-1">
                        <img
                          src={elem.teams.home.logo}
                          loading="lazy"
                          className="w-8 h-8 sm:w-10 sm:h-10"
                          alt={elem.teams.home.name}
                        />

                        <NavLink
                          className="w-[50%] text-center"
                          to={`/teams/${elem.teams.home.id}?league=${elem.league.id}&season=${elem.league.season}`}
                        >
                          <span className="border-none text-sm  lg:text-xl">{elem.teams.home.name}</span>
                        </NavLink>

                        <span className="w-[10%] bg-red-800 text-slate-100 text-center rounded-sm border-none">
                          {elem.goals.home === null ? "-" : elem.goals.home}
                        </span>
                      </div>

                      {/* Away team */}
                      <div className={`w-[90%] md:w-[48%] flex justify-center space-x-1 lg:justify-between items-center my-1 ${deviceWidth > 600 ? " flex-row-reverse" : null}`}
                      >
                        <img
                          src={elem.teams.away.logo}
                          loading="lazy"
                          className="w-8 h-8 sm:w-10 sm:h-10"
                          alt={elem.teams.away.name}
                        />

                        <NavLink
                          className="w-[50%] text-center"
                          to={`/teams/${elem.teams.away.id}?league=${elem.league.id}&season=${elem.league.season}`}
                        >
                          <span className="border-none text-sm  lg:text-lg">{elem.teams.away.name}</span>
                        </NavLink>

                        <span className="w-[10%] bg-red-800 text-slate-100 text-center rounded-sm border-none">
                          {elem.goals.away === null ? "-" : elem.goals.away}{" "}
                        </span>
                      </div>
                    </div>

                    {/* Details button */}
                    <div className="flex items-center w-[10%]">
                      <NavLink className="p-1 bg-slate-400 text-slate-800 text-sm lg:text-lg rounded-sm hover:bg-slate-300"
                      to={`/fixture/${elem.fixture.id}`} state={{fixture_data:elem}}>
                        {/* <button className="p-1 bg-emerald-600 text-slate-50 rounded-sm hover:bg-emerald-500"> */}
                          Deatils
                        {/* </button> */}
                      </NavLink>  
                    </div>
                  </div>
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
