import React, { useEffect, useState } from 'react';
import { getLeagues, getTeams } from "../../Api/LeaguesTeams.js";
import getPlayerProfile from '../../Api/PlayerProfile.js';
import { getCookie, setCookie } from "../../Api/cookie.js";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import Favourite from '../Tools/Favourite.jsx';
import { Nav } from 'react-bootstrap';

export default function Search(){
    const [searchIndex,setSearchIndex] = useState(-1);
    const [isClicked,setClicked] = useState(false);
    const [searchKey,setSearchKey] = useState('');
    const [leagues,setLeagues] = useState([]);
    const [teams,setTeams] = useState([]);
    const [players,setPlayers] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            if(searchIndex === 0){
                const leagues_response = await getLeagues(searchKey);
                console.log(leagues_response.data);
                
                setLeagues(leagues_response.data.response)
                setClicked(false);
            }
            else if(searchIndex === 1){
                const teams_response = await getTeams(searchKey);
                setTeams(teams_response.data.response);
                setClicked(false);
            }
            else if(searchIndex === 2){
                const player_response = await getPlayerProfile(null,null,searchKey,null);
                setPlayers(player_response.data.response);
                setClicked(false);
            }
        }
        fetchData();
    },[isClicked,searchIndex,searchKey])

    return(
        <div className='absolute top-24 left-1/2 -translate-x-1/2 mx-auto w-[80%] h-[90vh] overflow-auto bg-slate-100 rounded-lg'>
            <div className='w-full sm:w-[50%] mx-auto flex flex-col items-center space-y-2'>
                <input type='text' onChange={(e)=>setSearchKey(e.target.value)} />               
                <div className='w-full sm:w-[50%] mx-auto flex flex-row justify-between'>
                    <button className={`w-24 rounded-lg ${searchIndex === 0 ? 'bg-slate-800' : 'bg-slate-400'} text-slate-5`} onClick={()=>setSearchIndex(0)}>League</button>
                    <button className={`w-24 rounded-lg ${searchIndex === 1 ? 'bg-slate-800' : 'bg-slate-400'} text-slate-5`} onClick={()=>setSearchIndex(1)}>Team</button>
                    <button className={`w-24 rounded-lg ${searchIndex === 2 ? 'bg-slate-800' : 'bg-slate-400'} text-slate-5`} onClick={()=>setSearchIndex(2)}>Player</button>
                </div>  
            </div>                      
            <div>
                {
                    searchIndex === 0 ?
                        leagues?.map((item,index)=>{
                            return(
                                <div key={index}>
                                    <NavLink to={`/league/${item.league.id}/${item.seasons.at(-1).year}}`} className='flex flex-row justify-between items-center border-b-2 border-b-slate-400 border-solid'>
                                        <img className='size-6 sm:size-10 rounded-full' src={item.league.logo} loading='lazy' alt={item.league.name} />
                                        <span className="border-none">{item.league.name}</span>
                                        <Favourite elem_id={item.league.id} obj={{'id':item.league.id,'name':item.league.name,'logo':item.league.logo,'season':item.seasons.at(-1).year,'endDate':item.seasons.at(-1).end}} cookie_name={'prefered_league'} />
                                    </NavLink>                                    
                                </div>
                            )
                        })
                    : searchIndex === 1 ?
                        teams.map((item,index)=>{
                            return(
                                <div key={index}>
                                    <NavLink to={`/team/${item.team.id}`} className='flex flex-row justify-between items-center border-b-2 border-b-slate-400 border-solid'>
                                        <img className='size-6 sm:size-10 rounded-full' src={item.team.logo} loading='lazy' alt={item.team.name} />
                                        <span className="border-none">{item.team.name}</span>
                                        <Favourite obj={{'id':item.team.id,'name':item.team.name,'logo':item.team.logo}} />
                                    </NavLink>                                    
                                </div>
                            )
                        })
                    : searchIndex === 2 ? 
                        players.map((item,index)=>{
                            return(
                                <div key={index}>
                                    <NavLink to={`/player/${item.player.id}`} className='flex flex-row justify-between items-center border-b-2 border-b-slate-400 border-solid'>
                                        <img className='size-6 sm:size-10 rounded-full' src={item.player.image} loading='lazy' alt={item.player.name} />
                                        <span className="border-none">{item.player.name}</span> 
                                    </NavLink>                                                                      
                                </div>
                            )
                        })
                    :null
                }
            </div>
        </div>
    )
}