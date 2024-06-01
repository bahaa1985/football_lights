import React, { useState, useEffect,useRef } from "react";
import {getLeagues} from "../Api/getLeaguesTeams.js";
import { useCookies } from "react-cookie";
import Cookies from "universal-cookie";

export default function PreferedLeagues() {
    // // const country=props.country
    // const season=props.season;
    const[search,setSearch]=useState('');
    const [leagues,setLeagues]=useState([]);
    // const [leagueId,setLeaguId]=useState(0);
    // const [selectedLeagues,setSelectedLeagues]=useState([]);
    // const [checked,setChecked]=useState(false);

    // const [cookies,setCookie, removeCookie]=useCookies(['selectedLeagues']);
    const searchInput=useRef('');
    let selectedLeagues=[];


    useEffect(()=>{
        getLeagues(search)
        .then(result=>{
            setLeagues(result.data.response)
        }) 
    },[search])

    function handleLeaguesCookie(){
        const cookie=new Cookies();
        cookie.set("selectedLeagues",selectedLeagues)
    }

    console.log("selected Leagues",selectedLeagues);

    return(
        <div>
            <input type="text" ref={searchInput} />
            <button onClick={()=>setSearch(searchInput.current.value)}>Search</button>
            {
                leagues?.map((elem,index)=>{
                    return(
                    <div key={index}>
                        {elem.league.name} {elem.league.id} ({elem.country.name}) 
                        {/* <img src={league.country.}/>) */}
                        <img src={elem.league?.logo} style={{width:'40px',height:'40px'}} alt={elem.league.name} />
                        <input type="checkbox" onChange={(e)=> e.target.checked ? selectedLeagues.push(parseInt(elem.league.id)): selectedLeagues.splice(selectedLeagues.indexOf((parseInt(elem.league.id))),1)   }  />                       
                    </div>
                    )
                })
            }
            <div>
                {
                    selectedLeagues.map((elem,index)=>{
                        return(
                            <div>{elem}</div>
                        )
                    })
                }
            </div>
             <div>
                <button onClick={()=>handleLeaguesCookie()}>Selected Leagues</button>  
            </div>
        </div>
    )
}