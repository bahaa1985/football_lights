import React, { useState, useEffect, useRef } from "react";
import { getLeagues } from "../Api/getLeaguesTeams.js";
import { getTeam } from "../Api/getLeaguesTeams.js";
import Cookies from "universal-cookie";

export default function Preferences(params) {
  const [searchLeague, setSearchLeague] = useState("");
  const [searchTeam, setSearchTeam] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const searchLeagueInput = useRef("");
  const searchTeamInput = useRef("");
  let selectedTeams = [];
  const [selectedLeagues,setSelectedLeagues] = useState([]);

  useEffect(() => {
    getLeagues(searchLeague).then((result) => {
      setLeagues(result.data.response);
    });
    getTeam(searchTeam).then((result) => {
      setTeams(result.data.response);
    });
  }, [searchLeague, searchTeam]);

  function handleLeaguesCookie() {
    const cookie = new Cookies();
    cookie.set("selectedLeagues", selectedLeagues);
  }

  function handleTeamsCookie() {
    const cookie = new Cookies();
    cookie.set("preferedTeams", selectedTeams);
  }
  return (
    <div>
      {/* search leagues */}
      <div>
        <input type="text" ref={searchLeagueInput} />
        <button
          onClick={() => setSearchLeague(searchLeagueInput.current.value)}
        >
          SearchLeague
        </button>
        {leagues?.map((elem, index) => {
          return (
            <div key={index}>
              {elem.league.name} {elem.league.id} ({elem.country.name})         
              <img
                src={elem.league?.logo}
                style={{ width: "40px", height: "40px" }}
                alt={elem.league.name}
              />
              <input
                type="checkbox" value={elem.league.id} defaultChecked={(e)=>e.target.value === elem.league.id ? false:null}
                onChange={(e)=>
                  e.target.checked
                    ? [selectedLeagues.push(parseInt(elem.league.id)),setSelectedLeagues(selectedLeagues),console.log(selectedLeagues)]
                    : [selectedLeagues.splice(
                        selectedLeagues.indexOf(parseInt(elem.league.id)),
                        1
                      ),console.log(selectedLeagues)]
                }
              />
            </div>
          );
        })}
        {/* <div>
          {selectedLeagues.map((elem, index) => {
            return <div>{elem}</div>;
          })}
        </div> */}
        <div>
          <button onClick={() => handleLeaguesCookie()}>
            Selected Leagues
          </button>
        </div>
      </div>
      {/* search teams */}
      <div>
        <input type="text" ref={searchTeamInput} />
        <button onClick={() => setSearchTeam(searchTeamInput.current.value)}>
          Search
        </button>
        {teams?.map((elem, index) => {
          return (
            <div key={index}>
              {elem.team.name} {elem.team.id} ({elem.team.country})
              <img
                src={elem.team?.logo}
                style={{ width: "40px", height: "40px" }}
                alt={elem.team.name}
              />
              <input
                type="checkbox"
                onChange={(e) =>
                  e.target.checked
                    ? [selectedTeams.push(parseInt(elem.team.id)),console.log(selectedTeams)]
                    : selectedTeams.splice(
                        selectedTeams.indexOf(parseInt(elem.team.id)),
                        1
                      )
                }
              />
            </div>
          );
        })}
        <div>
          {selectedTeams.map((elem, index) => {
            return <div>{elem}</div>;
          })}
        </div>
        <div>
          <button onClick={() => handleTeamsCookie()}>Selected Teams</button>
        </div>
      </div>
    </div>
  );
}
