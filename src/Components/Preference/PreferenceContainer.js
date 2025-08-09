import React, { useState, useEffect, useRef } from "react";
import { getLeagues, getTeams } from "../../Api/LeaguesTeams.js";
import Pagination from "./Pagination.js";
import setPreferences from "../../Api/UserPreferences.js"
import { getCookie, setCookie } from "../../Api/cookie.js";
import { getTranslation } from "../Translation/labels.js";
import { countries } from "../Translation/countries.js";
import { getCountryNameTranslation } from "../Translation/countries.js";

export default function Preferences(params) {
  const [searchLeague, setSearchLeague] = useState("");
  const [searchTeam, setSearchTeam] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('user_preferences'))?.lang || "en");
  const [selectedCountry,setSelectedCountry] = useState('');
  
  const searchLeagueInput = useRef("");
  const searchTeamInput = useRef("");
  
  //get or set user's language:
  function handleLanguage(language){
    // console.log("lang",language);
    switch(language){
      case 'en':
        setLanguage('en'); //english
        setPreferences()
        break;
      case 'fr':
        setLanguage('fr'); //french
        setPreferences(lang)
        window.localStorage.setItem('user_preferences',JSON.stringify({lang:language,tags:'football'}))
        break;
      case 'es':
        setLanguage('es'); //spanish
        window.localStorage.setItem('user_preferences',JSON.stringify({lang:language,tags:'fútbol'}))
        break;
      case 'ar':
        setLanguage('ar');//arabic       
        window.localStorage.setItem('user_preferences',JSON.stringify({lang:language,tags:'كرة القدم'}))
        break;
      case 'it':
        setLanguage('it');//italian
        window.localStorage.setItem('user_preferences',JSON.stringify({lang:language,tags:'calcio'}))
        break;
      case 'pt':
        setLanguage('pt');//portugeuse
        window.localStorage.setItem('user_preferences',JSON.stringify({lang:language,tags:'futebol'}))
        break;
      default:
        setLanguage('en');
        window.localStorage.setItem('user_preferences',JSON.stringify({lang:language,tags:'soccer'}))
    }
    
  }

  

  const lang= JSON.parse(localStorage.getItem('user_preferences'))?.lang || "en";
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
    <div className='w-full h-[450px] p-4 mx-auto overflow-y-scroll bg-slate-100 rounded-lg'>
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
      {/*  */}
      <div className="flex flex-row items-center gap-2 mb-4">
        <label htmlFor="language" className="block text-lg font-semibold text-gray-700">
          {getTranslation('Choose a country', lang)}
        </label>
        <select
          id="country"
          name="country"
          className="p-2 border rounded-md bg-white shadow-sm focus:outline-none w-full sm:w-auto"
          onChange={(e) => setSelectedCountry(e.target.value)}
          defaultValue={selectedCountry}
          >
          {
            Object.entries(countries).map((country,index)=>{
            return <option key={index} value={lang==='ar' ? country[1][lang]:country[0]}>
              {lang === 'ar' ? country[1][lang]: country[0]}
            </option>
          })
          }
        </select>
      </div>
      <div className="sm:h-auto px-auto sm:flex sm:justify-between gap-4">
        {/* Search leagues */}
        <div className="w-full sm:w-[48%] bg-white shadow-md rounded-lg p-4">
          <div className="w-full text-left flex justify-between items-center mb-4">
            <input
              type="text"
              ref={searchLeagueInput}
              className="outline-none rounded-md px-2 py-1 border mr-2"
              placeholder={getTranslation("Enter Country Or League Name", lang)}
            />
            <button
              className="text-md px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setSearchLeague(getCountryNameTranslation(searchLeagueInput.current.value,'en'))}
            >
              {getTranslation('Search', lang)}
            </button>
          </div>
          {/*  */}
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
              className="outline-none rounded-md px-2 py-1 border l mr-2"
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
