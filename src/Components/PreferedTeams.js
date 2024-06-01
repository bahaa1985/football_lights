import React, { useState, useEffect,useRef } from "react";
import {getTeam} from "../Api/getLeaguesTeams.js";
import { useCookies } from "react-cookie";
import Cookies from "universal-cookie";

export default function PreferedTeams() {
    
    const[search,setSearch]=useState('');
    const [teams,setTeams]=useState([]);
    const searchInput=useRef('');
    let selectedTeams=[];

    useEffect(()=>{
        getTeam(search)
        .then(result=>{
            console.log("result",result.data);
            setTeams(result.data.response.map(elem=>elem.team))
        }) 
    },[search])

    function handleTeamsCookie(){
        const cookie=new Cookies();
        cookie.set("preferedTeams",selectedTeams)
    }

    console.log("teams",teams);

    return(
        <div>
            <input type="text" ref={searchInput} />
            <button onClick={()=>setSearch(searchInput.current.value)}>Search</button>
            {
                teams?.map((team,index)=>{
                    return(
                    <div key={index}>
                        {team.name} {team.id} ({team.country})
                        <img src={team?.logo} style={{width:'40px',height:'40px'}} alt={team.name} />
                        <input type="checkbox" onChange={(e)=> e.target.checked ? selectedTeams.push(parseInt(team.id)): selectedTeams.splice(selectedTeams.indexOf((parseInt(team.id))),1)   }  />                       
                    </div>
                    )
                })
            }
            <div>
                {
                    selectedTeams.map((elem,index)=>{
                        return(
                            <div>{elem}</div>
                        )
                    })
                }
            </div>
             <div>
                <button onClick={()=>handleTeamsCookie()}>Selected Teams</button>  
            </div>
        </div>
    )
}