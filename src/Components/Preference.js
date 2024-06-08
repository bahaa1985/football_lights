import React, { useState, useEffect, useRef } from "react";
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
        // setLeagues(result.data.response);
        // for(let i=0;i<result.data.response.length;i++){
        //   // leagues[i].selected=true;
        //   if(selectedLeagues.indexOf(result.data.response[i].league.id)===-1) {
        //     result.data.response[i].selected=false;
        //   }
        //   else{
        //     result.data.response[i].selected=true;
        //   }
        // };
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

  function addSelectedLeagueToArray(elem){
    if(selectedLeagues.indexOf(elem.league.id) === -1){
      selectedLeagues.push(parseInt(elem.league.id))
      return true;
    }
    else {
      selectedLeagues.splice(selectedLeagues.indexOf(parseInt(elem.league.id)),1)
      return false;
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
  
  function toggleBackgroundColor(){
    if(backgroundSelected === 'white');
  }
  console.log("leagues",leagues);
console.log("selected",selectedLeagues);

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
            <div key={index} onClick={()=>{
              addSelectedLeagueToArray(elem);
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
                           
              {/* <input
                type="checkbox" value={elem.league.id} checked={elem.selected}
                onChange={(e)=>[
                  e.target.checked
                    ? addSelectedLeagueToArray(elem) : removeFromSelectedLeagueArray(elem)
                  ,console.log(selectedLeagues)]
                }
              /> */}
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
