import {React,memo} from "react";
import { useState,useMemo,useEffect} from "react";
import SoccerPlayground from "./SoccerPlayground.js";
import LinePosition from '../Game/LinePosition.js';
import Ratings from "./Ratings.js";
import getLineUps from "../../Api/getLineUp.js";
import getPlayers from "../../Api/getPlayers.js";
import "../../styles/lineup.css";

//main function
function LineUp(props) {
  const homeParam = props.teams.home.id;
  const awayParam = props.teams.away.id;
  const fixtureId = props.fixtureId;
  ///Home team details:
  const [homeId,setHomeId] = useState(homeParam);
  const [homeTeam, setHomeTeam] = useState("");
  const [homeLogo,setHomeLogo] = useState("");
  const [homeLineUp, setHomeLineUp] = useState([]);
  const [homeFormation, setHomeFormation] = useState([]);
  const [homePlayers, setHomePlayers] = useState([]);
  const [homeGkColor, setHomeGkColor] = useState([]); //kit colors
  const [homePlayerColor, setHomePlayrColor] = useState([]); //kit colors
  const [homeCoach, setHomeCoash] = useState({});
  const [homeSub, setHomeSub] = useState([]);
  /// Away team details:
  const [awayId,setAwayId] = useState(awayParam);
  const [awayTeam, setAwayTeam] = useState("");
  const [awayLogo,setAwayLogo] = useState("");
  const [awayLineUp, setAwayLineUp] = useState([]);
  const [awayFormation, setAwayFormation] = useState([]);
  const [awayPlayers, setAwayPlayers] = useState([]);
  const [awayGkColor, setAwayGkColor] = useState([]); //kit colors
  const [awayPlayerColor, setAwayPlayrColor] = useState([]); //kit colors
  const [awayCoach, setAwayCoash] = useState({});
  const [awaySub, setAwaySub] = useState([]);
  ///
  const [clickedSub, setClickedSub] = useState(homeId);
  const [isLoaded,setLoaded]=useState(false); //for preventing rendering before complete fetching data

  // let i=0;
  useMemo(() => {
    // call formation and line up players:
   
    async function fetchLineUp(){
      const lineup_response = await getLineUps(fixtureId);
      const players_response = await getPlayers(fixtureId);
      //
      setHomeLineUp(lineup_response.data.response[0].startXI);
      setHomeFormation(
        Array.from(lineup_response.data.response[0].formation.replaceAll("-", ""))
      );
      setHomeId(lineup_response.data.response[0].team.id); 
      setHomeTeam(lineup_response.data.response[0].team.name);
      setHomeLogo(lineup_response.data.response[0].team.logo);
      setHomeGkColor(lineup_response.data.response[0].team.colors.goalkeeper);
      setHomePlayrColor(lineup_response.data.response[0].team.colors.player);
      setHomeCoash(lineup_response.data.response[0].coach);
      setHomeSub(lineup_response.data.response[0].substitutes);
      //
      setAwayLineUp(lineup_response.data.response[1].startXI);
      setAwayFormation(
        Array.from(lineup_response.data.response[1].formation.replaceAll("-", ""))
      );
      setAwayId(lineup_response.data.response[1].team.id);
      setAwayTeam(lineup_response.data.response[1].team.name);
      setAwayLogo(lineup_response.data.response[1].team.logo);
      setAwayCoash(lineup_response.data.response[1].coach);
      setAwaySub(lineup_response.data.response[1].substitutes);
      setAwayGkColor(lineup_response.data.response[1].team.colors.goalkeeper);
      setAwayPlayrColor(lineup_response.data.response[1].team.colors.player);
      ///
      setHomePlayers(players_response.data.response[0].players);
      setAwayPlayers(players_response.data.response[1].players);
      //
      setLoaded(true);
    }
    fetchLineUp();
  }, [fixtureId]);

  function linesPositions(){
    // Home Lines:
      for(let i=0 ; i <homeFormation.length+1 ; i++){
        homeLines.push(
          <LinePosition lineup={homeLineUp} grid={(i+1).toString()} colors={homeGkColor} statistics={homePlayers} />)
      }
    // Away Lines:
    for(let i=awayFormation.length+1 ; i > -1 ; i--){
      awayLines.push(
        <LinePosition lineup={awayLineUp} grid={(i+1).toString()} colors={awayGkColor} statistics={awayPlayers} />)
    }
  }

  function teamRating(players){
    let totalAvg=0.1;
    players.map((player,index)=>{
      if(!isNaN(parseFloat(player.statistics[0].games.rating)))
      {
        totalAvg+=parseInt(player.statistics[0].games.rating);
      }
    })
    const playersCount=players.filter((player)=>player.statistics[0].games.minutes > 0).length;
    totalAvg /= playersCount;
    totalAvg = totalAvg.toFixed(1);
    return totalAvg;
  }
  
  let homeLines=[],awayLines = [];
  let playerNameArr = [], playerName = "";
  return (
    <div>
      <div className="block mx-auto md:flex md:justify-between">
      {
        isLoaded  ?
        <>
      {linesPositions()}

      {/* Playground */}
      <div className="relative xs:top-[90%] md:top-[45%] w-full md:w-1/2 m-auto p-3">
          <div className={`flex justify-start p-2 w-full rounded-md bg-slate-800`}>
            <img alt={homeTeam} src={homeLogo} className="w-8 h-8"/>
            <span className="w-1/2 text-center text-slate-50 border-none align-middle" >
              {homeTeam}
            </span>
            <span className="text-center text-slate-50 border-none align-middle">{teamRating(homePlayers)}</span>
          </div>
        <SoccerPlayground homeLines={homeLines} awayLines={awayLines} teams={[{'home':homeTeam,'homeLogo':homeLogo},{'away':awayTeam,'awayLogo':awayLogo}]} />   
          <div className={`flex justify-start p-2 w-full rounded-md bg-slate-800`}>
            <img alt={awayTeam} src={awayLogo} className="w-8 h-8"/>
            <span className="w-1/2 text-center text-slate-50 border-none align-middle" >
              {awayTeam}
            </span>
            <span className="text-center text-slate-50 border-none align-middle">{teamRating(awayPlayers)}</span>
          </div>
      </div>
     
        
      {/* Coaches and subs section */}
      <div className="relative xs:top-[90%] md:top-[45%] w-full md:w-1/2 m-auto p-3">
      {
        <>
          <div className="flex w-full justify-between">
            <div className={`flex justify-start py-2 w-1/2 ${clickedSub === homeId ? "bg-slate-800" : "bg-slate-600"} cursor-pointer`} onClick={()=>setClickedSub(homeId)}>
              <img alt={homeTeam} src={homeLogo} className="w-8 h-8"/>
              <span className="w-1/2 text-center text-slate-50 border-none align-middle" >
                {homeTeam}
              </span>
            </div>
            <div className={`flex justify-end py-2 w-1/2 ${clickedSub === awayId ? "bg-slate-800" : "bg-slate-600"} cursor-pointer`}  onClick={()=>setClickedSub(awayId)}>
              <span className="w-1/2 text-center text-slate-50 border-none align-middle">
                {awayTeam}
              </span>
              <img alt={awayTeam} src={awayLogo} className="w-8 h-8"/> 
            </div>
          </div>
          {clickedSub === homeId ? (
            <>
              {/* home coach and subs */}
              <div className="coach">
                <img alt="" src={homeCoach.photo} />
                <span>Coach: {homeCoach.name}</span>
              </div>
              <div>Formation: {homeFormation.join("-")}</div>
              <div className="substitues">
                {homeSub.map((sub,index) => {
                  // eslint-disable-next-line no-lone-blocks
                  {
                    playerNameArr = sub.player.name.split(" ");
                    playerNameArr.length > 1
                      ? (playerName = playerNameArr.slice(1))
                      : (playerName = playerNameArr[0]);
                  }
                  return (
                    <div key={index}>
                      <span className="player-number">
                        {sub.player.number}
                      </span>
                      <span className="player-name">
                        {playerNameArr.length > 1
                          ? playerNameArr.slice(1)
                          : playerNameArr[0]}
                      </span>
                      <span>{sub.player.pos}</span>
                      <span>{}</span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {/* away coach and subs */}
              <div className="coach">
                <img alt="" src={awayCoach.photo} />
                <span>Coach: {awayCoach.name}</span>
              </div>
                <div>Formation: {awayFormation.join("-")}</div>
                <div className="substitues">
                {awaySub.map((sub,index) => {
                  playerNameArr = sub.player.name.split(" ");
                  playerNameArr.length > 1
                    ? (playerName = playerNameArr.slice(1))
                    : (playerName = playerNameArr[0]);

                  return (
                    <div key={index}>
                      <span className="player-number">
                        {sub.player.number}
                      </span>
                      <span className="player-name">
                        {
                          // playerNameArr.length> 1 ?
                          // playerNameArr.slice(1) :
                          // playerNameArr[0]
                          playerName
                          // sub.player.id
                        }
                      </span>
                      <span>{sub.player.pos}</span>
                      <span>
                        {
                          //event:
                        }
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      }
    </div>

    {/* Ratings */}
    <Ratings teams={[homeTeam,awayTeam]} statistics={[homePlayers,awayPlayers]} />
      </>
        :
        null
      }
    </div>
  </div>
    
  );
}

export default  memo(LineUp);
