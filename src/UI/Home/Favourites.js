import React, { useState } from 'react';
import { getCookie } from '../../Api/cookie.js';
import { getTranslation } from '../../Translation/labels.js';
import { getLeagueTranslationByCountry } from '../../Translation/leagues.js';
import { NavLink } from 'react-router-dom';
import Favourite from '../../Components/Favourite.jsx';
import { getTeamByCountry, getTeamByName } from '../../Translation/teams.js';

function Favourites() {
    const leagues=getCookie("prefered_leagues");
    
    const teams=getCookie("prefered_teams");
    
    const lang = JSON.parse(localStorage.getItem('user_preferences'))?.lang || 'en';  

    return (  
        <div className='flex flex-col w-full h-[550px] sm:w-[30%] overflow-auto  bg-slate-50 my-2'>
            
            <div className="h-1/2">
            <div className='w-full p-2 text-center lg:text-lg bg-slate-800 text-slate-50 text-xl font-bold'>
                {getTranslation('Favourite Leagues',lang) || 'Favourite Leagues'}
            </div>
            {
                leagues.length > 0 ?
                    leagues.map((league,index)=>{
                        return(
                            <div key={index} className='w-full flex flex-row px-2 mt-1'>
                                <NavLink className='flex flex-row justify-start items-center gap-2' to={`/leagues/${league.id}`}>
                                    <img className='h-8 w-8 sm:h-10 sm:w-10 rounded bg-slate-50' alt={league.name} src={league.logo} />
                                    <div className='text-sm lg:text-lg'>
                                        {
                                            lang === 'ar' ? getLeagueTranslationByCountry(league.country,league.name) : league.name
                                        }
                                    </div>
                                </NavLink>
                                <Favourite elem_id={league.id} cookie_name={'prefered_leagues'} 
                                obj={{id:league.id,
                                    name:league.name,
                                    country:league.country.name,
                                    logo:league.logo,
                                    season:league.season,
                                    endDate:league.endDate}} />
                            </div>
                        )
                    })
                : <div className='w-full px-2 font-bold text-lg'>{getTranslation('No favourite leagues are selected',lang)}</div>
            }

            </div>
            <div className='h-1/2'>
<div className='w-full p-2 text-center lg:text-lg bg-slate-800 text-slate-50 text-xl font-bold'>
               
              {getTranslation('Favourite Teams',lang) || 'Favourite Teams'}
            </div>    
                {
                    teams.length > 0 ?
                        teams.map((team,index)=>{
                            return(
                                <div key={index} className='w-full flex flex-row px-2 mt-1'>
                                    <NavLink className='flex flex-row justify-start items-center space-x-2' to={`/teams/${team.id}`}>                                   
                                        <img className='h-8 w-8 sm:h-10 sm:w-10 rounded bg-slate-50' alt={team.name} src={team.logo} />
                                        <div className='text-sm lg:text-lg'>
                                            {
                                                lang === 'ar' ? getTeamByCountry(team.country,team.name) : team.name
                                            }
                                        </div>
                                    </NavLink>
                                    <Favourite elem_id={team.id} cookie_name={'prefered_teams'} obj={{'id':team.id,'name':team.name,'country':team.country,'logo':team.logo}} />
                                </div>
                            )
                        })
                    : <div className='w-full px-2 font-bold text-lg'>{getTranslation('No favourite teams are selected',lang)}</div>
                }
            </div>
            
            
        </div>
    );
}

export default Favourites;