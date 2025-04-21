import React, { useState, useEffect, useMemo, useRef, memo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getTeamSeasons, getTeamInformation, getTeamStatistics, getTeamLeagues } from '../../Api/getTeamDetails.js';
import { getCookie } from '../../Api/cookie.js';
import TeamStatistics from './TeamStatistics.jsx';

export default function Team() {

    const teamIdParam = parseInt(useParams().teamId);
    const teams = getCookie("prefered_teams");
    const [searchParams] = useSearchParams();
    const leagueParam = searchParams.get('league');
    const season = searchParams.get('season');

    // console.log(`teamIdParam: ${teamIdParam}, leagueParam: ${leagueParam}, season: ${season}`);


    const [team, setTeam] = useState(teamIdParam ? teamIdParam : teams[0].id);
    const [teamSeasons, setTeamSeasons] = useState([]);
    const [teamLeagues, setTeamLeagues] = useState([]);
    const [teamInformation, setTeamInformation] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(0);
    const [statsLoaded, setStatsLoaded] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState(leagueParam ? parseInt(leagueParam) : teamLeagues[0]?.league?.id);
    const [clickedSubmit, setClickedSubmit] = useState(false);

    // Fetch team information
    useEffect(() => {
        async function fetchTeamInfo() {
            const fetchedInfo = await getTeamInformation(team);
            setTeamInformation(fetchedInfo.data.response[0]);
        }
        fetchTeamInfo();
    }, [team]);

    // Fetch team seasons
    useEffect(() => {
        async function fetchTeamSeasons() {
            const fetchedSeasons = await getTeamSeasons(team);
            setTeamSeasons(fetchedSeasons.data.response);
            // Automatically select the latest season if not already selected
            if (!selectedSeason) {
                setSelectedSeason(fetchedSeasons.data.response.at(-1));
            }
        }
        fetchTeamSeasons();
    }, [team]);

    // Fetch team leagues
    useEffect(() => {
        if (!selectedSeason) return; // Ensure a season is selected before fetching leagues
        async function fetchTeamLeagues() {
            const fetchedLeagues = await getTeamLeagues(team, selectedSeason);
            setTeamLeagues(fetchedLeagues.data.response);
            // Automatically select the first league if not already selected
            if (!selectedLeague && fetchedLeagues.data.response.length > 0) {
                setSelectedLeague(fetchedLeagues.data.response[0].league.id);
            }
        }
        fetchTeamLeagues();
    }, [team, selectedSeason]);

    // Set statsLoaded to true when all data is loaded
    useEffect(() => {
        if (teamSeasons.length > 0 && teamLeagues.length > 0 && Object.keys(teamInformation).length > 0) {
            setStatsLoaded(true);
        }
    }, [teamSeasons, teamLeagues, teamInformation]);

    // Memoize team leagues and seasons to avoid unnecessary re-renders
    const memoizedTeamLeagues = useMemo(() => teamLeagues, [teamLeagues]);
    const memoizedTeamSeasons = useMemo(() => teamSeasons, [teamSeasons]);



    return (
        <div className='bg-gray-100'>
            {
                statsLoaded ?
                    <>
                        {/** Team's basic information */}
                        <div className='team-basic'>
                            <div className='team'>
                                <div>
                                    <img src={teamInformation?.team?.logo} alt={teamInformation?.team?.name} />
                                </div>
                                <div>
                                    <p>
                                        <span>Name</span><span>{teamInformation?.team?.name}</span>
                                    </p>
                                    <p>
                                        <span>Country</span><span>{teamInformation?.team?.country}</span>
                                    </p>
                                    <p>
                                        <span>Founded</span><span>{teamInformation?.team?.founded}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/** Venue details */}
                        <div className='venue'>
                            <div>
                                <p>
                                    <span>Name</span><span>{teamInformation?.venue?.name}</span>
                                </p>
                                <p>
                                    <span>City</span><span>{teamInformation?.venue?.city}</span>
                                </p>
                                <p>
                                    <span>Capacity</span><span>{teamInformation?.venue?.capacity}</span>
                                </p>
                            </div>
                            <div>
                                <img className="h-48 w-56" src={teamInformation?.venue?.image} alt={teamInformation?.venue?.name} />
                            </div>
                        </div>

                        {/** Season and leagues dropdowns */}

                        <div>
                            {
                                <select onChange={(e) => setSelectedSeason(parseInt(e.target.value))}
                                 value={selectedSeason} >
                                    <option>Select season</option>
                                    {
                                        memoizedTeamSeasons?.map((item, index) => {
                                            return (
                                                <option key={index} value={item}>{item}</option>
                                            )
                                        })
                                    }
                                </select>
                            }

                            <select onChange={(e) => setSelectedLeague(parseInt(e.target.value))} 
                                   value={selectedLeague} >
                                <option>Select league</option>
                                {
                                    memoizedTeamLeagues?.map((item, index) => {
                                        return (
                                            <option key={index} value={item.league.id}>{item.league.name}</option>
                                        )
                                    })
                                }
                            </select>
                            {/*  */}
                            {/* <button onClick={()=>setClickedSubmit(true)}>Get statistics</button> */}
                        </div>

                        {/** Team statistics specified to a selected league */}

                        <div>
                            {
                                // clickedSubmit ? //handle get Team statistics component
                                <TeamStatistics team={team} season={selectedSeason} league={selectedLeague} />
                                // : null    
                            }
                        </div>
                    </>
                    : null
            }
        </div>)
}

