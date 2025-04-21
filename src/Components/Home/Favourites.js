import React, { useState } from 'react';
import { getCookie } from '../../Api/cookie.js';
import { NavLink } from 'react-router-dom';
function Favourites() {
    const leagues=getCookie("prefered_leagues");
    const teams=getCookie("prefered_teams");
    
    return (  
        <div className='flex flex-col w-full bg-slate-50'>
            <div className='w-full bg-slate-800 text-slate-50 rounded-md'>Favourite Leagues</div>
            <div className='w-full flex flex-wrap justify-start space-x-4 my-2'>
                {
                    leagues.map((league,index)=>{
                        return(
                            <div key={index}>
                                <NavLink className='flex flex-col' to={`/leagues/${league.id}/${league.season}`}>
                                    <img className='h-12 w-12 sm:h-14 sm:w-14 rounded mx-auto bg-slate-50'
                                         alt={league.name} src={league.logo} />
                                    {/* <div className='w-10 h-2 text-wrap'>{league.name}</div> */}
                                </NavLink>
                            </div>
                        )
                    })
                }
            </div>

            <div className='w-full bg-slate-800 text-slate-50 rounded-md'>Favourite Teams</div>
            <div className='w-full flex flex-wrap justify-start space-x-4 my-2'>
                
                {
                    teams.map((team,index)=>{
                        return(
                            <div key={index}>
                                <NavLink className='flex flex-col' to={`/teams/${team.id}`}>                                   
                                    <img className='h-12 w-12 sm:h-14 sm:w-14 rounded mx-auto bg-slate-50' alt={team.name} src={team.logo} />
                                    {/* <div className='w-10 h-2 text-wrap'>{team.name}</div> */}
                                </NavLink>
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    );
}

export default Favourites;