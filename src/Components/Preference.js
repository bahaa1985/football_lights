import React, { useState, useEffect, useRef } from "react";
import { getLeagues } from "../Api/getLeaguesTeams.js";
import { getTeam } from "../Api/getLeaguesTeams.js";
import { setCookies,getCookies } from "../Api/cookie.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";
import { color } from "@mui/system";

export default function Preferences(params) {
  const [searchLeague, setSearchLeague] = useState("");
  const [searchTeam, setSearchTeam] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [preferedLeagues,setPreferedLeagues] = useState([]);
  const [leaguesIds,setLeaguesIds]=useState([]);
  const [preferedTeams,setPreferedTeams]=useState([]);
  const [teamsIds,setTeamsIds]=useState([]);
  const [activeIndex, setIsActiveIndex] = useState(0);
  const [backgroundSelected,setBackgroundSelected]=useState('white');
  const searchLeagueInput = useRef("");
  const preference_star=useRef();
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
  
    
  let preferedLeaguesArr=getCookies("prefered_leagues"); 
  console.log("prefered leagues: ",preferedLeaguesArr); 
  function handlePreferedLeagues(leagueId,season){        
    if(preferedLeaguesArr.filter(obj=>obj.id===leagueId)[0] === undefined){
      preferedLeaguesArr.push({'id':leagueId,'season':season});
      // console.log("selected leagues: ",preferedLeaguesArr);
    }
    else{
      const index=preferedLeaguesArr.indexOf(preferedLeaguesArr.filter(obj=>obj.id===leagueId)[0])
      preferedLeaguesArr=preferedLeaguesArr.slice(0,index).concat(preferedLeaguesArr.slice(index+1));
      console.log("selected leagues: ",preferedLeaguesArr);    
    }
    setCookies(preferedLeaguesArr,"prefered_leagues");
  }
  
  // let preferedTeamsArr=[];
  // function handlePreferedTeams(teamId){
  //   console.log("prefered leagues: ",getCookies("prefered_leagues"));
  //   preferedTeamsArr=getCookies("prefered_teams");
  //   if(preferedTeamsArr.filter(obj=>obj.id===teamId)[0] === undefined){
  //     preferedTeamsArr.push({'id':teamId});
  //     console.log(preferedTeamsArr);
  //   }
  //   else{
  //     const index=preferedLeaguesArr.indexOf(preferedLeaguesArr.filter(obj=>obj.id===teamId)[0])
  //     preferedLeaguesArr=preferedLeaguesArr.slice(0,index).concat(preferedLeaguesArr.slice(index+1));
  //     console.log(preferedLeaguesArr);      
  //   }
    
  // }


  function handleTeamsCookie() {
    const cookie = new Cookies();
    cookie.set("preferedTeams", preferedTeams);
    console.log("prefered teams cookie is created");
  }

  function setPreferedLeaguesColor(leagueId){
    let strokeClass="text-blue-100";
    // for(let i=0;i<preferedLeaguesArr.length;i++){
    //   if(preferedLeaguesArr[i].id===leagueId){
    //     strokeClass= "text-blue-600";
    //   }
    //   else{
    //     strokeClass= "text-blue-100";
    //   }
    // }
    // return strokeClass;
     preferedLeaguesArr.map((elem)=>{
      if(elem.id===leagueId){
        console.log("mark:",elem.id)
        strokeClass= "text-blue-600";
      }
      // else{
      //   strokeClass="text-blue-100";
      // } 
     })
     return strokeClass;
  }

  // console.log("prefered leagues",preferedLeagues);
  return (
    <div className="relative top-20 left-0 px-auto flex justify-around">
      <div className="flex flex-wrap text-center w-[45%]">
        <div className="text-left w-full">
          <input type="text" ref={searchLeagueInput} className="outline" />
          <button className="w-26 text-lg mx-2 p-2  rounded-md bg-slate-900 text-[#fff]"
            onClick={() => [setSearchLeague(searchLeagueInput.current.value),
            // console.log(searchLeagueInput.current.value)
            ]}>
            Search League
          </button>
          {leagues?.map((elem, index) => {
            return (            
              <div key={index}
                className="w-full flex justify-start my-2" 
              //   onClick={()=>{
              //   const latestSeasonIndex = elem.seasons.length-1;
              //   handlePreferedLeagues(elem.league.id,elem.seasons[latestSeasonIndex].year);
              //   backgroundSelected === 'white' ? setBackgroundSelected('lightgreen'): setBackgroundSelected('white')
              // }}          
              // style={{backgroundColor: (isLeagueSelected(elem.league.id) ? 'lightgreen':'white')}}
              >
                <img
                  src={elem.league?.logo}
                  className="w-10 h-10"
                  alt={elem.league.name}
                /> 
                <span className="w-[70%] border-b border-b-black">{elem.league.name} {elem.league.id}</span>         
                <FontAwesomeIcon icon={faStar}
                                 className={`stroke-[4px]  w-10 h-10 cursor-pointer
                                              ${setPreferedLeaguesColor(elem.league.id)}`}                             
                                 onClick={(event)=>
                                 {
                                  const latestSeasonIndex = elem.seasons.length-1;
                                  const senderElement = event.currentTarget;
                                  
                                  senderElement.classList.toggle("text-blue-600");
                                  senderElement.classList.toggle("text-blue-100");
                                  handlePreferedLeagues(elem.league.id,elem.seasons[latestSeasonIndex].year)                                  
                                }}/>
              </div>
            );
          })}
        </div>
        {/*  */}
        {/* <div>
          <button className="w-auto text-lg mx-2 p-2  rounded-md bg-slate-900 text-[#fff]" 
          onClick={() => [setCookies(preferedLeagues,"prefered_leagues"),setLeagues([])]}>
            Save
          </button>
        </div> */}
      </div>
      {/* search leagues */}
     
      {/* search teams */}
      <div className="flex flex-wrap text-center w-[45%]">
              <div className="text-left">
            <input type="text" ref={searchTeamInput} className="outline" />
            <button className="w-26 text-lg mx-2 p-2  rounded-md bg-slate-900 text-[#fff]" onClick={() => setSearchTeam(searchTeamInput.current.value)}>
              Search Team
            </button>
            {/* {teams?.map((elem, index) => {
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
            })} */}
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
