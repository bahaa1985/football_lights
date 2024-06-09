import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import { getLeagues } from "../Api/getLeaguesTeams.js";
import { getTeam } from "../Api/getLeaguesTeams.js";
import Cookies from "universal-cookie";

export default function Preferences(params) {
  const [searchLeague, setSearchLeague] = useState("");
  const [searchTeam, setSearchTeam] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedLeagues,setSelectedLeagues] = useState([]);
  const [backgroundSelected,setBackgroundSelected]=useState('white');
  const searchLeagueInput = useRef("");
  const searchTeamInput = useRef("");
  let selectedTeams = [];


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

  function handleLeaguesCookie() {
    const cookie = new Cookies();
    cookie.set("selectedLeagues", selectedLeagues);
  }

  function handleTeamsCookie() {
    const cookie = new Cookies();
    cookie.set("preferedTeams", selectedTeams);
  }

  function handleSelectedLeague(elem,leagueId=0){
    if(elem !== null && selectedLeagues.indexOf(selectedLeagues.filter(elem=>elem.league.id===leagueId)[0]) === -1){
      setSelectedLeagues(selectedLeagues.push(elem));
    }
    else {
      setSelectedLeagues(selectedLeagues.splice(selectedLeagues.indexOf(selectedLeagues.filter(elem=>elem.league.id===leagueId)[0]),1));
    }
  }

  function isLeagueSelected(leagueId){
    if(selectedLeagues.indexOf(leagueId) > -1){
      return true;
    }
    else{
      return false;
    }
  }
  
// console.log("leagues",leagues);
// console.log("selected",selectedLeagues);

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
                handleSelectedLeague(elem);
                console.log("selected",selectedLeagues);
                backgroundSelected === 'white' ? setBackgroundSelected('lightgreen'): setBackgroundSelected('white')
              }}          
              style={{backgroundColor: (isLeagueSelected(elem.league.id) ? 'lightgreen':'white')}}>
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
          {selectedLeagues?.map((elem, index) => {
            return (
                  <div key={index} onClick={()=>[handleSelectedLeague(elem,elem.league.id),console.log("selected",selectedLeagues)]}>
                    <img src={elem.league.logo} alt={elem.league.name}/>
                    <div>{elem.league.name}</div>
                  </div>
                )
          })}
          <button onClick={() => handleLeaguesCookie()}>
            Selected Leagues
          </button>
        </div>
      </div>
      {/* search leagues */}
     
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
