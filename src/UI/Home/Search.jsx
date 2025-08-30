import React, { useEffect, useState, useRef } from "react";
import { getLeagues, getTeams } from "../../Api/LeaguesTeams.js";
import { getPlayerByName } from "../../Api/PlayerProfile.js";
import { NavLink } from "react-router-dom";
import Favourite from "../../Components/Favourite.jsx";
import { getTranslation } from "../../Translation/labels.js";
import { useSelector, useDispatch } from "react-redux";
import {
  requestsIncrement,
  resetRequests,
} from "../../ReduxStore/counterSlice.js";

export default function Search() {
  const [searchIndex, setSearchIndex] = useState(-1);
  const [isClicked, setClicked] = useState(false);
  const searchRef = useRef(null);
  const [searchKey, setSearchKey] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  const lang = localStorage.getItem("user_preferences")?.lang || "en";

  const dispatch = useDispatch();
  const requests_count = useSelector((state) => state.counter.requestsCount);

  useEffect(() => {
    async function fetchData() {
      if (searchIndex === 0) {
        const leagues_response = await getLeagues(searchKey);
        setLeagues(leagues_response.data.response);
        setClicked(false);
      } else if (searchIndex === 1) {
        const teams_response = await getTeams(searchKey);
        setTeams(teams_response.data.response);
        setClicked(false);
      } else if (searchIndex === 2) {
        const player_response = await getPlayerByName(searchKey);
        setPlayers(player_response.data.response);
        setClicked(false);
      }
      //redux reducer increase requests count by one:
      dispatch(requestsIncrement());
    }
    if (requests_count < 10) {
      fetchData();
    } else {
      alert(
        "API request limit reached. Please wait a minute before making more requests."
      );
    }

    //
    dispatch(resetRequests());
  }, [isClicked, searchIndex, searchKey]);

  return (
    <div className="w-full h-96 mx-auto px-4 overflow-y-scroll bg-slate-100 rounded-lg">
      <div className="w-full md:w-[70%] mx-auto flex flex-col items-center space-y-2">
        <input
          type="text"
          ref={searchRef}
          className="w-full p-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={() => setSearchIndex(-1)}
        />
        <div className="w-full mx-auto flex flex-row justify-between gap-2 my-4">
          <button
            className={`flex-1 py-2 rounded-md font-semibold transition-colors duration-200 ${searchIndex === 0 ? "bg-slate-800 text-white" : "bg-slate-300 text-gray-700"}`}
            onClick={() => [
              setSearchKey(searchRef.current.value),
              setSearchIndex(0),
            ]}
          >
            {getTranslation("League", lang)}
          </button>
          <button
            className={`flex-1 py-2 rounded-md font-semibold transition-colors duration-200 ${searchIndex === 1 ? "bg-slate-800 text-white" : "bg-slate-300 text-gray-700"}`}
            onClick={() => [
              setSearchKey(searchRef.current.value),
              setSearchIndex(1),
            ]}
          >
            {getTranslation("Team", lang)}
          </button>
          <button
            className={`flex-1 py-2 rounded-md font-semibold transition-colors duration-200 ${searchIndex === 2 ? "bg-slate-800 text-white" : "bg-slate-300 text-gray-700"}`}
            onClick={() => [
              setSearchKey(searchRef.current.value),
              setSearchIndex(2),
            ]}
          >
            {getTranslation("Player", lang)}
          </button>
        </div>
      </div>
      <div className="my-2">
        {searchIndex === 0
          ? leagues?.map((item, index) => {
              return (
                <div
                  className="flex flex-row justify-between items-center border-b-2 border-b-slate-400 border-solid"
                  key={index}
                >
                  <NavLink
                    to={`/leagues/${item.league.id}}`}
                    className="flex flex-row justify-between items-center"
                  >
                    <img
                      className="size-6 sm:size-10 rounded-full"
                      src={item.league.logo}
                      loading="lazy"
                      alt={item.league.name}
                    />
                    <span className="border-none">
                      {item.league.name} ({item.country.name})
                    </span>
                  </NavLink>
                  <Favourite
                    elem_id={item.league.id}
                    obj={{
                      id: item.league.id,
                      name: item.league.name,
                      country: item.country.name,
                      logo: item.league.logo,
                      season: item.seasons.at(-1).year,
                      endDate: item.seasons.at(-1).end,
                    }}
                    cookie_name={"prefered_leagues"}
                  />
                </div>
              );
            })
          : searchIndex === 1
            ? teams.map((item, index) => {
                return (
                  <div
                    className="flex flex-row justify-between items-center border-b-2 border-b-slate-400 border-solid"
                    key={index}
                  >
                    <NavLink
                      to={`/teams/${item.team.id}`}
                      className="flex flex-row justify-between items-center "
                    >
                      <img
                        className="size-6 sm:size-10 rounded-full"
                        src={item.team.logo}
                        loading="lazy"
                        alt={item.team.name}
                      />
                      <span className="border-none">
                        {item.team.name} ({item.team.country})
                      </span>
                    </NavLink>
                    <Favourite
                      elem_id={item.team.id}
                      obj={{
                        id: item.team.id,
                        name: item.team.name,
                        logo: item.team.logo,
                      }}
                      cookie_name={"prefered_teams"}
                    />
                  </div>
                );
              })
            : searchIndex === 2
              ? players.map((item, index) => {
                  return (
                    <div
                      className="flex flex-row justify-between items-center border-b-2 border-b-slate-400 border-solid"
                      key={index}
                    >
                      <NavLink
                        to={`/players/${item.player.id}`}
                        className="flex flex-row justify-between items-center "
                      >
                        <img
                          className="size-6 sm:size-10 rounded-full"
                          src={item.player.photo}
                          loading="lazy"
                          alt={item.player.name}
                        />
                        <span className="border-none">{item.player.name}</span>
                      </NavLink>
                    </div>
                  );
                })
              : null}
      </div>
    </div>
  );
}
