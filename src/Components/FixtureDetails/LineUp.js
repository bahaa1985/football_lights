import { React, memo, useEffect } from "react";
import { useState, useMemo } from "react";
import SoccerPlayground from "./SoccerPlayground.js";
import LinePosition from "./LinePosition.js";
import Ratings from "./Ratings.js";
import getLineUps from "../../Api/getLineUp.js";
import getPlayers from "../../Api/getPlayers.js";
import "../../styles/lineup.css";

//main function
function LineUp(props) {
  const homeParam = props.teams.home.id;
  const awayParam = props.teams.away.id;
  const fixtureId = props.fixtureId;
  ///Home team details:
  const [homeTeamProfile, setHomeTeamProfile] = useState({
    id: homeParam,
    name: "",
    logo: "",
    formation: [],
  });
  const [homeLineUp, setHomeLineUp] = useState([]);
  const [homePlayers, setHomePlayers] = useState([]);
  const [homeGkColor, setHomeGkColor] = useState([]); //kit colors
  const [homePlayerColor, setHomePlayrColor] = useState([]); //kit colors
  const [homeCoach, setHomeCoash] = useState({});
  const [homeSub, setHomeSub] = useState([]);
  /// Away team details:
  const [awayTeamProfile, setAwayTeamProfile] = useState({
    id: awayParam,
    name: "",
    logo: "",
    formation: [],
  });
  const [awayLineUp, setAwayLineUp] = useState([]);
  const [awayPlayers, setAwayPlayers] = useState([]);
  const [awayGkColor, setAwayGkColor] = useState([]); //kit colors
  const [awayPlayerColor, setAwayPlayrColor] = useState([]); //kit colors
  const [awayCoach, setAwayCoash] = useState({});
  const [awaySub, setAwaySub] = useState([]);
  ///
  const [clickedSub, setClickedSub] = useState(homeTeamProfile.homeId);
  const [isLoaded, setLoaded] = useState(false); //for preventing rendering before complete fetching data

  // let i=0;
  useMemo(() => {
    let isMounted = true; // flag to track if the component is mounted
    // call formation and line up players:
    async function fetchLineUp() {
      const lineup_response = await getLineUps(fixtureId);
      const players_response = await getPlayers(fixtureId);
      //
      if (isMounted) {
        setHomeTeamProfile({
          id: lineup_response.data.response[0].team.id,
          name: lineup_response.data.response[0].team.name,
          logo: lineup_response.data.response[0].team.logo,
          formation: Array.from(
            lineup_response.data.response[0].formation.replaceAll("-", "")
          ),
        });
        setHomeLineUp(lineup_response.data.response[0].startXI);
        setHomeGkColor(lineup_response.data.response[0].team.colors.goalkeeper);
        setHomePlayrColor(lineup_response.data.response[0].team.colors.player);
        setHomeCoash(lineup_response.data.response[0].coach);
        setHomeSub(lineup_response.data.response[0].substitutes);
        //
        setAwayTeamProfile({
          id: lineup_response.data.response[1].team.id,
          name: lineup_response.data.response[1].team.name,
          logo: lineup_response.data.response[1].team.logo,
          formation: Array.from(
            lineup_response.data.response[1].formation.replaceAll("-", "")
          ),
        });
        setAwayLineUp(lineup_response.data.response[1].startXI);
        setAwayCoash(lineup_response.data.response[1].coach);
        setAwaySub(lineup_response.data.response[1].substitutes);
        setAwayGkColor(lineup_response.data.response[1].team.colors.goalkeeper);
        setAwayPlayrColor(lineup_response.data.response[1].team.colors.player);
        ///
        setHomePlayers(players_response.data.response[0].players);
        setAwayPlayers(players_response.data.response[1].players);
        //
        setLoaded(true);
      }
    }

    fetchLineUp();

    console.log(homePlayers);

    return () => {
      isMounted = false; // cleanup function to set the flag to false when the component unmounts
    };
  }, [fixtureId]);

  function linesPositions() {
    let homeLines = [],
      awayLines = [];
    // Home Lines:
    for (let i = 0; i < homeTeamProfile?.formation?.length + 1; i++) {
      const sp_lineup = homeLineUp
        .filter((elem) => parseInt(elem.player.grid[0]) === i + 1)
        .sort(
          (playerA, playerB) =>
            parseInt(playerB.player.grid[2]) - parseInt(playerA.player.grid[2])
        );
      homeLines.push(
        <LinePosition
          lineup={sp_lineup}
          grid={(i + 1).toString()}
          colors={homeGkColor}
          statistics={homePlayers}
        />
      );
    }
    // Away Lines:
    for (let i = 0; i < awayTeamProfile?.formation?.length + 1; i++) {
      const sp_lineup = awayLineUp
        .filter((elem) => parseInt(elem.player.grid[0]) === i + 1)
        .sort(
          (playerA, playerB) =>
            parseInt(playerB.player.grid[2]) - parseInt(playerA.player.grid[2])
        );
      awayLines.push(
        <LinePosition
          lineup={sp_lineup}
          grid={(i + 1).toString()}
          colors={awayGkColor}
          statistics={awayPlayers}
        />
      );
    }
    awayLines = awayLines.reverse();
    return [homeLines, awayLines];
  }

  function teamRating(players) {
    let totalAvg = 0.1;
    players.forEach((player, index) => {
      if (!isNaN(parseFloat(player.statistics[0].games.rating))) {
        totalAvg += parseInt(player.statistics[0].games.rating);
      }
    });
    const playersCount = players.filter(
      (player) => player.statistics[0].games.minutes > 0
    ).length;
    totalAvg /= playersCount;
    totalAvg = totalAvg.toFixed(1);
    return totalAvg;
  }

  function ratingBGColor(value){
    let rating = parseFloat(value);
    let bgColor ='';
    if(rating >= 0 && rating <5 ) bgColor = 'bg-red-700'
    else if (rating >= 5 && rating <6) bgColor = 'bg-red-500'
    else if(rating >=6 && rating <6.5) bgColor = 'bg-orange-500'
    else if(rating >=6.5 && rating <8) bgColor = 'bg-green-500'
    else if(rating >=8.1 &rating <=10) bgColor = 'bg-blue-500'
    return bgColor;
  }

  let playerNameArr = [],
    playerName = "";
  return (
    <div>
      <div className="block mx-auto my-2">
        {isLoaded ? (
          <>
            <div className="block md:flex md:flex-row md:justify-around lg:justify-center my-2">
                
                <div className="relative xs:top-[90%] md:top-[45%] w-full sm:w-8/12 lg:w-6/12 m-auto p-1">
                  {/*  team's logo, name and rating*/}
                  <div className={` p-2 w-full mx-auto rounded-md bg-slate-800`}>
                    <div className="flex justify-start sm:justify-center space-x-2 px-auto">
                    <img  alt={homeTeamProfile.name}  src={homeTeamProfile.logo}  className="w-8 h-8"/>
                    <span className="text-left flex items-center text-slate-50 border-none">
                      {homeTeamProfile.name}
                    </span>
                    <span className={`flex justify-center items-center w-6 h-6 sm:w-8 sm:h-8 mx-2 text-center ${ratingBGColor(teamRating(homePlayers))} text-slate-50 border-none`}>
                      {teamRating(homePlayers)}
                    </span>
                    </div>
                    <div className="flex justify-center space-x-2 px-auto text-slate-50 text-sm sm:text-md">
                      {
                        homeTeamProfile.formation?.join(' - ')
                      }
                    </div>
                  </div>
                  {/* Playground */}
                  <SoccerPlayground
                    homeLines={linesPositions()[0]}
                    awayLines={linesPositions()[1]}
                  />
                  {/* Away team's logo, name and rating*/}
                  <div className={` p-2 w-full mx-auto rounded-md bg-slate-800`}>
                    <div className="flex justify-start sm:justify-center space-x-2 px-auto">
                      <img  alt={awayTeamProfile.name}  src={awayTeamProfile.logo}  className="w-8 h-8"/>
                      <span className="text-left flex items-center text-slate-50 border-none">
                        {awayTeamProfile.name}
                      </span>
                      <span className={`flex justify-center items-center w-6 h-6 sm:w-8 sm:h-8 text-center text-slate-50 ${ratingBGColor(teamRating(awayPlayers))} border-none`}>
                        {
                          teamRating(awayPlayers)
                        }
                      </span>
                    </div>
                    <div className="flex justify-center space-x-2 px-auto text-slate-50 text-sm sm:text-md">
                      {
                        awayTeamProfile.formation?.join(' - ')
                      }
                    </div>
                  </div>
                </div>

                {/* Coaches and subs section */}
                <div className="relative xs:top-[90%] md:top-[45%] w-full md:w-4/12 mx-auto p-3">
                  {
                    <>
                      <div className="flex w-full justify-between">
                        <div
                          className={`flex justify-start py-2 w-1/2 ${clickedSub === homeTeamProfile.id ? "bg-slate-800" : "bg-slate-600"} cursor-pointer`}
                          onClick={() => setClickedSub(homeTeamProfile.id)}
                        >
                          <img  alt={homeTeamProfile.name}  src={homeTeamProfile.logo}  className="w-8 h-8"/>
                          <span className="w-1/2 text-center text-slate-50 border-none">
                            {homeTeamProfile.name}
                          </span>
                        </div>
                        <div
                          className={`flex justify-end py-2 w-1/2 ${clickedSub === awayTeamProfile.id ? "bg-slate-800" : "bg-slate-600"} cursor-pointer`}
                          onClick={() => setClickedSub(awayTeamProfile.id)}
                        >
                          <span className="w-1/2 text-center text-slate-50 border-none align-middle">
                            {awayTeamProfile.name}
                          </span>
                          <img  alt={awayTeamProfile.name}  src={awayTeamProfile.logo}  className="w-8 h-8"/>
                        </div>
                      </div>
                      {clickedSub === homeTeamProfile.id ? (
                        <>
                          {/* home coach and subs */}
                          <div className="flex flex-row justify-start space-x-2">
                            <img class="w-10 h-10 sm:w-14 sm:h-14 rounded-full" alt="" src={homeCoach.photo} />
                            <span className="border-none flex justify-center items-center text-sm">Coach: {homeCoach.name}</span>
                          </div>
                          <div>
                            {homeSub.map((sub, index) => {
                              // eslint-disable-next-line no-lone-blocks
                              {
                                playerNameArr = sub.player.name.split(" ");
                                playerNameArr.length > 1
                                  ? (playerName = playerNameArr.slice(1))
                                  : (playerName = playerNameArr[0]);
                              }
                              return (
                                <div key={index} className="flex flex-row jsutify start space-x-2 border-b border-solid border-slate-400">
                                  <span className="border-none flex justify-center items-center ">
                                    {sub.player.number}
                                  </span>
                                  <span className="border-none text-sm">
                                    {
                                      // playerNameArr.length> 1 ?
                                      // playerNameArr.slice(1) :
                                      // playerNameArr[0]
                                      playerName
                                      // sub.player.id
                                    }
                                  </span>
                                  <span className="border-none text-sm flex justify-center items-center">{
                                    sub.player.pos === 'D' ? 'Defender'
                                    : sub.player.pos === 'M' ? 'Midfielder'
                                    : sub.player.pos === 'F' ? 'Forward'
                                    : sub.player.pos === 'G' ? 'GoalKeeper'
                                    :null
                                    }</span>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <>
                          {/* away coach and subs */}
                          <div className="flex flex-row justify-start space-x-2">
                            <img class="w-10 h-10 sm:w-14 sm:h-14 rounded-full" alt="" src={awayCoach.photo} />
                            <span className="border-none flex justify-center items-center text-sm">Coach: {awayCoach.name}</span>
                          </div>
                          <div className="">
                            {awaySub.map((sub, index) => {
                              playerNameArr = sub.player.name.split(" ");
                              playerNameArr.length > 1
                                ? (playerName = playerNameArr.slice(1))
                                : (playerName = playerNameArr[0]);

                              return (
                                <div key={index} className="flex flex-row jsutify start space-x-2 border-b border-solid border-slate-400">
                                  <span className="border-none flex justify-center items-center ">
                                    {sub.player.number}
                                  </span>
                                  <span className="border-none text-sm">
                                    {
                                      // playerNameArr.length> 1 ?
                                      // playerNameArr.slice(1) :
                                      // playerNameArr[0]
                                      playerName
                                      // sub.player.id
                                    }
                                  </span>
                                  <span className="border-none text-sm flex justify-center items-center">{
                                    sub.player.pos === 'D' ? 'Defender'
                                    : sub.player.pos === 'M' ? 'Midfielder'
                                    : sub.player.pos === 'F' ? 'Forward'
                                    : sub.player.pos === 'G' ? 'GoalKeeper'
                                    :null
                                    }</span>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </>
                  }
                </div>
            </div>
            
            {/* Ratings */}
            <Ratings
              teams={{ home: homeTeamProfile, away: awayTeamProfile }}
              statistics={{ home: homePlayers, away: awayPlayers }}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default memo(LineUp);