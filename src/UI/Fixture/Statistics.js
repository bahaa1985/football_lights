import React, { memo, useEffect } from "react";
import getStatistics from "../../api/Statistics.js";
import getPlayers from "../../api/Players.js";
import PlayerStats from "./PlayerStats.js";
import { useState, useMemo } from "react";
import { getCookie } from "../../api/Cookie.js";
import { getTranslation } from "../../Translation/labels.js";
import { getTeamByName } from "../../Translation/teams.js";
import { useSelector, useDispatch } from "react-redux";
import { requestsIncrement, resetRequests } from "../../ReduxStore/counterSlice.js";
import Spinner from "../../Components/Spinner.jsx";

function Statistics(props) {

    const fixtureId = props.fixtureId;
    const homeTeam= props.teams.home;
    const awayTeam = props.teams.away;

    const [homeStatistics, setHomeStatistics] = useState([]);
    const [homePlayers, setHomePlayers] = useState([]);
    const [awayPlayers, setAwayPlayers] = useState([]);
    const [awayStatistics, setAwayStatistics] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const dispatch = useDispatch();
    const requests_count = useSelector(state => state.counter.requestsCount);

    useEffect(() => {
        async function fetchStatistics() {
            const stats_response = await getStatistics(fixtureId);
            const players_response = await getPlayers(fixtureId);
            //
            if (stats_response.data.response.length > 0) {
                setHomeStatistics(stats_response.data.response[0].statistics);
                setAwayStatistics(stats_response.data.response[1].statistics);
                //
                setHomePlayers(players_response.data.response[0].players);
                setAwayPlayers(players_response.data.response[1].players);
                //
                setLoaded(true);
                //redux reducer increase requests count by one:
                dispatch(requestsIncrement());
            }

        }
        if (requests_count < 10) {
            fetchStatistics();
        }
        else {
            alert("API request limit reached. Please wait a minute before making more requests.");
        }

        //reset api requests to zero
        dispatch(resetRequests());

    }, [fixtureId])

    let total = 0;


    const lang = JSON.parse(localStorage.getItem('user_preferences'))?.lang || 'en';

    return (

        <div className="w-[90%] flex flex-col sm:flex-row sm:justify-between gap-2 sm:w-auto mx-auto text-center ">
            {
                isLoaded && homeStatistics ?
                    [
                        <div className="w-full sm:w-[45%]">
                            {/* teams header */}
                            <div id='team-header' className={`w-full flex flex-row justify-around bg-slate-800 my-2`}>
                                <div className={`flex flex-row gap-2 items-center w-1/2 bg-slate-300 text-slate-900te-50`}>
                                    <img className='w-14 h-14 rounded-full' src={homeTeam.logo} alt={homeTeam.name} />
                                    <span className='border-none font-bold cursor-pointer'>{lang === 'ar' ? getTeamByName(homeTeam.name) : homeTeam.name}</span>
                                </div>
                                <div className='flex flex-row-reverse gap-2 items-center w-1/2 bg-slate-300 text-slate-900'>
                                    <img className='w-14 h-14 rounded-full' src={awayTeam.logo} alt={awayTeam.name} />
                                    <span className='border-none font-bold cursor-pointer'>{lang === 'ar' ? getTeamByName(awayTeam.name) : awayTeam.name}</span>
                                </div>
                            </div>
                            {
                                homeStatistics?.map((item, index) => {
                                    total = Number.parseInt(item.value) + Number.parseInt(awayStatistics[index].value);
                                    return (
                                        <div key={index} className="w-full text-center my-4 mx-auto ">
                                            <div className="flex flex-col justify-center">
                                                {/* display home and away stats */}
                                                <div className="w-full flex flex-row justify-between px-2">
                                                    <div className="text-left font-bold px-2 sm:px-4">{`${item.value === null ? 0 : item.value}`}</div>
                                                    <div>{getTranslation(item.type.replace('_', ' '), lang)}</div>
                                                    <div className="text-right font-bold px-2 sm:px-4">{`${awayStatistics[index].value === null ? 0 : awayStatistics[index].value}`}</div>
                                                </div>
                                                {/* dispaly indicators */}
                                                <div className="w-full flex flex-row items-center space-x-2">

                                                    <div className="w-1/2 bg-gray-300 h-2 rotate-180">
                                                        {
                                                            item.value !== null && item.value !== 0 && !item.value.toString().includes('%') ?
                                                                <div style={{ width: `${Number.parseInt(item.value) * 100 / total}%` }} className={`bg-green-600  h-2`}></div> :
                                                                item.value?.toString().includes('%') ?
                                                                    <div style={{ width: `${item.value}` }} className={`bg-green-600  h-2`}></div>
                                                                    : null
                                                        }
                                                    </div>
                                                    {/*  */}
                                                    <div className="w-1/2 bg-gray-300 h-2">
                                                        {
                                                            awayStatistics[index].value !== null && awayStatistics[index].value !== 0 && !awayStatistics[index].value.toString().includes('%') ?
                                                                <div style={{ width: `${Number.parseInt(awayStatistics[index].value) * 100 / total}%` }} className={` bg-blue-600 h-2`}></div> :
                                                                awayStatistics[index].value?.toString().includes('%') ?
                                                                    <div style={{ width: `${awayStatistics[index].value}` }} className={` bg-blue-600 h-2`}></div>
                                                                    : null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        ,
                        <PlayerStats statistics={{ home: homePlayers, away: awayPlayers }} />
                    ]
                    : 
                    !isLoaded ?
                    <Spinner />
                    :null
            }

        </div>

    )
}

export default memo(Statistics)