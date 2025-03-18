import { React, memo, useEffect } from "react";
import { useState, useMemo } from "react";
import SoccerPlayground from "./SoccerPlayground.js";
import LinePosition from "../Game/LinePosition.js";
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

  let playerNameArr = [],
    playerName = "";
  return (
    <div>
      <div className="block mx-auto md:flex md:justify-between">
        {isLoaded ? (
          <>
            {/* Playground */}
            <div className="relative xs:top-[90%] md:top-[45%] w-full md:w-1/2 m-auto p-3">
              <div
                className={`flex justify-start p-2 w-full rounded-md bg-slate-800`}
              >
                <img
                  alt={homeTeamProfile.name}
                  src={homeTeamProfile.logo}
                  className="w-8 h-8"
                />
                <span className="w-1/2 text-center text-slate-50 border-none align-middle">
                  {homeTeamProfile.name}
                </span>
                <span className="text-center text-slate-50 border-none align-middle">
                  {teamRating(homePlayers)}
                </span>
              </div>
              <SoccerPlayground
                homeLines={linesPositions()[0]}
                awayLines={linesPositions()[1]}
              />
              <div
                className={`flex justify-start p-2 w-full rounded-md bg-slate-800`}
              >
                <img
                  alt={awayTeamProfile.name}
                  src={awayTeamProfile.logo}
                  className="w-8 h-8"
                />
                <span className="w-1/2 text-center text-slate-50 border-none align-middle">
                  {awayTeamProfile.name}
                </span>
                <span className="text-center text-slate-50 border-none align-middle">
                  {teamRating(awayPlayers)}
                </span>
              </div>
            </div>

            {/* Coaches and subs section */}
            <div className="relative xs:top-[90%] md:top-[45%] w-full md:w-1/2 m-auto p-3">
              {
                <>
                  <div className="flex w-full justify-between">
                    <div
                      className={`flex justify-start py-2 w-1/2 ${clickedSub === homeTeamProfile.id ? "bg-slate-800" : "bg-slate-600"} cursor-pointer`}
                      onClick={() => setClickedSub(homeTeamProfile.id)}
                    >
                      <img
                        alt={homeTeamProfile.name}
                        src={homeTeamProfile.logo}
                        className="w-8 h-8"
                      />
                      <span className="w-1/2 text-center text-slate-50 border-none align-middle">
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
                      <img
                        alt={awayTeamProfile.name}
                        src={awayTeamProfile.logo}
                        className="w-8 h-8"
                      />
                    </div>
                  </div>
                  {clickedSub === homeTeamProfile.id ? (
                    <>
                      {/* home coach and subs */}
                      <div className="coach">
                        <img alt="" src={homeCoach.photo} />
                        <span>Coach: {homeCoach.name}</span>
                      </div>
                      <div>
                        Formation: {homeTeamProfile?.formation?.join("-")}
                      </div>
                      <div className="substitues">
                        {homeSub.map((sub, index) => {
                          // eslint-disable-next-line no-lone-blocks
                          {
                            playerNameArr = sub.player.name.split(" ");
                            playerNameArr.length > 1
                              ? (playerName = playerNameArr.slice(1))
                              : (playerName = playerNameArr[0]);
                          }
                          return (
                            <div key={index}>
                              <span className="player-number">
                                {sub.player.number}
                              </span>
                              <span className="player-name">
                                {playerNameArr.length > 1
                                  ? playerNameArr.slice(1)
                                  : playerNameArr[0]}
                              </span>
                              <span>{sub.player.pos}</span>
                              <span>{}</span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* away coach and subs */}
                      <div className="coach">
                        <img alt="" src={awayCoach.photo} />
                        <span>Coach: {awayCoach.name}</span>
                      </div>
                      <div>
                        Formation: {awayTeamProfile?.formation?.join("-")}
                      </div>
                      <div className="substitues">
                        {awaySub.map((sub, index) => {
                          playerNameArr = sub.player.name.split(" ");
                          playerNameArr.length > 1
                            ? (playerName = playerNameArr.slice(1))
                            : (playerName = playerNameArr[0]);

                          return (
                            <div key={index}>
                              <span className="player-number">
                                {sub.player.number}
                              </span>
                              <span className="player-name">
                                {
                                  // playerNameArr.length> 1 ?
                                  // playerNameArr.slice(1) :
                                  // playerNameArr[0]
                                  playerName
                                  // sub.player.id
                                }
                              </span>
                              <span>{sub.player.pos}</span>
                              <span>
                                {
                                  //event:
                                }
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              }
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
