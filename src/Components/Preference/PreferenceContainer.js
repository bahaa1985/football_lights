import React, { useState, useEffect, useRef } from "react";
import { getLeagues, getTeams } from "../../Api/LeaguesTeams.js";
import Pagination from "./Pagination.js";
import { getCookie, setCookie } from "../../Api/cookie.js";
import { getTranslation } from "../../multi_language_translations.js";

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
    // console.log("lang",language);
    switch(language){
      case 'en':
        setLanguage('en'); //english
        setCookie("language",{lang:language,tag:'soccer'});
        break;
      case 'fr':
        setLanguage('fr'); //french
         setCookie("language",{lang:language,tag:'football'});
        break;
      case 'es':
        setLanguage('es'); //spanish
         setCookie("language",{lang:language,tag:'fútbol'});
        break;
      case 'ar':
        setLanguage('ar');//arabic
         setCookie("language",{lang:language,tag:'كرة القدم'});
        break;
      case 'zh':
        setLanguage('zh');//chinese
         setCookie("language",{lang:language,tag:'足球'});
        break;
      case 'ja':
        setLanguage('ja'); //japanse
         setCookie("language",{lang:language,tag:'サッカー'});
        break;
      case 'it':
        setLanguage('it');//italian
         setCookie("language",{lang:language,tag:'calcio'});
        break;
      case 'pt':
        setLanguage('pt');//portugeuse
         setCookie("language",{lang:language,tag:'futebol'});
        break;
      default:
        setLanguage('en');
         setCookie("language",{lang:language,tag:'soccer'});
    }
    
  }

  const lang= getCookie("language").lang || "en";
  //use Effect:
  useEffect(() => {
    if(searchLeague.trim().length>0){
      getLeagues(searchLeague).then((result) => {
        setLeagues(result.data.response);       
      });
    }
        
    if(searchTeam.trim().length>0){
      getTeams(searchTeam).then((result) => {
        setTeams(result.data.response);
      });
    }

  }, [searchLeague, searchTeam]);

  return (
    <div className="absolute top-10 w-3/4 h-96 mt-16  rounded-lg bg-gray-100 p-4">
      <div className="flex flex-row items-center gap-2 mb-4">
        <label htmlFor="language" className="block text-lg font-semibold text-gray-700">
          {getTranslation('Choose a Language', lang)}
        </label>
        <select
          id="language"
          name="language"
          className="p-2 border rounded-md bg-white shadow-sm focus:outline-none w-full sm:w-auto"
          onChange={(e) => handleLanguage(e.target.value)}
          defaultValue={language}
        >
          <option key={3} value="ar">عربي</option>
          <option key={0} value="en">English</option>
          <option key={1} value="fr">Français</option>
          <option key={2} value="es">Español</option>
          <option key={6} value="it">Italiano</option>
          <option key={7} value="pt">Português</option>
        </select>
      </div>
      <div className="sm:h-auto px-auto sm:flex sm:justify-between gap-4">
        {/* Search leagues */}
        <div className="w-full sm:w-[48%] bg-white shadow-md rounded-lg p-4">
          <div className="w-full text-left flex justify-between items-center mb-4">
            <input
              type="text"
              ref={searchLeagueInput}
              className="outline-none rounded-md px-2 py-1 border w-full mr-2"
              placeholder={getTranslation("Enter Country Or League Name", lang)}
            />
            <button
              className="text-md px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setSearchLeague(searchLeagueInput.current.value)}
            >
              {getTranslation('Search', lang)}
            </button>
          </div>
          {leagues && leagues.length > 0 ? (
            <Pagination type={'league'} source={leagues} />
          ) : (
            <p className="text-gray-500">{getTranslation('No Leagues Available', lang)}</p>
          )}
        </div>

        {/* Search teams */}
        <div className="w-full sm:w-[48%] bg-white shadow-md rounded-lg p-4">
          <div className="w-full flex justify-between items-center mb-4">
            <input
              type="text"
              ref={searchTeamInput}
              className="outline-none rounded-md px-2 py-1 border w-full mr-2"
              placeholder={getTranslation('Enter Country Or Team Name', lang)}
            />
            <button
              className="text-md px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setSearchTeam(searchTeamInput.current.value)}
            >
              {getTranslation('Search', lang)}
            </button>
          </div>
          {teams && teams.length > 0 ? (
            <Pagination type={'teams'} source={teams} />
          ) : (
            <p className="text-gray-500">{getTranslation('No Teams Available', lang)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
