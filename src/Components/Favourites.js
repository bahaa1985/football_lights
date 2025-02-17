import React, { useState } from 'react';
import { getCookie } from '../Api/cookie.js';
import { NavLink } from 'react-router-dom';
function Favourites() {
    const leagues=getCookie("prefered_leagues");
    const teams=getCookie("prefered_teams");
    
    return (  
        <div className='w-full flex justify-between bg-slate-50'>
            <div className='flex flex-wrap justify-around'>
                <div className='w-full bg-slate-800 text-slate-50 rounded-md'>Favourite Leagues</div>
                {
                    leagues.map((league,index)=>{
                        return(
                            <div key={index}>
                                <NavLink className='flex flex-col' to={`/leagues/${league.id}/${league.season}`}>
                                    <img className='h-20 w-20 rounded' alt={league.name} src={league.logo} />
                                    <div>{league.name}</div>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex flex-wrap justify-around'>
                <div className='w-full bg-slate-800 text-slate-50 rounded-md'>Favourite Teams</div>
                {
                    teams.map((team,index)=>{
                        return(
                            <div key={index}>
                                <NavLink className='flex flex-col' to={`/teams/${team.id}`}>                                   
                                    <img className='h-20 w-20 rounded' alt={team.name} src={team.logo} />
                                    <div>{team.name}</div>
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