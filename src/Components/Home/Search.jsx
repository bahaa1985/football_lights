import React, { useEffect, useState } from 'react';
import { getLeagues, getTeams } from "../../Api/LeaguesTeams.js";
import getPlayerProfile from '../../Api/PlayerProfile.js';
import { getCookie, setCookie } from "../../Api/cookie.js";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Search(){
    const [searchIndex,setSearchIndex] = useState(-1);
    const [isClicked,setClicked] = useState(false);
    const [searchKey,setSearchKey] = useState('');
    const [leagues,setLeagues] = useState([]);
    const [teams,setTeams] = useState([]);
    const [players,setPlayers] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            if(searchIndex === 0 && isClicked){
                const leagues_response = await getLeagues(searchKey);
                setLeagues(leagues_response.data.response)
                setClicked(false);
            }
            else if(searchIndex === 1 && isClicked){
                const teams_response = await getTeams(searchKey);
                setTeams(teams_response.data.response);
                setClicked(false);
            }
            else if(searchIndex === 2 && isClicked){
                const player_response = await getPlayerProfile(null,null,searchKey,null);
                setPlayers(player_response.data.response);
                setClicked(false);
            }
        }
        fetchData();
    },[isClicked,searchIndex,searchKey])

    return(
        <div>
            <div className='w-full sm:w-[50%] mx-auto flex flex-row justify-between'>
                <button onClick={()=>setSearchIndex(0)}>League</button>
                <button onClick={()=>setSearchIndex(1)}>Team</button>
                <button onClick={()=>setSearchIndex(2)}>Player</button>
            </div>
            <div className='w-full sm:w-[50%] mx-auto flex flex-row justify-between'>
                <input type='text' onChange={(e)=>setSearchKey(e.target.value)} />
                <button onClick={()=>setClicked(!isClicked)}>Search</button>
            </div>
            <div>
                {
                    searchIndex === 0 ?
                        leagues?.map((league,index)=>{
                            return(
                                <div key={index}>
                                    <img src={league.logo} alt={league.name} />
                                    <span className="border-none">{league.name}</span>
                                    <FontAwesomeIcon icon={faStar} size={'2x'} onClick={()=>setCookie('prefered_leagues',league)} />
                                </div>
                            )
                        })
                    : searchIndex === 1 ?
                        teams.map((team,index)=>{
                            return(
                                <div key={index}>
                                    <img src={team.logo} alt={team.name} />
                                    <span className="border-none">{team.name}</span>
                                    <FontAwesomeIcon icon={faStar} size={'2x'} onClick={()=>setCookie('prefered_teams',teams)} />
                                </div>
                            )
                        })
                    : searchIndex === 2 ? 
                        players.map((player,index)=>{
                            return(
                                <div key={index}>
                                    <img src={player.logo} alt={player.name} />
                                    <span className="border-none">{player.name}</span>
                                    <FontAwesomeIcon icon={faStar} size={'2x'} />
                                </div>
                            )
                        })
                    :null
                }
            </div>
        </div>
    )
}