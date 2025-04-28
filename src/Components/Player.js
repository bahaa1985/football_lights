import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayerSeasons, getPlayerStats, getPlayerProfile } from '../Api/getPlayerProfile.js';

function Player(props) {
    const season=props.season;
    const [playerSeasons,setPlayerSeasons]=useState([]);
    const [playerStats,setPlayerStats]=useState([]); 
    const [leagueId,setLeagueId]=useState(0);
    const [selectedSeason,setSelectedSeason]=useState(season);
    const params =useParams();
    
    useEffect(()=>{

        getPlayerSeasons(params.playerId)
        .then((result)=>{
            setPlayerSeasons(result.data.response);
          
        })

        getPlayerStats(params.playerId,selectedSeason)
        .then((result)=>{
            setPlayerStats(result.data.response[0]);   
        });               
       
    },[params.playerId,selectedSeason])
    
    return ( 
        <div className="p-2 sm:p-4 max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-center">{playerStats?.player?.name}</h2>
            {playerStats?.player?.photo && (
                <img
                    src={playerStats.player.photo}
                    alt={playerStats.player.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full shadow mb-4"
                />
            )}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full justify-center">
                {/* Season Dropdown */}
                <select
                    onChange={(e) => setSelectedSeason(parseInt(e.target.value))}
                    defaultValue={season}
                    className="p-2 border rounded-md bg-white shadow-sm focus:outline-none w-full sm:w-auto"
                >
                    {playerSeasons?.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>

                {/* League Dropdown */}
                <select
                    onChange={(e) => setLeagueId(parseInt(e.target.value))}
                    className="p-2 border rounded-md bg-white shadow-sm focus:outline-none w-full sm:w-auto"
                >
                    {playerStats?.statistics?.map((item, index) => (
                        <option key={index} value={index}>{item.league.name}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Team and League Info */}
        {playerStats?.statistics && playerStats.statistics[leagueId] && (
            <div className="space-y-6">
                {/* Team */}
                <div className="bg-slate-100 rounded-lg p-3 sm:p-4 shadow-sm">
                    <p className="flex items-center gap-2 font-semibold text-slate-700">
                        <span>Team:</span>
                        <span>{playerStats.statistics[leagueId].team.name}</span>
                        <img src={playerStats.statistics[leagueId].team.logo} alt="team logo" className="w-6 h-6" />
                    </p>
                </div>

                {/* League */}
                <div className="bg-slate-100 rounded-lg p-3 sm:p-4 shadow-sm">
                    <p className="flex items-center gap-2 font-semibold text-slate-700">
                        <span>League:</span>
                        <span>{playerStats.statistics[leagueId].league.name}</span>
                        <img src={playerStats.statistics[leagueId].league.logo} alt="league logo" className="w-6 h-6" />
                    </p>
                    <p className="flex items-center gap-2 mt-2 text-slate-600">
                        <span>Country:</span>
                        <span>{playerStats.statistics[leagueId].league.country}</span>
                        {playerStats.statistics[leagueId].league.flag && (
                            <img src={playerStats.statistics[leagueId].league.flag} alt="country flag" className="w-6 h-4" />
                        )}
                    </p>
                </div>

                {/* Statistics */}
                <div className="space-y-4">
                    {Object.entries(playerStats.statistics[leagueId]).map(([key, value], index) => (
                        index > 1 && typeof value === 'object' && value !== null && (
                            <div key={index} className="bg-white rounded-md p-3 sm:p-4 shadow">
                                <h3 className="font-bold text-slate-700 capitalize mb-2">{key.replace('_', ' ')}</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-slate-600">
                                    {Object.entries(value).map(([subKey, subValue], idx) => (
                                        <div key={idx} className="flex justify-between">
                                            <span className="capitalize">{subKey.replace('_', ' ')}</span>
                                            <span>{subValue !== null ? subValue : 'NA'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        )}
    </div>
        
     );
}

export default Player;