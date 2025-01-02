import React, { useState, useEffect } from "react";
import { getTopScorers, getTopAssists } from "../../Api/getPlayerProfile.js";

export default function TopPlayers(props) {
  const leagueId = props.league;
  const season = props.season;
  const stats_type = props.type;
  const [topPlayers, setTopPlayers] = useState([]);

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
    <div className='w-[90%] md:w-[70%] mx-auto'>
        <table className='w-full table-auto'>
        <thead className="bg-blue-300 text-left">
            <tr className="h-10 text-xl">
                <td>player</td>
                <td>Team</td>
                <td>{stats_type}</td>                    
            </tr>
        </thead>
        <tbody>
        {
          topPlayers?.map((elem, index) => {
          return (
            <tr key={index} className="even:bg-blue-300 :bg-slate-100 h-8">

              <td>
                <div className="flex justify-start">
                <img className="w-12 h-12 rounded-full" src={elem.player.photo} alt={elem.player.name} />
                <span className="my-auto border-none">{elem.player.name}</span>
                </div>
                   
              </td>

              <td>
                <div className="flex justify-start">
                <img className="w-12 h-12 rounded-full" src={elem.statistics[0].team.logo} alt={elem.statistics[0].team.name}/>
                <span className="my-auto border-none">{elem.statistics[0].team.name}</span>
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
