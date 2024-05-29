import React,{ ReactDOM } from 'react'
import { useState,useEffect, useMemo } from 'react'
import getStandings from '../Api/getStandings.js'

function Standings(props){    
    
    let league=props.league;
    let season=props.season

    const [standings,setStandings]=useState([])

    useEffect(()=>{              
        getStandings(league,season).then((result)=>{        
            setStandings(result.data.response[0].league.standings) 
            console.log("standing",standings);                                         
    })            
    },[league,season])
    
    return(
        <div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <td>Rank</td>
                        <td>Team</td>
                        <td>Games</td>
                        <td>Win</td>
                        <td>Draw</td>
                        <td>Lose</td>
                        <td>GF</td>
                        <td>GA</td>
                        <td>Points</td>                      
                    </tr>
                </thead>
                <tbody>
                    {
                        standings.map((group)=>{ 
                            return(
                                group.map((elem,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{elem.rank}</td>
                                            <td>{elem.team.name}</td>
                                            <td>{elem.all.played}</td>
                                            <td>{elem.all.win}</td>
                                            <td>{elem.all.draw}</td>
                                            <td>{elem.all.lose}</td>
                                            <td>{elem.all.goals.for}</td>
                                            <td>{elem.all.goals.against}</td>
                                            <td>{elem.points}</td>
                                        </tr> 
                                    )
                                }
                            )                                             
                        )                     
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Standings