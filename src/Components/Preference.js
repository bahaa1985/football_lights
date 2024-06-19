import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import { getLeagues } from "../Api/getLeaguesTeams.js";
import { getTeam } from "../Api/getLeaguesTeams.js";
import { setPreferedLeaguesCookie , getPreferdLeaguesFromCookie } from "../Api/cookie.js";
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
    console.log("prefered leagues: ",getPreferdLeaguesFromCookie());
    preferedArr=getPreferdLeaguesFromCookie();
    if(preferedArr.filter(obj=>obj.id===leagueId)[0] === undefined){
      preferedArr.push({'id':leagueId,'season':season});
      console.log(preferedArr);
    }
    else{
      const index=preferedArr.indexOf(preferedArr.filter(obj=>obj.id===leagueId)[0])
      preferedArr=preferedArr.slice(0,index).concat(preferedArr.slice(index+1));
      console.log(preferedArr);      
    }
    setPreferedLeaguesCookie(preferedArr)
  }

  function addToSelectedTeams(leagueId){
      
      setPreferedLeaguesCookie(leagueId)
  }

  function removeFromSelectedTeams(index){       
    setPreferedTeams(preferedTeams.slice(0,index).concat(preferedTeams.slice(index+1)));
    preferedTeams.splice(index,1);
  }


  function handleTeamsCookie() {
    const cookie = new Cookies();
    cookie.set("preferedTeams", preferedTeams);
    console.log("prefered teams cookie is created");
  }

  // console.log("prefered leagues",preferedLeagues);
  return (
    <div>
      <div className="container-fluid d-flex flex-wrap text-center">
        <div className="col-sm-6 text-start">
          <input type="text" ref={searchLeagueInput} />
          <button
            onClick={() => setSearchLeague(searchLeagueInput.current.value)}
          >
            SearchLeague
          </button>
          {leagues?.map((elem, index) => {
            return (
              <div key={index} onClick={()=>{
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
                {elem.league.name} {elem.league.id} ({elem.country.name})         
              </div>
            );
          })}
        </div>
        {/*  */}
        <div className="col-sm-6">
          {/* {preferedLeagues?.map((elem, index) => {
            return (
                  <div key={index} onClick={()=>[
                    removeFromSelectedLeagues(index),
                    console.log("selected",preferedLeagues)
                    ]}>
                    <img src={elem.league.logo} alt={elem.league.name}/>
                    <div>{elem.league.name}</div>
                    <span>{index}</span>
                  </div>
                )
          })} */}
          <button onClick={() => setPreferedLeaguesCookie(preferedLeagues)}>
            Save Leagues
          </button>
        </div>
      </div>
      {/* search leagues */}
     
      {/* search teams */}
      <div className="container-fluid d-flex flex-wrap text-center">
              <div className="col-sm-6">
            <input type="text" ref={searchTeamInput} />
            <button onClick={() => setSearchTeam(searchTeamInput.current.value)}>
              Search
            </button>
            {teams?.map((elem, index) => {
              return (
                <div key={index} onClick={()=>[addToSelectedTeams(elem),console.log("selected teams",preferedTeams)]}>
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
            <div className="col-sm-6">
              {preferedTeams?.map((elem, index) => {
                return (
                  <div key={index} onClick={()=>[
                    removeFromSelectedTeams(index),
                    console.log("selected teams",preferedTeams)
                    ]}>
                    <img src={elem.team.logo} alt={elem.team.name}/>
                    <div>{elem.team.name}</div>
                    <span>{index}</span>
                  </div>
                )
              })}
              <button onClick={() => [handleTeamsCookie(),console.log("selected teams",preferedTeams)]}>Selected Teams</button>
            </div>
      </div>                      
      </div>
  );
}
