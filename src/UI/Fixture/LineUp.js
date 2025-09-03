import { React, memo, useEffect } from "react";
import { useState } from "react";
import SoccerPlayground from "./SoccerPlayground.js";
import LinePosition from "./LinePosition.js";
import Ratings from "./Ratings.js";
import getLineUps from "../../api/LineUp.js";
import getPlayers from "../../api/Players.js";
import CoachAndSubs from "./CoachAndSubs.jsx";
import PlayersTable from "./PlayersList.jsx";
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
  const [isLoaded, setLoaded] = useState(false); //for preventing rendering before complete fetching data
  //

  const dispatch = useDispatch();
  const requests_count = useSelector(state => state.counter.requestsCount);

  useEffect(() => {
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
  function linesPositions(profile, startingXI, players) { // this function will not be called if no formation is provided, the players will be displayed as stack
    if (homeTeamProfile?.formation.length > 0 && awayTeamProfile?.formation.length > 0) {
      let lines = []
      // Home Lines:
      for (let i = 0; i < profile?.formation?.length + 1; i++) {
        const sp_lineup =
          startingXI
            .filter((elem) => parseInt(elem.player.grid[0]) === i + 1)
            .sort(
              (playerA, playerB) =>
                parseInt(playerB.player.grid[2]) - parseInt(playerA.player.grid[2])
            );
        lines.push(
          <LinePosition
            lineup={sp_lineup}
            grid={(i + 1).toString()}
            colors={homeGkColor}
            statistics={players}
          />
        );
      }
      return lines
    }
  }

  return (
    <div className="h-full">
      <div className="block mx-auto my-2 bg-slate-50 rounded-lg">
        {isLoaded && homeStartingXI ? (
          <>
            <div className="block md:flex md:flex-row md:justify-around lg:justify-center my-2">

              <div className="relative xs:top-[90%] w-full sm:w-8/12 lg:w-6/12 mx-auto p-1">
                {/* Playground */}
                {
                  homeTeamProfile.formation.length > 0 && awayTeamProfile.formation.length > 0 ?
                    <SoccerPlayground
                      lines={{ home: linesPositions(homeTeamProfile, homeStartingXI, homePlayers), away: linesPositions(awayTeamProfile, awayStartingXI, awayPlayers) }}
                      profiles={{ home: homeTeamProfile, away: awayTeamProfile }}
                      players={{ home: homePlayers, away: awayPlayers }}
                    />
                    : //to display players in a table in case of no formation is provided:
                    <div>
                      {/* Team's players */}
                      {
                        <PlayersTable
                          profiles={{ home: homeTeamProfile, away: awayTeamProfile }}
                          startingXI={{ home: homeStartingXI, away: awayStartingXI }}
                          players={{ home: homePlayers, away: awayPlayers }}
                        />
                      }
                    </div>
                }
              </div>

              {/* Coaches and subs section */}
              <div className="relative xs:top-[90%] md:top-[45%] w-full sm:w-[45%] mx-auto p-1">
                {/* home coach and subs */}
                <CoachAndSubs
                  profiles={{ home: homeTeamProfile, away: awayTeamProfile }}
                  coaches={{ home: homeCoach, away: awayCoach }}
                  substitutes={{ home: homeSubstitutes, away: awaySubstitutes }}
                />
                {/* Ratings */}
                <Ratings
                  teams={{ home: homeTeamProfile, away: awayTeamProfile }}
                  statistics={{ home: homePlayers, away: awayPlayers }}
                />
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