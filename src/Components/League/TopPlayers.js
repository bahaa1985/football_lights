import React, { useState, useEffect } from "react";
import { getTopScorers, getTopAssists } from "../../Api/getPlayerProfile.js";

export default function TopPlayers(props) {
  const leagueId = props.league;
  const season = props.season;
  const stats_type = props.type;
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    if (stats_type === "goals") {
      getTopScorers(leagueId, season).then((result) => {
        setTopPlayers(result.data.response);
      });
    } else {
      getTopAssists(leagueId, season).then((result) => {
        setTopPlayers(result.data.response);
      });
    }
  }, [leagueId, season, stats_type]);

  // console.log("top", topPlayers);

  return (
    <div>
      {
        // topPlayers?
        topPlayers?.map((elem, index) => {
          return (
            <div key={index}>
              <div>
                <span>Name</span>
                <span>{elem.player.name}</span>
                <img src={elem.player.photo} alt={elem.player.name} />
                <span>Team</span>
                <span>{elem.statistics[0].name}</span>
                <img
                  src={elem.statistics[0].team.logo}
                  alt={elem.statistics[0].name}
                />
              </div>
              <div>
                {stats_type === "goals" ? (
                  <span>{elem.statistics[0].goals.total}</span>
                ) : (
                  <span>{elem.statistics[0].goals.assists}</span>
                )}
              </div>
            </div>
          );
        })
        // :null
      }
    </div>
  );
}
