import React, { useState, useEffect, useRef } from "react";
import { getLeagues } from "../../Api/getLeaguesTeams.js";
import { getTeam } from "../../Api/getLeaguesTeams.js";
import Pagination from "./Pagination.js";
import { getCookie, setCookie } from "../../Api/cookie.js";
import LeaguesPagination from "./LeaguesPagination.js";
import TeamsPagination from "./TeamsPagination.js";

export default function Preferences(params) {
  const [searchLeague, setSearchLeague] = useState("");
  const [searchTeam, setSearchTeam] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [language, setLanguage] = useState(getCookie("language") || "en");
  const searchLeagueInput = useRef("");
  const searchTeamInput = useRef("");

  //get or set user's language:
  function handleLanguage(language){
    console.log("lang",language);
    setCookie(language,"language");
  }
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

  return (
    <div className="relative top-20 left-0 h-full">
      <div>
        <label for="language">Choose a language:</label>
        <select id="language" name="language" onChange={(e) => handleLanguage(e.target.value)} defaultValue={language}>
          <option key={0} value="en">English</option>
          <option key={1} value="fr">Français</option>
          <option key={2} value="es">Español</option>
          <option key={3} value="ar">عربي</option>
          <option key={4} value="zh">中文</option>
          <option key={5} value="ja">日本語</option>
          <option key={6} value="it">Italiano</option>
          <option key={7} value="pt">Português</option>
        </select>
      </div>
      <div className="sm:h-auto px-auto sm:flex sm:justify-around">
        {/* search teams */}
        <div className="w-[90%] h-[50%] sm:h-full sm:w-[45%]">
          <div className="w-full text-left flex justify-between p-2">
            <input type="text" ref={searchLeagueInput} className="outline-none rounded-md pl-1" placeholder="type country or league name" />
            <button className="w-26 text-md mx-2 p-2  rounded-md bg-blue-600 text-slate-50"
              onClick={() =>setSearchLeague(searchLeagueInput.current.value)}>
              Search
            </button>
            </div>
            {
              leagues?
              <Pagination source={leagues}/>
              :<p>No leagues available</p>
            }
        </div>
        <br className="border-b border-black"/>
        {/* search teams */}
        <div className="w-[90%] h-[50%] sm:h-full sm:w-[45%] ">
              <div className="w-full flex justify-between text-left p-2">
                <input type="text" ref={searchTeamInput} className="outline-none rounded-md pl-1" placeholder="type country or team name" />
                <button className="w-26 text-md mx-2 p-2  rounded-md bg-blue-600 text-slate-50" 
                onClick={() => setSearchTeam(searchTeamInput.current.value)}>
                  Search
                </button>
              </div>
              {
                teams?
                <Pagination source={teams} />
                :<p>No teams available</p>
              }
        </div>      
      </div>
                      
      </div>
  );
}
