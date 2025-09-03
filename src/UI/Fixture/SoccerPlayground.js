import React, { memo } from 'react';
import { getTeamByName } from '../../Translation/teams.js';

const SoccerPlayground = (props) => {
    const homeLines = props.lines.home;
    const awayLines = props.lines.away;
    const homeTeamProfile = props.profiles.home;
    const awayTeamProfile = props.profiles.away;
    const homePlayers = props.players.home;
    const awayPlayers = props.players.away;
    //to calculate team's avg rate:
    function teamRating(players) {
        let totalAvg = 0.1;
        players.forEach((player, index) => {
            if (!isNaN(parseFloat(player.statistics[0].games.rating))) {
                totalAvg += parseInt(player.statistics[0].games.rating);
            }
        });
        const playersCount = players.filter(
            (player) => player.statistics[0].games.minutes > 0
        ).length;
        totalAvg /= playersCount;
        totalAvg = totalAvg.toFixed(1);
        return totalAvg;
    }

    //to color player's rate indicator depending on his score
    function ratingBGColor(value) {
        let rating = parseFloat(value);
        let bgColor = '';
        if (rating >= 0 && rating < 5) bgColor = 'bg-red-700'
        else if (rating >= 5 && rating < 6) bgColor = 'bg-red-500'
        else if (rating >= 6 && rating < 6.5) bgColor = 'bg-orange-500'
        else if (rating >= 6.5 && rating < 8) bgColor = 'bg-green-500'
        else if (rating >= 8.1 & rating <= 10) bgColor = 'bg-blue-500'
        return bgColor;
    }

    const lang = JSON.parse(localStorage.getItem('user_preferences'))?.lang || 'en';

    return (
        <div>
            {/*  home team's logo, name and rating*/}
            <div className={`p-2 w-full flex flex-row justify-between mx-auto rounded-md bg-slate-800`}>
                <div className="flex justify-start sm:justify-center space-x-2 px-auto">
                    <img alt={homeTeamProfile.name} src={homeTeamProfile.logo} className="w-8 h-8" />
                    <span className="text-left flex items-center text-slate-50 border-none">
                        {lang === 'ar' ? getTeamByName(homeTeamProfile.name) : homeTeamProfile.name}
                    </span>
                    <span className={`flex justify-center items-center w-6 h-6 sm:w-8 sm:h-8 mx-2 text-center ${ratingBGColor(teamRating(homePlayers))} text-slate-50 border-none`}>
                        {teamRating(homePlayers)}
                    </span>
                </div>
                <div className="flex justify-center space-x-2 px-auto text-slate-50 text-lg">
                    {
                        homeTeamProfile.formation?.join(' - ')
                    }
                </div>
            </div>
            <div className="relative w-full h-[680px] md:h-[850px] mx-auto border-2 bg-green-600 border-slate-50">
                {/* Outer Borders */}
                <div className="absolute top-0 left-0 w-full h-full"></div>

                {/* Center Line */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-500 transform -translate-y-1/2"></div>

                {/* Center Circle */}
                <div className="absolute top-1/2 left-1/2 w-[120px] h-[120px] border-2 border-slate-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>


                {/* Top Half */}
                <div className="absolute top-0 left-0 w-full h-1/2">
                    {/* Goal Area */}
                    <div className="absolute top-0 left-1/2 w-[100px] h-[40px] border-2 border-slate-500 transform -translate-x-1/2"></div>

                    {/* 18 Yard Area */}
                    <div className="absolute top-0 left-1/2 w-[200px] h-24 border-2 border-slate-500 transform -translate-x-1/2"></div>
                    <div className='w-full h-full flex flex-col justify-center'>
                        {
                            homeLines?.length > 0 ?
                                homeLines?.map((line, index) => {
                                    return (
                                        <div key={index} className={`${homeLines.length === 4 ? 'h-[23%]' : 'h-[19%]'}`}>
                                            {line}
                                        </div>
                                    );
                                })
                                : 'No data available'
                        }
                    </div>

                </div>

                {/* Bottom Half */}
                <div className="absolute bottom-0 left-0 w-full h-1/2">
                    {/* Goal Area */}
                    <div className="absolute bottom-0 left-1/2 w-[100px] h-[40px] border-2 border-slate-500 transform -translate-x-1/2"></div>

                    {/* 18 Yard Area */}
                    <div className="absolute bottom-0 left-1/2 w-[200px] h-24 border-2 border-slate-500 transform -translate-x-1/2"></div>
                    <div className='w-full h-full flex flex-col-reverse justify-center'>
                        {
                            awayLines?.length > 0 ?
                                awayLines?.map((line, index) => {
                                    return (
                                        <div key={index} className={`${awayLines.length === 4 ? 'h-[23%]' : 'h-[19%]'}`}>
                                            {line}
                                        </div>
                                    );
                                })
                                : 'No data available'
                        }
                    </div>
                </div>
            </div>
            {/* Away team's logo, name and rating*/}
            <div className={`p-2 flex flex-row justify-between w-full mx-auto rounded-md bg-slate-800`}>
                <div className="flex justify-start sm:justify-center space-x-2 px-auto">
                    <img alt={awayTeamProfile.name} src={awayTeamProfile.logo} className="w-8 h-8" />
                    <span className="text-left flex items-center text-slate-50 border-none">
                        {lang === 'ar' ? getTeamByName(awayTeamProfile.name) : awayTeamProfile.name}
                    </span>
                    <span className={`flex justify-center items-center w-6 h-6 sm:w-8 sm:h-8 text-center text-slate-50 ${ratingBGColor(teamRating(awayPlayers))} border-none`}>
                        {
                            teamRating(awayPlayers)
                        }
                    </span>
                </div>
                <div className="flex justify-center space-x-2 px-auto text-slate-50 text-lg">
                    {
                        awayTeamProfile.formation?.join(' - ')
                    }
                </div>
            </div>
        </div>

    );
};

export default memo(SoccerPlayground);