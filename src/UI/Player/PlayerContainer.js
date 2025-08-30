import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayerSeasons, getPlayerStats, getPlayerProfile } from '../../Api/PlayerProfile.js';
import { getTranslation } from '../../Translation/labels.js';
import { getLeagueTranslationByCountry } from '../../Translation/leagues.js';
import { getCountryNameBylang } from '../../Translation/countries.js';
import { useSelector,useDispatch } from "react-redux";
import { requestsIncrement, resetRequests } from "../../ReduxStore/counterSlice.js";
import Spinner from '../../Components/Spinner.jsx';
import { getTeamByCountry, getTeamByName } from '../../Translation/teams.js';

export default function PlayerContainer(props) {
    const season=props.season;
    const [playerSeasons,setPlayerSeasons]=useState([]);
    const [playerStats,setPlayerStats]=useState([]); 
    const [leagueId,setLeagueId]=useState(0);
    const [selectedSeason,setSelectedSeason]=useState(season);
    const [isLoaded,setLoaded]=useState(false);
    const params =useParams();
    
    const dispatch = useDispatch();
    const requests_count = useSelector(state => state.counter.requestsCount);

    useEffect(()=>{
        
        async function fetchData(){
            try{
                const response_seasons = await  getPlayerSeasons(params.playerId);
                const response_stats =  await getPlayerStats(params.playerId,selectedSeason);
                setPlayerSeasons(response_seasons.data.response);
                setPlayerStats(response_stats.data.response[0]);   
                setLoaded(true);
            }
            catch{
                alert(`Error in player's data`);
            }
             //redux reducer increase requests count by one:
            dispatch(requestsIncrement());
        } 
        if(requests_count < 10){
            fetchData();    
        }
        else{
            alert("API request limit reached. Please wait a minute before making more requests.");
        }

        //reset api requests to zero
        dispatch(resetRequests());  
  
    },[params.playerId,selectedSeason])

    const lang = JSON.parse(localStorage.getItem('user_preferences'))?.lang || 'en';
    
    return ( 
        isLoaded ?
        <div className="m-20 mx-auto w-full md:w-[75%] rounded-lg bg-white p-6 shadow-lg">
        <div className="w-full flex flex-col items-center mb-4">
            {/* <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-center">{playerStats?.player?.name}</h2> */}
            {playerStats?.player?.photo && (
                <img
                    src={playerStats?.player.photo}
                    alt={playerStats?.player.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full shadow mb-4"
                    referrerPolicy="no-referrer"
                />
            )}
            <div>
                <h2>{getTranslation('Name',lang)}: {playerStats?.player.firstname +' ' + playerStats?.player.lastname}</h2>
                <p>{getTranslation('Nationality',lang)}: {getCountryNameBylang(playerStats?.player.nationality,lang)}</p>
            </div>
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
                        <option key={index} value={index}>
                            {
                               lang === 'ar' ? 
                                    getLeagueTranslationByCountry(item.league.country,item.league.name)
                                    :
                                    item.league.name
                            }
                        </option>
                    ))}
                </select>
            </div>
        </div>

       
        {playerStats?.statistics && playerStats?.statistics[leagueId] && (
            <div className="w-full space-y-4">
                {/* Team */}
                <div className="bg-slate-200 rounded-lg p-3 sm:p-4 shadow-sm">
                    <p className="flex items-center gap-2 font-semibold ">
                        <span className="border-none text-slate-700">{getTranslation('Team',lang)}:</span>
                        <span className="border-none text-slate-600">
                            {
                            lang === 'ar' ? 
                                getTeamByCountry(playerStats?.statistics[leagueId].league.country,playerStats?.statistics[leagueId].team.name)
                                :
                                playerStats?.statistics[leagueId].team.name
                            }
                        </span>
                        <img src={playerStats?.statistics[leagueId].team.logo} alt="team logo" className="w-6 h-6" />
                    </p>
                </div>

                {/* League */}
                <div className="bg-slate-200 rounded-lg p-3 sm:p-4 shadow-sm">
                    <p className="flex items-center gap-2 font-semibold">
                        <span className="border-none text-slate-700">{getTranslation('League',lang)}:</span>
                        <span className="border-none text-slate-600">
                            {/* translate league name to Arabic if the prefered language is aArabic */}
                            {lang === 'ar' ? 
                                getLeagueTranslationByCountry(playerStats?.statistics[leagueId].league.country,playerStats?.statistics[leagueId].league.name)
                                :
                                playerStats?.statistics[leagueId].league.name
                            }
                        </span>
                        <img src={playerStats?.statistics[leagueId].league.logo} alt="league logo" className="size-8 sm:size-10" />
                    </p>
                    <p className="flex items-center gap-2 mt-2 text-slate-600">
                        <span className="border-none font-bold text-slate-700">{getTranslation('Country',lang)}:</span>
                        <span className="border-none text-slate-600">{getCountryNameBylang(playerStats?.statistics[leagueId].league.country,lang)}</span>
                        {playerStats?.statistics[leagueId].league.flag && (
                            <img src={playerStats?.statistics[leagueId].league.flag} alt="country flag" className="w-6 h-4" />
                        )}
                    </p>
                </div>

                {/* Statistics */}
                <div className="space-y-4">
                    {Object.entries(playerStats?.statistics[leagueId]).map(([key, value], index) => (
                        index > 1 && typeof value === 'object' && value !== null && (
                            <div key={index} className="bg-slate-200 rounded-md p-3 sm:p-4 shadow">
                                <h3 className="font-bold text-slate-700 capitalize mb-2">{getTranslation(key.replace(key[0], key[0].toUpperCase()),lang)}</h3>
                                <div className="flex flex-row justify-between flex-wrap gap-4">
                                    {Object.entries(value).map(([subKey, subValue], idx) => (
                                        <div key={idx} className="flex justify-between gap-2">
                                            <span className="capitalize border-none font-bold text-slate-700">{getTranslation(subKey.replace('_', ' ').replace(subKey[0],subKey[0].toUpperCase()),lang)}</span>
                                            <span className="border-none text-slate-600">{subValue !== null && subValue !== false && subKey !== 'rating' ? 
                                                                                            subValue : 
                                                                                            subKey === 'rating' ? subValue.substring(0,3) :'NA'}</span>
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
        :<Spinner />
     );
}