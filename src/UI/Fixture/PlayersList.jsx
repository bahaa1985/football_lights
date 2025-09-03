//This component used to display team line up players in table,
// as some old fixtures has no formation data provided, so we can't display them as playground lines

import React, { useState } from "react";
import { getTeamByName } from "../../Translation/teams.js";

export default function PlayersTable(props) {
  const homeStartingXI = props.startingXI.home;
  const awayStartingXI = props.startingXI.away;
  const homePlayers = props.players.home;
  const awayPlayers = props.players.away;
  const homeTeamProfile = props.profiles.home;
  const awayTeamProfile = props.profiles.away;

  const [clickedTeam, setClickedTeam] = useState(homeTeamProfile.id);
  const [startingXI, setStartingXI] = useState(homeStartingXI);
  const [players, setPlayers] = useState(homePlayers);

  const lang =
    JSON.parse(localStorage.getItem("user_preferences"))?.lang || "en";

  return (
    <div>
      {/* teams header */}
      <div className="flex flex-row w-full justify-between divide-x-2 my-1">
        <div
          className={`flex justify-start items-center w-[90%] rounded-lg p-1 space-x-1  ${clickedTeam === homeTeamProfile.id ? "bg-slate-800" : "bg-slate-400"} cursor-pointer`}
          onClick={() => [
            setClickedTeam(homeTeamProfile.id),
            setStartingXI(homeStartingXI),
            setPlayers(homePlayers),
          ]}
        >
          <img
            alt={homeTeamProfile.name}
            src={homeTeamProfile.logo}
            className="size-8 sm:size-10"
          />
          <span className="text-center text-sm text-slate-50 border-none">
            {lang === "ar"
              ? getTeamByName(homeTeamProfile.name)
              : homeTeamProfile.name}
          </span>
        </div>
        <div
          className={`flex justify-end items-center space-x-1 w-[90%] rounded-lg p-1 ${clickedTeam === awayTeamProfile.id ? "bg-slate-800" : "bg-slate-400"} cursor-pointer`}
          onClick={() => [
            setClickedTeam(awayTeamProfile.id),
            setStartingXI(awayStartingXI),
            setPlayers(awayPlayers),
          ]}
        >
          <span className="text-center text-sm text-slate-50 border-none">
            {lang === "ar"
              ? getTeamByName(awayTeamProfile.name)
              : awayTeamProfile.name}
          </span>
          <img
            alt={awayTeamProfile.name}
            src={awayTeamProfile.logo}
            className="size-8 sm:size-10"
          />
        </div>
      </div>

      {/* Team's players */}

      {startingXI.map((player, index) => {
        return (
          <div
            key={index}
            className="flex flex-row justify-between border-b border-solid border-slate-400"
          >
            <img
              className="size-6 sm:size-10"
              src={
                players?.filter(
                  (item) => item.player.id === player.player.id
                )[0].player.photo
              }
              alt={player.player.name}
            />
            <span className="flex space-x-3 border-none text-sm md:text-lg">
              {player.player.number}&nbsp;&nbsp;{player.player.name}
            </span>
            <span className="border-none text-sm flex justify-center items-center">
              {player.player.pos === "D"
                ? "Defender"
                : player.player.pos === "M"
                  ? "Midfielder"
                  : player.player.pos === "F"
                    ? "Forward"
                    : player.player.pos === "G"
                      ? "GoalKeeper"
                      : null}
            </span>
          </div>
        );
      })}
    </div>
  );
}
