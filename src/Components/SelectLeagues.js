import React, { useState, useEffect,useRef } from "react";
import getLeagues from "../Api/getLeagues.js";

export default function SelectLeagues(props) {
    // const country=props.country
    const[country,setCountry]=useState('');
    const [leagues,setLeagues]=useState([]);
    const [leagueId,setLeaguId]=useState(0);
    const countryInput=useRef('');
    let legs=[];


    useEffect((country)=>{
        getLeagues(country)
        .then(result=>{
            setLeagues(result.data.response.map((elem=>elem.league)))
        }) 
    },[country])

    function handleCountryName(){
        setCountry(countryInput.current.value.toString());
    }
    console.log("leagues",leagues);

    return(
        <div>
            <input type="text" ref={countryInput} />
            <button onClick={()=>handleCountryName()}>Search</button>
            {
                leagues?.map((league,index)=>{
                    return(
                    <div>
                        {league.name} {league.id}
                        <img src={league?.logo} style={{width:'40px',height:'40px'}} alt={league.name} />
                        <input type="checkbox" value={league.id} onChange={(e)=>e.target.value ? legs.push(league.id):null  }  />
                    </div>
                    )
                })
            }
        </div>
    )
}