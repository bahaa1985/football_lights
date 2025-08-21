import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getTeamSeasons, getTeamInformation, getTeamLeagues } from '../../Api/TeamDetails.js';
import { getCookie } from '../../Api/cookie.js';
import { getTranslation } from '../../Translation/labels.js';
import TeamStatistics from './TeamStatistics.jsx';
import Favourite from '../../Components/Favourite.jsx';
import { teamsArray } from '../../Components/Teams.jsx'
import { getTeamByCountry } from '../../Translation/teams.js';
import { getCountryNameTranslation } from '../../Translation/countries.js';

export default function Team() {
    const teamIdParam = parseInt(useParams().teamId);
    const teams = getCookie("prefered_teams");
    const [searchParams] = useSearchParams();
    const leagueParam = searchParams.get('league');
    const season = searchParams.get('season');

    const [team, setTeam] = useState(teamIdParam  || teams[0].id);
    const [selectedTeam, setSelectedTeam] = useState(teamIdParam || teams[0].id);
    const [teamSeasons, setTeamSeasons] = useState([]);
    const [teamLeagues, setTeamLeagues] = useState([]);
    const [teamInformation, setTeamInformation] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(season ? season : teamSeasons.at(-1)?.season?.year);
    const [statsLoaded, setStatsLoaded] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState(leagueParam ?leagueParam : teamLeagues[0]?.league?.id);

    useEffect(() => {
        async function fetchTeamInfo() {
            const fetchedInfo = await getTeamInformation(team);
            setTeamInformation(fetchedInfo.data.response[0]);
        }
        fetchTeamInfo();
    }, [team]);

    useEffect(() => {
        async function fetchTeamSeasons() {
            const fetchedSeasons = await getTeamSeasons(team);
            setTeamSeasons(fetchedSeasons.data.response);
            if (!selectedSeason) {
                setSelectedSeason(fetchedSeasons.data.response.at(-1));
            }
        }
        fetchTeamSeasons();
    }, [team,selectedSeason]);

    useEffect(() => {
        if (!selectedSeason) return;
        async function fetchTeamLeagues() {
            const fetchedLeagues = await getTeamLeagues(team, selectedSeason);
            setTeamLeagues(fetchedLeagues.data.response);
            if (!selectedLeague && fetchedLeagues.data.response.length > 0) {
                setSelectedLeague(fetchedLeagues.data.response[0].league.id);
            }
        }
        fetchTeamLeagues();
    }, [team, selectedSeason]);

    useEffect(() => {
        if (teamSeasons.length > 0 && teamLeagues.length > 0 && Object.keys(teamInformation).length > 0) {
            setStatsLoaded(true);
        }
    }, [teamSeasons, teamLeagues, teamInformation]);

    const memoizedTeamLeagues = useMemo(() => teamLeagues, [teamLeagues]);
    const memoizedTeamSeasons = useMemo(() => teamSeasons, [teamSeasons]);

     const lang = JSON.parse(localStorage.getItem("user_preferences"))?.lang || "en";

    return (
        <div className="mx-auto mt-20 w-full md:w-[75%] rounded-lg bg-white p-6 shadow-lg">
            {statsLoaded ? (
                <>
                <div className="bg-slate-100 p-6 rounded-lg shadow-inner mb-4">
                    <h2 className="w-full text-xl font-bold text-slate-800 mb-4 text-center">{getTranslation('Favourite Teams', lang)}</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {teams.map((team, index) => (
                            <button
                                key={index}
                                className={`w-32 cursor-pointer flex flex-col items-center px-3 py-2 rounded-lg transition border-2 ${
                                    team.id === selectedTeam ? 'border-blue-600 bg-blue-50 shadow'
                  : 'border-transparent hover:bg-gray-100'
                                }`}
                                onClick={() => [setTeam(team.id),setSelectedTeam(team.id)]}
                            >
                                <img
                                    src={team.logo}
                                    alt={team.name}
                                    className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                                />
                                <p className="text-center font-semibold mt-2">{team.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
                    {/* Team Header */}
                    <div className="flex flex-col justify-between items-center flex-wrap mb-8">
                        <div className="flex items-center gap-4">
                            <img className="w-16 h-16 md:w-20 md:h-20 rounded-full" src={teamInformation?.team?.logo} alt={teamInformation?.team?.name} />
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{lang==='ar' ? getTeamByCountry(teamInformation?.team?.country,teamInformation?.team?.name) : teamInformation?.team?.name}</h1>
                            {/* favourite */}
                            {
                                !teamsArray.find(team=>team.id === teamInformation?.team.id) &&
                                <Favourite elem_id={teamInformation?.team.id} cookie_name={'prefered_teams'} 
                                obj={
                                    {
                                        id:teamInformation?.team.id,
                                        name:teamInformation?.team.name,
                                        logo:teamInformation?.team.logo
                                }} 
                            />
                            }
                            
                        </div>
                        <div className="flex flex-row justify-center flex-wrap gap-4 mt-2 text-center">
                            <div>
                                <p className="text-gray-600 text-xl font-bold">{getTranslation('Country',lang)}</p>
                                <p className="font-semibold">{getCountryNameTranslation(teamInformation?.team?.country,lang)}</p>
                            </div>                            
                            <div>
                                <p className="text-gray-600 text-xl font-bold">{getTranslation('Founded',lang)}</p>
                                <p className="font-semibold">{teamInformation?.team?.founded}</p>
                            </div>
                            
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center flex-wrap gap-4 mt-2 text-center">
                            <div>
                                <p className="text-gray-600 text-xl font-bold">{getTranslation('Venue',lang)}</p>
                                <p className="font-semibold">{teamInformation?.venue?.name}</p>
                            </div> 
                            <div>
                                <p className="text-gray-600 text-xl font-bold">{getTranslation('City',lang)}</p>
                                <p className="font-semibold">{teamInformation?.venue?.city}</p>
                            </div>                           
                            <div>
                                <p className="text-gray-600 text-xl font-bold">{getTranslation('Capacity',lang)}</p>
                                <p className="font-semibold">{teamInformation?.venue?.capacity}</p>
                            </div>
                        </div>
                    </div>

                    {/* Season and League Dropdowns */}
                    <div className="bg-slate-100 p-6 rounded-lg shadow-inner mb-8">
                        <h2 className="w-full text-xl font-bold text-slate-800 mb-4 text-center">{getTranslation('Select Season and League',lang)}</h2>
                        <div className="flex flex-col md:flex-row gap-4">
                            <select
                                onChange={(e) => setSelectedSeason(parseInt(e.target.value))}
                                value={selectedSeason}
                                className="w-full md:w-1/2 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            >
                                <option>{getTranslation('Select Season',lang)}</option>
                                {memoizedTeamSeasons.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>

                            <select
                                onChange={(e) => setSelectedLeague(parseInt(e.target.value))}
                                value={selectedLeague}
                                className="w-full md:w-1/2 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            >
                                <option>{getTranslation('Select League',lang)}</option>
                                {memoizedTeamLeagues.map((item, index) => (
                                    <option key={index} value={item.league.id}>
                                        {item.league.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Team Statistics */}
                    <div className="bg-slate-100 p-1 md:p-2 rounded-lg shadow-inner">
                        <h2 className="w-full text-xl text-center font-bold text-slate-800 mb-1">{getTranslation('Team Statistics',lang)}</h2>
                        <TeamStatistics team={team} season={selectedSeason} league={selectedLeague} />
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center h-64">
                    <p className="text-slate-800 text-lg font-semibold">Loading team information...</p>
                </div>
            )}
        </div>
    );
}
