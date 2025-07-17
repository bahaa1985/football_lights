import React, { useEffect } from 'react'
import Favourites from "./Favourites.js";
import DayFixtures from './DayFixtures.jsx';
import News from './News.jsx';
import { getCookie } from '../../Api/cookie.js';

export default function Home(){

    console.log("cookie", getCookie('prefered_leagues'));
    const leagues = getCookie('prefered_leagues') || [];
    const teams = getCookie('prefered_teams') || [];

    const leaguesArray=[
        {id:2,name:'UCL',logo:'https://media.api-sports.io/football/leagues/2.png'},
        {id:3,name:'Europa League',logo:'https://media.api-sports.io/football/leagues/3.png'},
        {id:848,name:'Conference League',logo:'https://media.api-sports.io/football/leagues/848.png'},
        {id:39,name:'EPL',logo:'https://media.api-sports.io/football/leagues/39.png'},
        {id:140,name:'La Liga',logo:'https://media.api-sports.io/football/leagues/140.png'},
        {id:135,name:'Serie A',logo:'https://media.api-sports.io/football/leagues/135.png'},
        {id:78,name:'Bundesliga',logo:'https://media.api-sports.io/football/leagues/78.png'},
        {id:61,name:'Ligue 1',logo:'https://media.api-sports.io/football/leagues/61.png'},
        {id:88,name:'Eredivisie',logo:'https://media.api-sports.io/football/leagues/88.png'},
        {id:94,name:'Primeira Liga',logo:'https://media.api-sports.io/football/leagues/94.png'},
        ...leagues.map((league, idx) => ({ //user preferences
            id: league.id,
            name: league.name || league,
            logo: league.logo || ''
        })),
    ]
     console.log("leaguesArray", leaguesArray);

    const teamsArray=[
        {id:42,name:'Arsenal',logo:'https://media.api-sports.io/football/teams/42.png'},  
        {id:49,name:'Chelsea',logo:'https://media.api-sports.io/football/teams/49.png'},
        {id:50,name:'Manchester City',logo:'https://media.api-sports.io/football/teams/50.png'},
        {id:40,name:'Liverpool',logo:'https://media.api-sports.io/football/teams/40.png'},
        {id:33,name:'Manchester United',logo:'https://media.api-sports.io/football/teams/33.png'},
        {id:47,name:'Tottenham',logo:'https://media.api-sports.io/football/teams/47.png'},
        {id:541,name:'Real Madrid',logo:'https://media.api-sports.io/football/teams/541.png'},
        {id:529,name:'Barcelona',logo:'https://media.api-sports.io/football/teams/529.png'},
        {id:530,name:'Atletico Madrid',logo:'https://media.api-sports.io/football/teams/530.png'},
        {id:157,name:'Bayern Munich',logo:'https://media.api-sports.io/football/teams/157.png'},
        {id:165,name:'Borussia Dortmund',logo:'https://media.api-sports.io/football/teams/165.png'},
        {id:85,name:'Paris Saint-Germain',logo:'https://media.api-sports.io/football/teams/85.png'},
        {id:489,name:'AC Milan',logo:'https://media.api-sports.io/football/teams/489.png'},
        {id:505,name:'Inter Milan',logo:'https://media.api-sports.io/football/teams/505.png'},
        {id:496,name:'Juventus',logo:'https://media.api-sports.io/football/teams/496.png'},
        {id:435,name:'River Plate',logo:'https://media.api-sports.io/football/teams/435.png'},
        {id:451,name:'Boca Juniors',logo:'https://media.api-sports.io/football/teams/451.png'},
        {id:128,name:'Santos',logo:'https://media.api-sports.io/football/teams/128.png'},
        {id:127,name:'Flamengo',logo:'https://media.api-sports.io/football/teams/127.png'},
        {id:212,name:'FC Porto',logo:'https://media.api-sports.io/football/teams/212.png'},
        {id:211,name:'Benfica',logo:'https://media.api-sports.io/football/teams/211.png'},
        {id:228,name:'Sporting CP',logo:'https://media.api-sports.io/football/teams/228.png'},
        ...teams.map((team, idx) => ({
            id: team.id,
            name: team.name || team,
            logo: team.logo || ''
        })),
    ]
    console.log("teamsArray", teamsArray);
    
    return(
        <div className={`mt-20 w-[90%] mx-auto`}>
            <div className={`flex flex-col sm:flex-row sm:justify-between w-full my-2`}>
                {/* <Favourites/>
                <DayFixtures /> */}
                
            </div>
            {/* leagues */}
            <div className='text-3xl font-bold'>Leagues</div>
            <div className='flex flex-row flex-wrap gap-3 justify-between p-6 my-8 border-r border-l border-b border-slate-400'>
                    {
                        leaguesArray.map((league,index)=>{
                            return(
                                <div className='w-auto sm:w-44 flex-col sm:flex-row justify-center items-center' key={league.id}>
                                    <img className='size-8' src={league.logo} alt={league.name} />
                                    <h3 className='w-24'>{league.name}</h3>
                                </div>
                            )
                        })
                    }
            </div>
            {/* Teams */}
            <div className='text-3xl font-bold'>Teams</div>
            <div className='flex flex-row flex-wrap gap-3 justify-between p-6 my-8 border-r border-l border-b border-slate-400'>
                    {   teamsArray.map((team,index)=>{
                            return(
                                <div className='w-auto sm:w-44 flex-col sm:flex-row justify-center items-center' key={team.id}>
                                    <img className='size-8' src={team.logo} alt={team.name} />
                                    <h3 className='w-24'>{team.name}</h3>
                                </div>
                            )
                        })
                    }
            </div>
            {/* <br/> */}
            <div className='flex flex-col sm:flex-row sm:justify-between w-full my-2'>
                <News />
                
            </div>
        </div>
    )
}