import React from "react";
import { useState } from "react";
import { getTeamByName } from "../../Translation/teams.js";
import { getTranslation } from "../../Translation/labels.js";

export default function CoachAndSubs(props) {
  const homeTeamProfile = props.profiles.home;
  const awayTeamProfile = props.profiles.away;
  const homeCoach = props.coaches.home;
  const awayCoach = props.coaches.away;
  const homeSubstitutes = props.substitutes.home;
  const awaySubstitutes = props.substitutes.away;

  const [clickedTeam, setClickedTeam] = useState(homeTeamProfile.id);
  const [coach, setCoach] = useState(homeCoach);
  const [substitutes, setSubstitutes] = useState(homeSubstitutes);

  const lang =
    JSON.parse(localStorage.getItem("user_preferences"))?.lang || "en";

  return (
    <div>
      <div className="flex flex-row w-full justify-between divide-x-2 my-1">
        <div
          className={`flex justify-start items-center w-[90%] rounded-lg p-1 gap-2  ${clickedTeam === homeTeamProfile.id ? "bg-slate-800" : "bg-slate-400"} cursor-pointer`}
          onClick={() => [
            setClickedTeam(homeTeamProfile.id),
            setCoach(homeCoach),
            setSubstitutes(homeSubstitutes),
          ]}
        >
          <img
            alt={homeTeamProfile.name}
            src={homeTeamProfile.logo}
            className="size-8 sm:size-10"
          />
          <span className="text-center text-sm sm:text-lg text-slate-50 border-none">
            {lang === "ar"
              ? getTeamByName(homeTeamProfile.name)
              : homeTeamProfile.name}
          </span>
        </div>
        <div
          className={`flex justify-end items-center gap-2 w-[90%] rounded-lg p-1 ${clickedTeam === awayTeamProfile.id ? "bg-slate-800" : "bg-slate-400"} cursor-pointer`}
          onClick={() => [
            setClickedTeam(awayTeamProfile.id),
            setCoach(awayCoach),
            setSubstitutes(awaySubstitutes),
          ]}
        >
          <span className="text-center text-sm sm:text-lg text-slate-50 border-none">
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
      <div className="flex flex-row justify-start gap-2">
        <img
          class="w-10 h-10 sm:w-14 sm:h-14 rounded-full"
          alt=""
          src={coach.photo}
        />
        <span className="border-none flex justify-center items-center text-sm sm:text-lg">
          Coach: {coach.name}
        </span>
      </div>
      <div>
        {substitutes?.map((sub, index) => {
          return (
            <div
              key={index}
              className="flex flex-row justify-between p-1 border-b border-solid border-slate-400"
            >
              <span className="flex space-x-3 border-none text-sm sm:text-lg">
                {sub.player.number}&nbsp;&nbsp;{sub.player.name}
              </span>
              <span className="border-none text-sm sm:text-lg flex justify-center items-center">
                {sub.player.pos === "D"
                  ? getTranslation("Defender", lang)
                  : sub.player.pos === "M"
                    ? getTranslation("Midfielder", lang)
                    : sub.player.pos === "F"
                      ? getTranslation("Forward", lang)
                      : sub.player.pos === "G"
                        ? getTranslation("GoalKeeper", lang)
                        : null}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
