import React, { useEffect } from 'react'
import { getCookie } from '../../Api/cookie.js';
import { NavLink } from 'react-router-dom';

const teams = getCookie('prefered_teams') || [];

const teamsArray=[
    ...teams.map((team, idx) => ({
        id: team.id,
        name: team.name || team,
        logo: team.logo || ''
    })),
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
    {id:228,name:'Sporting CP',logo:'https://media.api-sports.io/football/teams/228.png'}
]

export default function Teams(){
return(
    <div>
        <div className='bg-slate-800 py-3 text-white text-center text-xl font-bold'>Teams</div>
            <div className='flex flex-row flex-wrap gap-3 justify-between p-6 mb-8 bg-white border-r border-l border-b border-slate-400'>
                    {   teamsArray.map((team,index)=>{
                            return(
                                <NavLink to={`/team/${team.id}`} className='w-auto sm:w-44 flex-col sm:flex-row justify-center items-center' key={team.id}>
                                <div className='w-auto sm:w-44 flex-col sm:flex-row justify-center items-center' key={team.id}>
                                    <img className='size-8 sm:size-12 mx-auto' src={team.logo} alt={team.name} />
                                    <h3 className='w-28 sm:w-full font-bold text-center'>{team.name}</h3>
                                </div>
                                </NavLink>
                            )
                        })
                    }
            </div>
    </div>
)
}