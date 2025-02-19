import { useState , useEffect } from "react";
import Standings from "./Standing.js";
import LeagueFixtures from "./LeagueFixtures.js";
import { getLeagues } from "../../Api/getLeaguesTeams.js";
import TopPlayers from "./TopPlayers.js";
import { useParams } from "react-router-dom";
import { getCookie } from "../../Api/cookie.js";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

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
  const [isClicked,setIsClicked]=useState(false);

  useEffect(()=>{
    if(isClicked === true){
      async function fetchData(){ 
        const leagueData = await getLeagues(null, selectedleague);
        setLeagueInfo(leagueData.data.response[0]);
        setIsClicked(false);
        setLoaded(true);
      }
      fetchData();    
    }
  },[])

  function handleSelectedLeague(leagueId){
    setSelectedLeague(leagueId);
    setIsClicked(true);
  }

  function handleSelectedSeason(e){
    setSelectedSeason(e.target.value);
    setIsClicked(true);
  }
  return (
    <div>
      
      {/* Leagues dropdown */}
      <div className="relative top-20 left-[50%] -translate-x-[50%] w-[90%]">

      <div>
        <div>
          <span className="text-slate-900">Leagues</span>
            <div className="">
            {
              leagues.length>0?
              <TabGroup className="bg-slate-800" onChange={(index) => handleSelectedLeague(leagues[index].id)}>
                <TabList className={`flex flex-row justify-start gap-2`}>
                  {
                    leagues.map((league,index)=>{
                      return(
                        <Tab key={index} className="rounded-lg bg-transparent text-slate-50 data-[selected]:bg-slate-600 hover:bg-slate-600">
                          <img className="w-10 h-10 rounded" src={league.logo} alt={league.name} />
                          <span className="text-[1em] border-none">{league.name}</span>
                        </Tab>
                      )
                    })
                  }
                </TabList>
              </TabGroup>
              // <select onChange={(e)=>handleSelectedLeague(e)} value={selectedleague}>
              //   {
              //     leagues.map((league,index)=>{
              //       return(
              //         <option key={index} value={league.id}>{league.name}</option>
              //       )
              //     })
              //   }
              // </select>            
              :
              null
            }
        </div>
      </div>    
      {/* seasons dropdown  */}
      <div className="">
          <span className="bg-slate-800 text-slate-50">Seasons</span>
          <select onChange={(e)=>handleSelectedSeason(e)} defaultValue={lastSeason} value={selectedSeason}>
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
      <button className={`rounded-lg bg-slate-800 w-20 p-2 mx-auto ${isClicked ? 'cursor-pointer' : 'cursor-default'}`} onClick={()=>setIsClicked(true)} 
      disabled={isClicked ? true : false}>
        OK
      </button>
      {/*  */}
      </div>
      {/* league info */}
      {
        isLoaded ?
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
        :null
      }
      <TabGroup onChange={(index) => setTab(index)}>
        <TabList>
          <Tab className="bg-slate-500 text-slate-900 rounded-md mx-2 p-4 data-[selected]:bg-slate-900 data-[selected]:text-white">Fixtures</Tab>
          <Tab className="bg-slate-500 text-slate-900 rounded-md mx-2 p-4 data-[selected]:bg-slate-900 data-[selected]:text-white">Standing</Tab>
          <Tab className="bg-slate-500 text-slate-900 rounded-md mx-2 p-4 data-[selected]:bg-slate-900 data-[selected]:text-white">Scorers</Tab>
          <Tab className="bg-slate-500 text-slate-900 rounded-md mx-2 p-4 data-[selected]:bg-slate-900 data-[selected]:text-white">Assists</Tab>
        </TabList>
      </TabGroup>
      {tab === 0 ? (
        <LeagueFixtures league={selectedleague} season={selectedSeason} />
      ) : tab === 1 ? (
        <Standings league={selectedleague} season={selectedSeason} />
      ) : tab === 2 ? (
        <TopPlayers league={selectedleague} season={selectedSeason} type={"Goals"} />
      ) : tab === 3 ? (
        <TopPlayers league={selectedleague} season={selectedSeason} type={"Assists"} />
      ) : null}
      </div>
    </div>
  );
}
