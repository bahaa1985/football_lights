import { React, memo } from "react";
import { useState, useMemo } from "react";
import SoccerPlayground from "./SoccerPlayground.js";
import LinePosition from "./LinePosition.js";
import Ratings from "./Ratings.js";
import getLineUps from "../../api/LineUp.js";
import getPlayers from "../../api/Players.js";
import { getTeamByName } from "../../Translation/teams.js";
import CoachAndSubs from "../../Components/CoachAndSubs.jsx";
import PlayersTable from "../../Components/PlayersTable.js";
import Spinner from "../../Components/Spinner.jsx";
import { useSelector, useDispatch } from "react-redux";
import { requestsIncrement, resetRequests } from "../../ReduxStore/counterSlice.js";

//main function
function LineUp(props) {
  const homeId = props.teams.home.id;
  const homeName = props.teams.home.name;
  const homeLogo = props.teams.home.logo;
  const awayId = props.teams.away.id;
  const awayName = props.teams.away.name;
  const awayLogo = props.teams.away.logo;
  const fixtureId = props.fixtureId;
  ///Home team details:
  const [homeTeamProfile, setHomeTeamProfile] = useState({
    id: homeId,
    name: homeName,
    logo: homeLogo,
    formation: [4, 4, 2] //default formation
  });
  const [homeStartingXI, setHomeStartingXI] = useState([]);
  const [homePlayers, setHomePlayers] = useState([]);
  const [homeGkColor, setHomeGkColor] = useState([]); //kit colors
  const [homePlayerColor, setHomePlayrColor] = useState([]); //kit colors
  const [homeCoach, setHomeCoash] = useState({});
  const [homeSubstitutes, setHomeSubstitutes] = useState([]);

  /// Away team details:
  const [awayTeamProfile, setAwayTeamProfile] = useState({
    id: awayId,
    name: awayName,
    logo: awayLogo,
    formation: [4, 4, 2] //default formation,
  });
  const [awayStartingXI, setAwayStartingXI] = useState([]);
  const [awayPlayers, setAwayPlayers] = useState([]);
  const [awayGkColor, setAwayGkColor] = useState([]); //kit colors
  const [awayPlayerColor, setAwayPlayrColor] = useState([]); //kit colors
  const [awayCoach, setAwayCoash] = useState({});
  const [awaySubstitutes, setAwaySubstitutes] = useState([]);
  ///
  const [clickedSub, setClickedSub] = useState(homeId);
  const [clickedTeam, setClickedTeam] = useState(homeId);
  const [isLoaded, setLoaded] = useState(false); //for preventing rendering before complete fetching data
  //
  const lang = JSON.parse(localStorage.getItem("user_preferences"))?.lang || 'en';

  const dispatch = useDispatch();
  const requests_count = useSelector(state => state.counter.requestsCount);

  useMemo(() => {
    let isMounted = true; // flag to track if the component is mounted
    // call formation and line up players:
    async function fetchLineUp() {
      const lineup_response = await getLineUps(fixtureId);
      const players_response = await getPlayers(fixtureId);
      // console.log("lineup",lineup_response.data);

      //
      if (isMounted && lineup_response.data.response.length > 0) {
        setHomeTeamProfile({
          id: lineup_response?.data.response[0].team.id,
          name: lineup_response?.data.response[0].team.name,
          logo: lineup_response?.data.response[0].team.logo,
          formation: Array.from(
            lineup_response?.data.response[0].formation !== null ? lineup_response?.data.response[0].formation.replaceAll("-", "")
              : ''
          ),
        });
        setHomeStartingXI(lineup_response?.data.response[0].startXI);
        setHomeCoash(lineup_response?.data.response[0].coach);
        setHomeSubstitutes(lineup_response?.data.response[0].substitutes);
        //
        setAwayTeamProfile({
          id: lineup_response?.data.response[1].team.id,
          name: lineup_response?.data.response[1].team.name,
          logo: lineup_response?.data.response[1].team.logo,
          formation: Array.from(
            lineup_response?.data.response[1].formation !== null ? lineup_response?.data.response[1].formation.replaceAll("-", "")
              : ''
          ),
        });
        setAwayStartingXI(lineup_response?.data.response[1].startXI);
        setAwayCoash(lineup_response?.data.response[1].coach);
        setAwaySubstitutes(lineup_response?.data.response[1].substitutes);
        ///
        setHomePlayers(players_response?.data.response[0].players);
        setAwayPlayers(players_response?.data.response[1].players);
        //
        setLoaded(true);
        //redux reducer increase requests count by one:
        dispatch(requestsIncrement());

      }
    }

    if (requests_count < 10) {
      fetchLineUp();
    }
    else {
      alert("API request limit reached. Please wait a minute before making more requests.");
    }

    dispatch(resetRequests());

    return () => {
      isMounted = false; // cleanup function to set the flag to false when the component unmounts
    };
  }, [fixtureId]);


  //create team formation lines and posit every player in his appoperiate place
  function linesPositions() { // this function will not be called if no formation is provided, the players will be displayed as stack
    if (homeTeamProfile.formation.length > 0 && awayTeamProfile.formation.length > 0) {
      let homeLines = [],
        awayLines = [];
      // Home Lines:
      for (let i = 0; i < homeTeamProfile?.formation?.length + 1; i++) {
        const sp_lineup = homeStartingXI
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
        const sp_lineup = awayStartingXI
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
  }

  //to calculate team's avg rate:
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

  //to color player's rate indicator depending on his score
  function ratingBGColor(value) {
    let rating = parseFloat(value);
    let bgColor = '';
    if (rating >= 0 && rating < 5) bgColor = 'bg-red-700'
    else if (rating >= 5 && rating < 6) bgColor = 'bg-red-500'
    else if (rating >= 6 && rating < 6.5) bgColor = 'bg-orange-500'
    else if (rating >= 6.5 && rating < 8) bgColor = 'bg-green-500'
    else if (rating >= 8.1 & rating <= 10) bgColor = 'bg-blue-500'
    return bgColor;
  }

  return (
    <div className="h-full">
      <div className="block mx-auto my-2 bg-slate-50 rounded-lg">
        {isLoaded && homeStartingXI ? (
          <>
            <div className="block md:flex md:flex-row md:justify-around lg:justify-center my-2">

              <div className="relative xs:top-[90%] w-full sm:w-8/12 lg:w-6/12 mx-auto p-1">
                {/*  home team's logo, name and rating*/}
                <div className={`p-2 w-full flex flex-row justify-between mx-auto rounded-md bg-slate-800`}>
                  <div className="flex justify-start sm:justify-center space-x-2 px-auto">
                    <img alt={homeTeamProfile.name} src={homeTeamProfile.logo} className="w-8 h-8" />
                    <span className="text-left flex items-center text-slate-50 border-none">
                      {lang === 'ar' ? getTeamByName(homeTeamProfile.name) : homeTeamProfile.name}
                    </span>
                    <span className={`flex justify-center items-center w-6 h-6 sm:w-8 sm:h-8 mx-2 text-center ${ratingBGColor(teamRating(homePlayers))} text-slate-50 border-none`}>
                      {teamRating(homePlayers)}
                    </span>
                  </div>
                  <div className="flex justify-center space-x-2 px-auto text-slate-50 text-lg">
                    {
                      homeTeamProfile.formation?.join(' - ')
                    }
                  </div>
                </div>
                {/* Playground */}
                {
                  homeTeamProfile.formation.length > 0 && awayTeamProfile.formation.length > 0 ?
                    <SoccerPlayground
                      homeLines={linesPositions()[0]}
                      awayLines={linesPositions()[1]}
                    />
                    : //to display players in a table in case of no formation is provided:
                    <div>
                      {/* teams header */}
                      <div className="flex flex-row w-full justify-between divide-x-2 my-1">
                        <div
                          className={`flex justify-start items-center w-[90%] rounded-lg p-1 space-x-1  ${clickedTeam === homeTeamProfile.id ? "bg-slate-800" : "bg-slate-400"} cursor-pointer`}
                          onClick={() => setClickedTeam(homeTeamProfile.id)}
                        >
                          <img alt={homeTeamProfile.name} src={homeTeamProfile.logo} className="size-8 sm:size-10" />
                          <span className="text-center text-sm text-slate-50 border-none">
                            {lang === 'ar' ? getTeamByName(homeTeamProfile.name) : homeTeamProfile.name}
                          </span>
                        </div>
                        <div
                          className={`flex justify-end items-center space-x-1 w-[90%] rounded-lg p-1 ${clickedTeam === awayTeamProfile.id ? "bg-slate-800" : "bg-slate-400"} cursor-pointer`}
                          onClick={() => setClickedTeam(awayTeamProfile.id)}
                        >
                          <span className="text-center text-sm text-slate-50 border-none">
                            {lang === 'ar' ? getTeamByName(awayTeamProfile.name) : awayTeamProfile.name}
                          </span>
                          <img alt={awayTeamProfile.name} src={awayTeamProfile.logo} className="size-8 sm:size-10" />
                        </div>
                      </div>
                      {/* Team's players */}
                      {
                        clickedTeam === homeTeamProfile.id ?
                          <PlayersTable startingXI={homeStartingXI} players={homePlayers} />
                          :
                          <PlayersTable startingXI={awayStartingXI} players={awayPlayers} />
                      }
                    </div>
                }

                {/* Away team's logo, name and rating*/}
                <div className={`p-2 flex flex-row justify-between w-full mx-auto rounded-md bg-slate-800`}>
                  <div className="flex justify-start sm:justify-center space-x-2 px-auto">
                    <img alt={awayTeamProfile.name} src={awayTeamProfile.logo} className="w-8 h-8" />
                    <span className="text-left flex items-center text-slate-50 border-none">
                      {lang === 'ar' ? getTeamByName(awayTeamProfile.name) : awayTeamProfile.name}
                    </span>
                    <span className={`flex justify-center items-center w-6 h-6 sm:w-8 sm:h-8 text-center text-slate-50 ${ratingBGColor(teamRating(awayPlayers))} border-none`}>
                      {
                        teamRating(awayPlayers)
                      }
                    </span>
                  </div>
                  <div className="flex justify-center space-x-2 px-auto text-slate-50 text-lg">
                    {
                      awayTeamProfile.formation?.join(' - ')
                    }
                  </div>
                </div>
              </div>

              {/* Coaches and subs section */}
              <div className="relative xs:top-[90%] md:top-[45%] w-full sm:w-[45%] mx-auto p-1">
                {
                  <>
                    <div className="flex flex-row w-full justify-between divide-x-2 my-1">
                      <div
                        className={`flex justify-start items-center w-[90%] rounded-lg p-1 gap-2  ${clickedSub === homeTeamProfile.id ? "bg-slate-800" : "bg-slate-400"} cursor-pointer`}
                        onClick={() => setClickedSub(homeTeamProfile.id)}
                      >
                        <img alt={homeTeamProfile.name} src={homeTeamProfile.logo} className="size-8 sm:size-10" />
                        <span className="text-center text-sm sm:text-lg text-slate-50 border-none">
                          {lang === 'ar' ? getTeamByName(homeTeamProfile.name) : homeTeamProfile.name}
                        </span>
                      </div>
                      <div
                        className={`flex justify-end items-center gap-2 w-[90%] rounded-lg p-1 ${clickedSub === awayTeamProfile.id ? "bg-slate-800" : "bg-slate-400"} cursor-pointer`}
                        onClick={() => setClickedSub(awayTeamProfile.id)}
                      >
                        <span className="text-center text-sm sm:text-lg text-slate-50 border-none">
                          {lang === 'ar' ? getTeamByName(awayTeamProfile.name) : awayTeamProfile.name}
                        </span>
                        <img alt={awayTeamProfile.name} src={awayTeamProfile.logo} className="size-8 sm:size-10" />
                      </div>
                    </div>
                    {clickedSub === homeId ? (
                      <>
                        {/* home coach and subs */}
                        <CoachAndSubs coach={homeCoach} substitutes={homeSubstitutes}/>
                      </>
                    ) : (
                      <>
                        {/* away coach and subs */}
                        <CoachAndSubs coach={awayCoach} substitutes={awaySubstitutes} />
                      </>
                    )}
                    {/* Ratings */}
                    <Ratings
                      teams={{ home: homeTeamProfile, away: awayTeamProfile }}
                      statistics={{ home: homePlayers, away: awayPlayers }}
                    />
                  </>
                }
              </div>
            </div>
          </>
        ) : isLoaded && !homeStartingXI ? <p className="h-full">No Data Available</p>
          : <Spinner />
        }
      </div>
    </div>
  );
}

export default memo(LineUp);