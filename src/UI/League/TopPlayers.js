import React, { useState, useEffect } from "react";
import { getTopScorers, getTopAssists } from "../../Api/PlayerProfile.js";
import { getTranslation } from "../../Translation/labels.js";
import { getTeamByName } from "../../Translation/teams.js";
import { useSelector,useDispatch } from "react-redux";
import { requestsIncrement, resetRequests } from "../../ReduxStore/counterSlice.js";
import { Spinner } from "react-bootstrap";

export default function TopPlayers(props) {
  const leagueId = props.league;
  const season = props.season;
  const stats_type = props.type;
  const [topPlayers, setTopPlayers] = useState([]);
  const [isLoaded,setLoaded] = useState(false);

  const lang=JSON.parse(localStorage.getItem("user_preferences"))?.lang || 'en';

  const dispatch = useDispatch();
  const requests_count = useSelector(state => state.counter.requestsCount);

  useEffect(() => {
    const fetchTopPlayers = async ()=>{
      if (stats_type === "Goals") {
        const scorers_response = await getTopScorers(leagueId, season);
        setTopPlayers(scorers_response.data.response);  
        setLoaded(true);      
      } 
      else {
        const assists_response = await getTopAssists(leagueId, season);
        setTopPlayers(assists_response.data.response);
        setLoaded(true);
      }

      //redux reducer increase requests count by one:
      dispatch(requestsIncrement());
    }
    
    if(requests_count < 10){
      dispatch(requestsIncrement());
    }
    else{
        alert("API request limit reached. Please wait a minute before making more requests.");
    }

    //reset api requests to zero
    dispatch(resetRequests());

  }, [leagueId,season,stats_type]);

  return (
    <div className='w-full md:w-[80%] lg:w-[70%] mx-auto bg-slate-50'>
        <table className='w-full table-auto'>
        <thead className="sticky top-16 bg-slate-800 text-left text-slate-50">
            <tr className="h-10 divide-x-2 text-center">
                <th>{getTranslation('Rank',lang)}</th>
                <th>{getTranslation('Player',lang)}</th>
                <th>{getTranslation('Team',lang)}</th>
                <th>{getTranslation(stats_type,lang)}</th>                    
            </tr>
        </thead>
        <tbody>
        {
          isLoaded && topPlayers.length > 0 ?
          topPlayers?.map((elem, index) => {
          return (
            <tr key={index} className="bg-slate-50 text-center border-b-slate-400 border-solid border">

              <td>{index+1}</td>
              <td>
                <div className="flex justify-center">
                {/* <img className="size-10 sm:size-10 md:size-12 rounded-full" src={elem.player.photo} alt={elem.player.name} /> */}
                <span className="border-none text-sm sm:text-xl">{elem.player.name}</span>
                </div>
                   
              </td>

              <td>
                <div className="w-[90%] mx-auto flex justify-start items-center gap-2 p-2 text-sm sm:text-xl">
                <img className="size-8 sm:size-10 md:size-12 rounded-full" src={elem.statistics[0].team.logo} alt={elem.statistics[0].team.name}/>
                <span className="border-none">{lang === 'ar' ? getTeamByName(elem.statistics[0].team.name):elem.statistics[0].team.name}</span>
                </div>
                
              </td>

              <td>
                <div>
                {
                  stats_type === 'Goals' ?
                  <span className="my-auto border-none text-sm sm:text-xl">{elem.statistics[0].goals.total}</span>
                  :
                  <span className="my-auto border-none text-sm sm:text-xl">{elem.statistics[0].goals.assists}</span>
                  
                }
                </div>
                
              </td>

            </tr>
            )
          })
          :
          <Spinner/>
        }
        </tbody>
        </table>
    </div>
  );
}
