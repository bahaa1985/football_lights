import React from "react";
import { useState, useEffect } from "react";
import LinePosition from '../Game/LinePosition.js';
import getLineUps from "../../Api/getLineUp.js";
import getPlayers from "../../Api/getPlayers.js";
import "../../styles/lineup.css";

//main function
function LineUp(props) {
  // const homeId = props.teams[0];
  // const awayId = props.teams[1];
  const fixtureId = props.fixtureId;
  ///Home team details:
  const [homeId,setHomeId] = useState(0);
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
  const [awayId,setAwayId] = useState(0);
  const [awayTeam, setAwayTeam] = useState("");
  const [awayLogo,setAwayLogo] = useState("");
  const [awayLineUp, setAwayLineUp] = useState([]);
  const [awayFormation, setAwayFormation] = useState([]);
  const [awayPlayers, setAwayPlayers] = useState([]);
  const [awayGkColor, setAwayGkColor] = useState([]); //kit colors
  const [awayPlayerColor, setAwayPlayrColor] = useState([]); //kit colors
  const [awayCoach, setAwayCoash] = useState({});
  const [awaySub, setAwaySub] = useState([]);

  const [clickedSub, setClickedSub] = useState(homeId);
  const [isLoaded,setLoaded]=useState(false); //for preventing rendering before complete fetching data

  useEffect(() => {
    // call formation and line up players:
    getLineUps(fixtureId).then((result) => {
      // console.log("line up:",result);
      setHomeLineUp(result.data.response[0].startXI);
      setHomeFormation(
        Array.from(result.data.response[0].formation.replaceAll("-", ""))
      );
      setHomeId(result.data.response[0].team.id); setHomeSub(result.data.response[0].team.id);
      setHomeTeam(result.data.response[0].team.name);
      setHomeLogo(result.data.response[0].team.logo);
      setHomeGkColor(result.data.response[0].team.colors.goalkeeper);
      setHomePlayrColor(result.data.response[0].team.colors.player);
      setHomeCoash(result.data.response[0].coach);
      setHomeSub(result.data.response[0].substitutes);
      //
      setAwayLineUp(result.data.response[1].startXI);
      setAwayFormation(
        Array.from(result.data.response[1].formation.replaceAll("-", ""))
      );
      setAwayId(result.data.response[1].team.id);
      setAwayTeam(result.data.response[1].team.name);
      setAwayLogo(result.data.response[1].team.logo);
      setAwayCoash(result.data.response[1].coach);
      setAwaySub(result.data.response[1].substitutes);
      setAwayGkColor(result.data.response[1].team.colors.goalkeeper);
      setAwayPlayrColor(result.data.response[1].team.colors.player);
    });

    getPlayers(fixtureId).then((result) => {
      setHomePlayers(result.data.response[0].players);
      setAwayPlayers(result.data.response[1].players);
      // console.log("player statistics:",result.data.response);
      
    })
    .then(()=>{
      setLoaded(true); //for preventing rendering before complete fetching data
    });
  }, [fixtureId]);

  let playerNameArr = [],
    playerName = "";
  return (
    <div>
      {
        isLoaded ?
        <>
        <div className="pitch w-[90%] sm:w-[70%] min-h-[750px]  m-auto p-3 flex flex-col justify-evenly ">
        {/* home scoresheet */}
        <div className="w-[90%] h-[45%] m-auto flex flex-col items-center text-center">
          <div className="w-full max-h-[25%] m-auto text-center" key={1}>
            <LinePosition lineup={homeLineUp} grid={"1"} colors={homeGkColor} statistics={homePlayers} />
          </div>
          <div className="w-full max-h-[25%] m-auto text-center" key={2}>
            <LinePosition lineup={homeLineUp} grid={"2"} colors={homePlayerColor} statistics={homePlayers}/>
          </div>

          <div className="w-full max-h-[25%] m-auto text-center" key={3}>
            <LinePosition lineup={homeLineUp} grid={"3"} colors={homePlayerColor} statistics={homePlayers}/>
          </div>

          <div className="w-full max-h-[25%] m-auto text-center" key={4}>
            <LinePosition lineup={homeLineUp} grid={"4"} colors={homePlayerColor} statistics={homePlayers} />
          </div>
          {homeFormation.length > 3 ? (
            <div className="w-full max-h-[25%] m-auto text-center" key={5}>
              <LinePosition lineup={homeLineUp} grid={"5"} colors={homePlayerColor} statistics={homePlayers} />
            </div>
          ) : null}
        </div>

        {/* away scoresheet */}
        <div className="w-[90%] h-[45%] m-auto flex flex-col items-center text-center">
          {awayFormation.length > 3 ? (
            <div className="w-full max-h-[25%] m-auto text-center" key={5}>
              <LinePosition lineup={awayLineUp} grid={"5"} colors={awayPlayerColor} statistics={awayPlayers}/>
            </div>
          ) : null}
          <div className="w-full max-h-[25%] m-auto text-center" key={4}>
            <LinePosition lineup={awayLineUp} grid={"4"} colors={awayPlayerColor} statistics={awayPlayers} />
          </div>
          <div className="w-full max-h-[25%] m-auto text-center" key={3}>
            <LinePosition lineup={awayLineUp} grid={"3"} colors={awayPlayerColor} statistics={awayPlayers}
            />
          </div>
          <div className="w-full max-h-[25%] m-auto text-center" key={2}>
            <LinePosition lineup={awayLineUp} grid={"2"} colors={awayPlayerColor} statistics={awayPlayers}
            />
          </div>
          <div className="w-full  max-h-[25%] m-auto text-center" key={1}>
            <LinePosition lineup={awayLineUp} grid={"1"} colors={awayGkColor} statistics={awayPlayers} />
          </div>
        </div>
      </div>
        {/* Coaches and subs section */}
      <div className="w-[90%] sm:w-[70%] m-auto p-3">
      {
        <>
          <div className="flex w-full justify-between">
            <div className="flex justify-around w-1/2 bg-slate-800 cursor-pointer" onClick={()=>[setClickedSub(homeId),console.log("clickedSub",clickedSub)]}>
              <img alt={homeTeam} src={homeLogo} className="w-8 h-8"/>
              <span className="w-1/2 text-slate-50 border-none" >
                {homeTeam}
              </span>
            </div>
            <div className="flex justify-around w-1/2 bg-slate-800 cursor-pointer"  onClick={()=>[setClickedSub(awayId),console.log("clickedSub",clickedSub)]}>
              <img alt={awayTeam} src={awayLogo} className="w-8 h-8"/>
              <span className="w-1/2 text-slate-50 border-none">
                {awayTeam}
              </span>
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
                {homeSub.map((sub) => {
                  // eslint-disable-next-line no-lone-blocks
                  {
                    playerNameArr = sub.player.name.split(" ");
                    playerNameArr.length > 1
                      ? (playerName = playerNameArr.slice(1))
                      : (playerName = playerNameArr[0]);
                  }
                  return (
                    <div>
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
                {awaySub.map((sub) => {
                  playerNameArr = sub.player.name.split(" ");
                  playerNameArr.length > 1
                    ? (playerName = playerNameArr.slice(1))
                    : (playerName = playerNameArr[0]);

                  return (
                    <div>
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
      </>
        :
        null
      }
    </div>
  );
}

export default LineUp;
