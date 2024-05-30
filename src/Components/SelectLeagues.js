import React, { useState, useEffect,useRef } from "react";
import getLeagues from "../Api/getLeagues.js";
import { useCookies } from "react-cookie";

export default function SelectLeagues(props) {
    // const country=props.country
    const season=props.season;
    const[country,setCountry]=useState('');
    const [leagues,setLeagues]=useState([]);
    const [leagueId,setLeaguId]=useState(0);
    // const [selectedLeagues,setSelectedLeagues]=useState([]);
    const [checked,setChecked]=useState(false);
    const [cookies,setCookie]=useCookies(['selectedLeagues']);
    const countryInput=useRef('');
    let selectedLeagues=[];


    useEffect(()=>{
        getLeagues(country,season)
        .then(result=>{
            setLeagues(result.data.response.map((elem=>elem.league)))
        }) 
    },[country,season])

    function handleLeaguesCookie(){
        setCookie("selectedLeagues",selectedLeagues,{expires:'2h'})
    }

    console.log("selectedLeagues",selectedLeagues);

    return(
        <div>
            <input type="text" ref={countryInput} />
            <button onClick={()=>setCountry(countryInput.current.value)}>Search</button>
            {
                leagues?.map((league,index)=>{
                    return(
                    <div key={index}>
                        {league.name} {league.id}
                        <img src={league?.logo} style={{width:'40px',height:'40px'}} alt={league.name} />
                        <input type="checkbox" onChange={(e)=> e.target.checked ? selectedLeagues.push(league.id): selectedLeagues.splice(selectedLeagues.indexOf(league.id),1)   }  />                       
                    </div>
                    )
                })
            }
             <div>
                <button onClick={()=>handleLeaguesCookie()}>selectedLeagues</button>  
            </div>
        </div>
    )
}