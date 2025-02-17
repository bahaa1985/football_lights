import { useState, useMemo, useEffect } from "react";
import Standings from "./Standing.js";
import LeagueFixtures from "./LeagueFixtures.js";
import { getLeagues } from "../../Api/getLeaguesTeams.js";

import TopPlayers from "./TopPlayers.js";
import { useParams } from "react-router-dom";
import { getCookie } from "../../Api/cookie.js";

export default function League() {
  const league = parseInt(useParams().leagueId);
  const season = parseInt(useParams().season);

  const leagues=getCookie("prefered_leagues");
  const lastSeason =new Date().getFullYear()-1;

  const seasons = ()=>{
    let seasonsArr=[];
    for(let i=2010;i<lastSeason + 1 ; i++){
      seasonsArr.push(i);
    }
    return seasonsArr;
  }

  const [tab, setTab] = useState("Fixtures");
  const [selectedleague,setSelectedLeague] = useState(league ? league : leagues[0].id);
  const [selectedSeason,setSelectedSeason] = useState(season ? season : lastSeason);
  const [leagueInfo,setLeagueInfo]=useState();
  const [isLoaded,setLoaded]=useState(false);

  useEffect(()=>{
    async function fetchData(){
      const leagueData = await getLeagues(null, selectedleague);
      setLeagueInfo(leagueData.data.response[0]);
      setLoaded(true);
      console.log(leagueData);
    }
    fetchData();
  },[selectedleague,selectedSeason])

  function handleSelectedLeague(e){
    setSelectedLeague(parseInt(e.target.value));
    setTab(null);
  }

  return (
    <div>
      
      {/* Leagues dropdown */}
      <div className="relative top-20 left-[50%] -translate-x-[50%] w-[90%]">

      <div className="flex justify-start">
          <span className="bg-slate-800 text-slate-50">Leagues</span>
          <div className="">
          {
            leagues.length>0?
            <select onChange={(e)=>handleSelectedLeague(e)} value={selectedleague}>
              {
                leagues.map((league,index)=>{
                  return(
                    <option key={index} value={league.id}>{league.name}</option>
                  )
                })
              }
            </select>            
            :
            null
          }
      </div>
      {/* seasons dropdown  */}
      <div className="">
          <span className="bg-slate-800 text-slate-50">Seasons</span>
          <select onChange={(e)=>parseInt(setSelectedSeason(e.target.value))} defaultValue={lastSeason} value={selectedSeason}>
            {
              seasons().map((season,index)=>{
                return(
                  <option key={index} value={season}>{season}</option>
                )                
              })
            }
          </select>
      </div>
      {/*  */}
      </div>
      {/* league info */}
      {
        isLoaded ?
        <div className="flex justify-center bg-gradient-to-r from-slate-200 via-slate-400 to-slate-300 rounded-md p-4 my-4">
          <div className="w-[30%] mx-2">
            <img className="w-24 h-full rounded" src={leagueInfo.league.logo} alt={leagueInfo.league.name} />
          </div>
          <div className="w-[70%] mx-2"> 
              <span className="text-[50px] border-none">{leagueInfo.league.name} {lastSeason}/{lastSeason+1}</span>
              <div className="flex justify-start align-middle">
                  <img className="w-16 h-16 rounded" src={leagueInfo.country.flag} alt={leagueInfo.country.name} />
                  <span className="text-[20px] border-none">{leagueInfo.country.name}</span>
              </div> 
          </div>        
        </div>
        :null
      }
      
      {/*  */}
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
        <LeagueFixtures league={selectedleague} season={selectedSeason} />
      ) : tab === "Standing" ? (
        <Standings league={selectedleague} season={selectedSeason} />
      ) : tab === "Scorers" ? (
        <TopPlayers league={selectedleague} season={selectedSeason} type={"Goals"} />
      ) : tab === "Assists" ? (
        <TopPlayers league={selectedleague} season={selectedSeason} type={"Assists"} />
      ) : null}
      </div>
    </div>
  );
}
