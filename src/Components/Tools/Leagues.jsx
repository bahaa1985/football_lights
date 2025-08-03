import React, { useEffect } from 'react'
import { getCookie } from '../../Api/cookie.js';
import { NavLink } from 'react-router-dom';
import {getLeagueTranslationByCountry} from '../Translation/leagues.js'
import { getTranslation } from '../Translation/labels.js';

const leagues = getCookie('prefered_leagues') || [];
    // console.log("cookie", getCookie('prefered_leagues')); 
const lang= JSON.parse(localStorage.getItem("language"))?.lang || 'en'
export const leaguesArray=[
    //user preferences
    // ...leagues.map((league, idx) => ({ 
    //     id: league.id,
    //     name: league.name || league,
    //     logo: league.logo || ''
    // })),
    {id:2,name:lang === 'ar' ? getLeagueTranslationByCountry('World','UEFA Champions League') : 'UEFA Champions League',logo:'https://media.api-sports.io/football/leagues/2.png'},
    {id:3,name:lang === 'ar' ? getLeagueTranslationByCountry('World','UEFA Europa League'):'UEFA Europa League',logo:'https://media.api-sports.io/football/leagues/3.png'},
    {id:848,name:lang === 'ar' ? getLeagueTranslationByCountry('World','Europa Conference League'):'Conference League',logo:'https://media.api-sports.io/football/leagues/848.png'},
    {id:39,name:lang === 'ar' ? getLeagueTranslationByCountry('England','Premier League'):'Premier League',logo:'https://media.api-sports.io/football/leagues/39.png'},
    {id:140,name:lang === 'ar' ? getLeagueTranslationByCountry('Spain','La Liga'):'La Liga',logo:'https://media.api-sports.io/football/leagues/140.png'},
    {id:135,name:lang === 'ar' ? getLeagueTranslationByCountry('Italy','Serie A'):'Serie A',logo:'https://media.api-sports.io/football/leagues/135.png'},
    {id:78,name:lang === 'ar' ? getLeagueTranslationByCountry('Germany','Bundesliga'):'Bundesliga',logo:'https://media.api-sports.io/football/leagues/78.png'},
    {id:61,name:lang === 'ar' ? getLeagueTranslationByCountry('France','Ligue 1'):'Ligue 1',logo:'https://media.api-sports.io/football/leagues/61.png'},
    {id:88,name:lang === 'ar' ? getLeagueTranslationByCountry('Netherlands','Eredivisie'):'Eredivisie',logo:'https://media.api-sports.io/football/leagues/88.png'},
    {id:94,name:lang === 'ar' ? getLeagueTranslationByCountry('Portugal','Primeira Liga'):'Primeira Liga',logo:'https://media.api-sports.io/football/leagues/94.png'}        
]

export default function Leagues(){
    // const displayClass =props.displayClass;
    return(
            // {/* <div className='bg-slate-800 py-3 text-white text-center text-xl font-bold'>{getTranslation('Leagues',lang)}</div> */}
            <div className={`absolute top-0 left-0 flex w-full flex-row flex-wrap gap-2 justify-between p-6 mb-8 bg-white border-r border-l border-b border-slate-400 z-50`}>
                    {
                        leaguesArray.map((league,index)=>{
                            return(
                                <a href={`/league/${league.id}`} className='w-auto sm:w-24 flex-col sm:flex-row justify-center items-center' key={league.id}>
                                <div className='w-auto flex-col sm:flex-row justify-center items-center' key={league.id}>
                                    <img className='size-8 sm:size-12 mx-auto' src={league.logo} alt={league.name} />
                                    <h3 className='w-24 sm:w-full font-bold text-center'>{league.name}</h3>
                                </div>
                                </a>
                            )
                        })
                    }
            </div>
    )
}