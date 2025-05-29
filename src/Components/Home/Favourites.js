import React, { useState } from 'react';
import { getCookie } from '../../Api/cookie.js';
import { getTranslation } from '../../multi_language_translations.js';
import { getLeagueTranslationByCountry } from '../../leagues.js';
import { NavLink } from 'react-router-dom';

function Favourites() {
    const leagues=getCookie("prefered_leagues");
    const teams=getCookie("prefered_teams");
    const lang=getCookie('language').lang || 'en';    
    return (  
        <div className='flex flex-col w-full sm:w-[30%] h-auto sm:h-96 overflow-auto mx-auto bg-slate-50 p-2 rounded-md my-2'>
            <div className='w-full p-2 text-center text-sm lg:text-lg bg-slate-800 text-slate-50 rounded-md mt-1'>
                {getTranslation('Favourite Leagues',lang) || 'Favourite Leagues'}
            </div>
            {/* <div className='w-full flex flex-col justify-start my-2'> */}
                {
                    leagues.map((league,index)=>{
                        return(
                            <div key={index} className='w-full mt-1'>
                                <NavLink className='flex flex-row justify-start items-center gap-2' to={`/league/${league.id}/${league.season}`}>
                                    <img className='h-8 w-8 sm:h-10 sm:w-10 rounded bg-slate-50' alt={league.name} src={league.logo} />
                                    <div className='text-sm lg:text-lg'>
                                        {
                                            getLeagueTranslationByCountry(league.country,league.name) || league.name
                                        }
                                    </div>
                                </NavLink>
                            </div>
                        )
                    })
                }
            {/* </div> */}

            <div className='w-full p-2 text-center text-sm lg:text-lg bg-slate-800 text-slate-50 rounded-md mt-1'>
                {getTranslation('Favourite Teams',lang) || 'Favourite Teams'}
            </div>    
                {
                    teams.map((team,index)=>{
                        return(
                            <div key={index} className='w-full mt-1'>
                                <NavLink className='flex flex-row justify-start items-center space-x-2' to={`/team/${team.id}`}>                                   
                                    <img className='h-8 w-8 sm:h-10 sm:w-10 rounded bg-slate-50' alt={team.name} src={team.logo} />
                                    <div className='text-sm lg:text-lg'>{team.name}</div>
                                </NavLink>
                            </div>
                        )
                    })
                }
            {/* </div> */}
            
        </div>
    );
}

export default Favourites;