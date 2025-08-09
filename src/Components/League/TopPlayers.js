import React, { useState, useEffect } from "react";
import { getTopScorers, getTopAssists } from "../../Api/PlayerProfile.js";
import { getTranslation } from "../Translation/labels.js";

export default function TopPlayers(props) {
  const leagueId = props.league;
  const season = props.season;
  const stats_type = props.type;
  const [topPlayers, setTopPlayers] = useState([]);
  const lang=JSON.parse(localStorage.getItem("user_preferences"))?.lang || 'en';

  useEffect(() => {
    if (stats_type === "Goals") {
      getTopScorers(leagueId, season).then((result) => {
        setTopPlayers(result.data.response);
      });
    } 
    else {
      getTopAssists(leagueId, season).then((result) => {
        setTopPlayers(result.data.response);
      });
    }
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
          topPlayers?.map((elem, index) => {
          return (
            <tr key={index} className="bg-slate-50 text-center border-b-slate-400 border-solid border">

              <td>{index+1}</td>
              <td>
                <div className="flex justify-center">
                {/* <img className="size-10 sm:size-10 md:size-12 rounded-full" src={elem.player.photo} alt={elem.player.name} /> */}
                <span className="border-none">{elem.player.name}</span>
                </div>
                   
              </td>

              <td>
                <div className="w-[90%] mx-auto flex justify-start items-center space-x-2 p-2">
                <img className="size-8 sm:size-10 md:size-12 rounded-full" src={elem.statistics[0].team.logo} alt={elem.statistics[0].team.name}/>
                <span className="border-none">{elem.statistics[0].team.name}</span>
                </div>
                
              </td>

              <td>
                <div>
                {
                  stats_type === 'Goals' ?
                  <span className="my-auto border-none">{elem.statistics[0].goals.total}</span>
                  :
                  <span className="my-auto border-none">{elem.statistics[0].goals.assists}</span>
                  
                }
                </div>
                
              </td>

            </tr>
            )
          })
        }
        </tbody>
        </table>
    </div>
  );
}
