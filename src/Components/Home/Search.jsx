import React, { useEffect, useState,useRef } from 'react';
import { getLeagues, getTeams } from "../../Api/LeaguesTeams.js";
import {getPlayerByName} from '../../Api/PlayerProfile.js';
import { getCookie, setCookie } from "../../Api/cookie.js";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import Favourite from '../Tools/Favourite.jsx';
import { Nav } from 'react-bootstrap';

export default function Search(){
    const [searchIndex,setSearchIndex] = useState(-1);
    const [isClicked,setClicked] = useState(false);
    const searchRef = useRef(null);
    const [searchKey,setSearchKey] = useState('');
    const [leagues,setLeagues] = useState([]);
    const [teams,setTeams] = useState([]);
    const [players,setPlayers] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            if(searchIndex === 0){
                const leagues_response = await getLeagues(searchKey);
                setLeagues(leagues_response.data.response)
                setClicked(false);
            }
            else if(searchIndex === 1){
                const teams_response = await getTeams(searchKey);
                setTeams(teams_response.data.response);
                setClicked(false);
            }
            else if(searchIndex === 2){
                const player_response = await getPlayerByName(searchKey);
                setPlayers(player_response.data.response);
                setClicked(false);
            }
        }
        fetchData();
    },[isClicked,searchIndex,searchKey])

    return(
        <div className='w-full h-96 mx-auto overflow-y-scroll bg-slate-100 rounded-lg'>
            <div className='w-full md:w-[70%] mx-auto flex flex-col items-center space-y-2'>
                <input type='text' ref={searchRef} className="w-full p-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={()=>setSearchIndex(-1)} />               
                <div className="w-full mx-auto flex flex-row justify-between gap-2 my-4">
  <button 
    className={`flex-1 py-2 rounded-md font-semibold transition-colors duration-200 ${searchIndex === 0 ? 'bg-slate-800 text-white' : 'bg-slate-300 text-gray-700'}`} 
    onClick={() => [setSearchKey(searchRef.current.value),setSearchIndex(0)]}
  >
    League
  </button>
  <button 
    className={`flex-1 py-2 rounded-md font-semibold transition-colors duration-200 ${searchIndex === 1 ? 'bg-slate-800 text-white' : 'bg-slate-300 text-gray-700'}`} 
    onClick={() => [setSearchKey(searchRef.current.value),setSearchIndex(1)]}
  >
    Team
  </button>
  <button 
    className={`flex-1 py-2 rounded-md font-semibold transition-colors duration-200 ${searchIndex === 2 ? 'bg-slate-800 text-white' : 'bg-slate-300 text-gray-700'}`} 
    onClick={() => [setSearchKey(searchRef.current.value),setSearchIndex(2)]}
  >
    Player
  </button>
</div>
 
            </div>                      
            <div className='my-2'>
                {
                    searchIndex === 0 ?
                        leagues?.map((item,index)=>{
                            return(
                                <div className='flex flex-row justify-between items-center border-b-2 border-b-slate-400 border-solid' key={index}>
                                    <NavLink to={`/league/${item.league.id}/${item.seasons.at(-1).year}}`} className='flex flex-row justify-between items-center'>
                                        <img className='size-6 sm:size-10 rounded-full' src={item.league.logo} loading='lazy' alt={item.league.name} />
                                        <span className="border-none">{item.league.name} ({item.country.name})</span>
                                        
                                    </NavLink>
                                    <Favourite elem_id={item.league.id} obj={{'id':item.league.id,'name':item.league.name,'logo':item.league.logo,'season':item.seasons.at(-1).year,'endDate':item.seasons.at(-1).end}} cookie_name={'prefered_leagues'} />                                    
                                </div>
                            )
                        })
                    : searchIndex === 1 ?
                        teams.map((item,index)=>{
                            return(
                                <div className='flex flex-row justify-between items-center border-b-2 border-b-slate-400 border-solid' key={index}>
                                    <NavLink to={`/team/${item.team.id}`} className='flex flex-row justify-between items-center '>
                                        <img className='size-6 sm:size-10 rounded-full' src={item.team.logo} loading='lazy' alt={item.team.name} />
                                        <span className="border-none">{item.team.name} ({item.team.country})</span>
                                       
                                    </NavLink>                                    
                                    <Favourite elem_id={item.team.id} obj={{'id':item.team.id,'name':item.team.name,'logo':item.team.logo}} cookie_name={'prefered_teams'} />
                                </div>
                            )
                        })
                    : searchIndex === 2 ? 
                        players.map((item,index)=>{
                            return(
                                <div className='flex flex-row justify-between items-center border-b-2 border-b-slate-400 border-solid' key={index}>
                                    <NavLink to={`/player/${item.player.id}`} className='flex flex-row justify-between items-center '>
                                        <img className='size-6 sm:size-10 rounded-full' src={item.player.photo} loading='lazy' alt={item.player.name} />
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