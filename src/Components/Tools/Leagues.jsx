import React, { useEffect } from 'react'
import { getCookie } from '../../Api/cookie.js';
import { NavLink } from 'react-router-dom';

const leagues = getCookie('prefered_leagues') || [];
    // console.log("cookie", getCookie('prefered_leagues')); 

const leaguesArray=[
    ...leagues.map((league, idx) => ({ //user preferences
        id: league.id,
        name: league.name || league,
        logo: league.logo || ''
    })),
    {id:2,name:'UCL',logo:'https://media.api-sports.io/football/leagues/2.png'},
    {id:3,name:'Europa League',logo:'https://media.api-sports.io/football/leagues/3.png'},
    {id:848,name:'Conference League',logo:'https://media.api-sports.io/football/leagues/848.png'},
    {id:39,name:'Premier League',logo:'https://media.api-sports.io/football/leagues/39.png'},
    {id:140,name:'La Liga',logo:'https://media.api-sports.io/football/leagues/140.png'},
    {id:135,name:'Serie A',logo:'https://media.api-sports.io/football/leagues/135.png'},
    {id:78,name:'Bundesliga',logo:'https://media.api-sports.io/football/leagues/78.png'},
    {id:61,name:'Ligue 1',logo:'https://media.api-sports.io/football/leagues/61.png'},
    {id:88,name:'Eredivisie',logo:'https://media.api-sports.io/football/leagues/88.png'},
    {id:94,name:'Primeira Liga',logo:'https://media.api-sports.io/football/leagues/94.png'}        
]

export default function Leagues(){
    return(
        <div>
            <div className='bg-slate-800 py-3 text-white text-center text-xl font-bold'>Leagues</div>
            <div className='w-full flex flex-row flex-wrap gap-3 justify-between p-6 mb-8 bg-white border-r border-l border-b border-slate-400'>
                    {
                        leaguesArray.map((league,index)=>{
                            return(
                                <NavLink to={`/league/${league.id}`} className='w-auto sm:w-44 flex-col sm:flex-row justify-center items-center' key={league.id}>
                                <div className='w-auto sm:w-44 flex-col sm:flex-row justify-center items-center' key={league.id}>
                                    <img className='size-8 sm:size-12 mx-auto' src={league.logo} alt={league.name} />
                                    <h3 className='w-28 sm:w-full font-bold text-center'>{league.name}</h3>
                                </div>
                                </NavLink>
                            )
                        })
                    }
            </div>
        </div>
    )
}