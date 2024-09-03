import React, { useState, useEffect, useRef } from "react";
import { getLeagues } from "../Api/getLeaguesTeams.js";
import { getTeam } from "../Api/getLeaguesTeams.js";
import { setCookies,getCookies } from "../Api/cookie.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";
import { color } from "@mui/system";
import Pagination from "./Pagination.js";

export default function Preferences(params) {
  const [searchLeague, setSearchLeague] = useState("");
  const [searchTeam, setSearchTeam] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [leaguesIds,setLeaguesIds]=useState([]);
  const [preferedTeams,setPreferedTeams]=useState([]);
  const [teamsIds,setTeamsIds]=useState([]);
  const searchLeagueInput = useRef("");
  const searchTeamInput = useRef("");


  //use Effect:
  useEffect(() => {
    if(searchLeague.trim().length>0){
      getLeagues(searchLeague).then((result) => {
        setLeagues(result.data.response);       
      });
    }
        
    if(searchTeam.trim().length>0){
      getTeam(searchTeam).then((result) => {
        setTeams(result.data.response);
      });
    }

  }, [searchLeague, searchTeam]);
  
  // console.log("prefered leagues",preferedLeagues);
  return (
    <div className="relative top-20 left-0 px-auto flex justify-around">
      <div className="w-[40%] sm:w-[45%]">
        <div className="text-left w-full bg-red-700  p-2">
          <input type="text" ref={searchLeagueInput} className="outline-none rounded-md pl-1" placeholder="type country or league name" />
          <button className="w-26 text-lg mx-2 p-2  rounded-md bg-slate-900 text-[#fff]"
            onClick={() =>setSearchLeague(searchLeagueInput.current.value)}>
            Search League
          </button>
          </div>
          {
            leagues?
            <Pagination source={leagues}/>
            :<p>No leagues available</p>
          }
      </div>
     
      {/* search teams */}
      <div className="w-[40%] sm:w-[45%] ">
            <div className="text-left bg-red-700 p-2">
              <input type="text" ref={searchTeamInput} className="outline-none rounded-md pl-1" placeholder="type country or team name" />
              <button className="w-26 text-lg mx-2 p-2  rounded-md bg-slate-900 text-[#fff]" 
              onClick={() => setSearchTeam(searchTeamInput.current.value)}>
                Search Team
              </button>
            </div>
            {
              teams?
              <Pagination source={teams} />
              :<p>No teams available</p>
            }
      </div>                      
      </div>
  );
}
