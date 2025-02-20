import { useState , useEffect } from "react";
import Standings from "./Standing.js";
import LeagueFixtures from "./LeagueFixtures.js";
import { getLeagues } from "../../Api/getLeaguesTeams.js";
import TopPlayers from "./TopPlayers.js";
import { useParams } from "react-router-dom";
import { getCookie } from "../../Api/cookie.js";

export default function League() {
  const leagueParam = parseInt(useParams().leagueId);
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

  const [tab, setTab] = useState(0);
  const [selectedleague,setSelectedLeague] = useState(leagueParam ? leagueParam : leagues[0].id);
  const [selectedSeason,setSelectedSeason] = useState(season ? season : lastSeason);
  const [leagueInfo,setLeagueInfo]=useState();
  const [isLoaded,setLoaded]=useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isClicked,setClicked]=useState(false);

  useEffect(()=>{
    if(isClicked){
      async function fetchData(){ 
        const leagueData = await getLeagues(null, selectedleague);
        setLeagueInfo(leagueData.data.response[0]);
        setClicked(false);
        setLoaded(true);
      }
      fetchData();    
    }
  },[isClicked,selectedleague])

  function handleSelectedLeague(leagueId){
    setSelectedLeague(leagueId);
    setDisabled(false);
  }

  function handleSelectedSeason(e){
    setSelectedSeason(e.target.value);
    setDisabled(false);
  }
  return (
    <div>
      
      {/* Leagues dropdown */}
      <div className="relative top-20 left-[50%] -translate-x-[50%] w-[90%]">

      <div className="my-4">
        <div className="w-full flex justify-start space-x-2 my-4">
          <span className="w-30 border-none text-slate-900">Select League</span>
            <div className="w-auto flex flex-wrap justify-start">
            {
              leagues.length > 0 ?
              leagues.map((league,index)=>{
                return(
                  <button key={index} className={`w-40 h-12 flex justify-start space-x-2 border-2 border-solid border-slate-800 text-slate-50 rounded-sm cursor-pointer
                    ${selectedleague === league.id ? 'bg-slate-600 cursor-default' : 'bg-slate-800 cursor-pointer' }`} 
                    disabled={selectedleague === league.id ? true : false} 
                    onClick={()=>handleSelectedLeague(league.id)}>
                    <img className="w-10 h-10 rounded-3xl bg-slate-50 my-auto" src={league.logo} alt={league.name} />
                    <span className="text-[0.8em] text-wrap border-none my-auto">{league.name}</span>
                  </button>
                )
              })          
              :
              null
            }
        </div>
      </div>    
      {/* seasons dropdown  */}
      <div className="flex justify-start space-x-2  my-4">
          <span className="w-30 border-none bg-slate-50 text-slate-90">Select Season</span>
          <select className="border-black border-2 border-solid" onChange={(e)=>handleSelectedSeason(e)} value={selectedSeason}>
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
      <div className="w-full flex justify-center  my-4">
        <button className={`rounded-lg w-40 p-2 ${!isDisabled ? 'cursor-pointer bg-slate-400 text-slate-900' : 'cursor-default bg-slate-800 text-slate-50'}`} 
        onClick={()=>[setClicked(true),setDisabled(true)]} 
        disabled={isDisabled ? true : false}>
          Display
        </button>
      </div>
      
      {/*  */}
      </div>
      {/* league info */}
      {
        isLoaded && isDisabled ?
        <div>
          <div className="flex justify-center bg-gradient-to-r from-slate-200 via-slate-400 to-slate-300 rounded-md p-4 my-4">
          <div className="w-[15%] mx-2">
            <img className="w-24 h-full rounded" src={leagueInfo.league.logo} alt={leagueInfo.league.name} />
          </div>
          <div className="w-[85%] mx-2"> 
              <span className="text-[40px] border-none">{leagueInfo.league.name} {lastSeason}/{lastSeason+1}</span>
              <div className="flex justify-start align-middle">
                  <img className="w-16 h-16 rounded" src={leagueInfo.country.flag} alt={leagueInfo.country.name} />
                  <span className="text-[20px] border-none">{leagueInfo.country.name}</span>
              </div> 
          </div>            
        </div>
          {/*  */}
          <div className="w-full sm:w-[50%] flex justify-between flex-wrap my-4 rounded-md">
            <button className={`w-[22%] h-12 bg-slate-800 text-slate-50 rounded-md ${tab === 0 ? 'bg-slate-600' : 'bg-slate-800'}`} onClick={()=>setTab(0)}>Fixtures</button>
            <button className={`w-[22%] h-12 bg-slate-800 text-slate-50 rounded-md ${tab === 1 ? 'bg-slate-600' : 'bg-slate-800'}`} onClick={()=>setTab(1)}>Standing</button>
            <button className={`w-[22%] h-12 bg-slate-800 text-slate-50 rounded-md ${tab === 2 ? 'bg-slate-600' : 'bg-slate-800'}`} onClick={()=>setTab(2)}>Scorers</button>
            <button className={`w-[22%] h-12 bg-slate-800 text-slate-50 rounded-md ${tab === 3 ? 'bg-slate-600' : 'bg-slate-800'}`} onClick={()=>setTab(3)}>Assisters</button>
          </div>
        </div>        
        :null
      }
      
      { 
        selectedleague && selectedSeason && isDisabled ?
          tab === 0 ? 
            <LeagueFixtures league={selectedleague} season={selectedSeason} />
           : tab === 1 ? 
            <Standings league={selectedleague} season={selectedSeason} />
           : tab === 2 ? 
            <TopPlayers league={selectedleague} season={selectedSeason} type={"Goals"} />
           : tab === 3 ? 
            <TopPlayers league={selectedleague} season={selectedSeason} type={"Assists"} />
           : null
        :null
      }
      </div>
    </div>
  );
}
