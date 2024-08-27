import React, { useState, useEffect, useRef } from "react";
import { getLeagues } from "../Api/getLeaguesTeams.js";
import { getTeam } from "../Api/getLeaguesTeams.js";
import { setCookies,getCookies } from "../Api/cookie.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";

export default function Preferences(params) {
  const [searchLeague, setSearchLeague] = useState("");
  const [searchTeam, setSearchTeam] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [preferedLeagues,setPreferedLeagues] = useState([]);
  const [leaguesIds,setLeaguesIds]=useState([]);
  const [preferedTeams,setPreferedTeams]=useState([]);
  const [teamsIds,setTeamsIds]=useState([]);
  const [isActive, setIsActive] = useState(false);
  const [backgroundSelected,setBackgroundSelected]=useState('white');
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

 
  function handlePreferedLeagues(leagueId,season){
    let preferedArr=[];
    console.log("prefered leagues: ",getCookies("prefered_leagues"));
    preferedArr=getCookies("prefered_leagues");
    if(preferedArr.filter(obj=>obj.id===leagueId)[0] === undefined){
      preferedArr.push({'id':leagueId,'season':season});
      console.log("selected leagues: ",preferedArr);
    }
    else{
      const index=preferedArr.indexOf(preferedArr.filter(obj=>obj.id===leagueId)[0])
      preferedArr=preferedArr.slice(0,index).concat(preferedArr.slice(index+1));
      console.log("selected leagues: ",preferedArr);    
    }
    setPreferedLeagues(preferedArr);
  }

  function handlePreferedTeams(teamId){
    let preferedArr=[];
    console.log("prefered leagues: ",getCookies("prefered_leagues"));
    preferedArr=getCookies("prefered_teams");
    if(preferedArr.filter(obj=>obj.id===teamId)[0] === undefined){
      preferedArr.push({'id':teamId});
      console.log(preferedArr);
    }
    else{
      const index=preferedArr.indexOf(preferedArr.filter(obj=>obj.id===teamId)[0])
      preferedArr=preferedArr.slice(0,index).concat(preferedArr.slice(index+1));
      console.log(preferedArr);      
    }
    setPreferedTeams(preferedArr);
  }


  function handleTeamsCookie() {
    const cookie = new Cookies();
    cookie.set("preferedTeams", preferedTeams);
    console.log("prefered teams cookie is created");
  }

  // console.log("prefered leagues",preferedLeagues);
  return (
    <div className="relative top-20 left-0 p-4">
      <div className="flex flex-wrap text-center">
        <div className="text-left">
          <input type="text" ref={searchLeagueInput} className="outline" />
          <button className="w-26 text-lg mx-2 p-2  rounded-md bg-slate-900 text-[#fff]"
            onClick={() => [setSearchLeague(searchLeagueInput.current.value),console.log(searchLeagueInput.current.value)]}>
            Search League
          </button>
          {leagues?.map((elem, index) => {
            return (
              <div key={index} className="cursor-pointer" onClick={()=>{
                const latestSeasonIndex = elem.seasons.length-1;
                handlePreferedLeagues(elem.league.id,elem.seasons[latestSeasonIndex].year);
                backgroundSelected === 'white' ? setBackgroundSelected('lightgreen'): setBackgroundSelected('white')
              }}          
              // style={{backgroundColor: (isLeagueSelected(elem.league.id) ? 'lightgreen':'white')}}
              >
                <img
                  src={elem.league?.logo}
                  style={{ width: "40px", height: "40px" }}
                  alt={elem.league.name}
                /> 
                {elem.league.name} ({elem.country.name})         
                <FontAwesomeIcon icon={faStar} 
                                 className={`border-black ${preferedLeagues.find(ele=>ele.id===elem.league.id) ? "text-blue-700" : "text-white"}`} 
                                 onClick={()=>setIsActive(!isActive)}/>
              </div>
            );
          })}
        </div>
        {/*  */}
        <div>
          <button className="w-auto text-lg mx-2 p-2  rounded-md bg-slate-900 text-[#fff]" 
          onClick={() => [setCookies(preferedLeagues,"prefered_leagues"),setLeagues([])]}>
            Save
          </button>
        </div>
      </div>
      {/* search leagues */}
     
      {/* search teams */}
      <div className="flex flex-wrap text-center mt-4">
              <div className="text-left">
            <input type="text" ref={searchTeamInput} className="outline" />
            <button className="w-26 text-lg mx-2 p-2  rounded-md bg-slate-900 text-[#fff]" onClick={() => setSearchTeam(searchTeamInput.current.value)}>
              Search Team
            </button>
            {teams?.map((elem, index) => {
              return (
                <div key={index} onClick={()=>[handlePreferedTeams(elem.team.id),console.log("selected teams",preferedTeams)]}>
                  {elem.team.name} {elem.team.id} ({elem.team.country})
                  <img
                    src={elem.team?.logo}
                    style={{ width: "40px", height: "40px" }}
                    alt={elem.team.name}
                  />              
                </div>
              );
            })}
            <div>          
        </div>
            </div>
            <div>
              <button className="w-auto text-lg mx-2 p-2  rounded-md bg-slate-900 text-[#fff]" onClick={() => [handleTeamsCookie(),console.log("selected teams",preferedTeams)]}>
                Save
              </button>
            </div>
      </div>                      
      </div>
  );
}
