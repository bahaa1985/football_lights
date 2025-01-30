import { useState } from "react";
import Standings from "./Standing.js";
import LeagueFixtures from "./LeagueFixtures.js";
import TopPlayers from "./TopPlayers.js";
import { useParams } from "react-router-dom";
import { getCookie } from "../../Api/cookie.js";
import { NavLink } from "react-router-dom";

export default function League() {
  const leagueId = parseInt(useParams().leagueId);
  const season = parseInt(useParams().season);

  const leagues=getCookie("prefered_leagues");

  const [tab, setTab] = useState("Fixtures");
  const [selectedleague,setSelectedLeague] = useState(getCookie("prefered_leagues"));
  const [selectedSeason,setSelectedSeason] = useState();

  return (
    <div>
      <div className="w-full">
          <div className="bg-slate-800 text-slate-50">Your leagues</div>
          <div className="">
          {
            leagues.length>0?
            <select>
              {
                leagues.map((league,index)=>{
                  return(
                  // <div className=" even:bg-slate-50 odd:bg-slate-300" key={index}> 
                      {/* <NavLink to={`/leagues/${league.id}/${league.season}`} className="flex justify-between"> */}
                      {/* <img src={league.logo} alt={league.name} className="w-10 h-10 rounded-full"/> */}
                      {/* <span className="w-[50%] border-none my-auto">{league.name}</span> */}
                      {/* </NavLink> */}
                  // </div>
                  )
                })
              }
            </select>            
            :
            null
          }
      </div>
          
      </div>
      {/*  */}
      <div className="relative top-20 left-[50%] -translate-x-[50%] w-[90%]">
        <div className="flex justify-start space-x-8 w-96 my-2">
          <button
            className="p-2 w-20 h-10 bg-blue-600 text-slate-50 rounded-md hover:bg-blue-500"
            onClick={() => setTab("Fixtures")}
          >
            Fixtures
          </button>
          <button
            className="p-2 w-20 h-10 bg-blue-600 text-slate-50 rounded-md hover:bg-blue-500"
            onClick={() => setTab("Standing")}
          >
            Standing
          </button>
          <button
            className="p-2 w-20 h-10 bg-blue-600 text-slate-50 rounded-md hover:bg-blue-500"
            onClick={() => setTab("Scorers")}
          >
            Scorers
          </button>
          <button
            className="p-2 w-20 h-10 bg-blue-600 text-slate-50 rounded-md hover:bg-blue-500"
            onClick={() => setTab("Assists")}
          >
            Assisters
          </button>
        </div>
        {tab === "Fixtures" ? (
          <LeagueFixtures league={leagueId} season={season} />
        ) : tab === "Standing" ? (
          <Standings league={leagueId} season={season} />
        ) : tab === "Scorers" ? (
          <TopPlayers league={leagueId} season={season} type={"Goals"} />
        ) : tab === "Assists" ? (
          <TopPlayers league={leagueId} season={season} type={"Assists"} />
        ) : null}
      </div>
    </div>
  );
}
