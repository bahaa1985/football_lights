import React,{ ReactDOM } from 'react'
import { useState,useEffect} from 'react'
import getStandings from '../../Api/getStandings.js'

function Standings(props){    
    
    let league=props.league;
    let season=props.season

    const [standings,setStandings]=useState([])

    useEffect(()=>{              
        getStandings(league,season).then((result)=>{
            console.log("standings: ",result);         
            setStandings(result.data.response[0].league.standings)                                       
    })            
    },[league,season])
    
    return(
        <div className='w-70% md:w-[50%] mx-auto'>
            <table className='w-full table-auto border-collapse border border-slate-400 text-center'>
                <thead>
                    <tr>
                        <td className='border border-slate-400'>Rank</td>
                        <td className='border border-slate-400'>Team</td>
                        <td className='border border-slate-400'>Games</td>
                        <td className='border border-slate-400'>Win</td>
                        <td className='border border-slate-400'>Draw</td>
                        <td className='border border-slate-400'>Lose</td>
                        <td className='border border-slate-400'>GF</td>
                        <td className='border border-slate-400'>GA</td>
                        <td className='border border-slate-400'>Points</td>                      
                    </tr>
                </thead>
                <tbody>
                    {
                        standings.map((group)=>{ 
                            return(
                                group.map((elem,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td className='border border-slate-400'>{elem.rank}</td>
                                            {/* <td className='border border-slate-400'><img src={elem.team.logo} className="w-10 h-10" alt={elem.team.name}/></td> */}
                                            <td className='flex items-center border border-slate-400'>
                                                <img src={elem.team.logo} className="w-10 h-10" alt={elem.team.name}/>{elem.team.name}
                                            </td>
                                            <td className='border border-slate-400'>{elem.all.played}</td>
                                            <td className='border border-slate-400'>{elem.all.win}</td>
                                            <td className='border border-slate-400'>{elem.all.draw}</td>
                                            <td className='border border-slate-400'>{elem.all.lose}</td>
                                            <td className='border border-slate-400'>{elem.all.goals.for}</td>
                                            <td className='border border-slate-400'>{elem.all.goals.against}</td>
                                            <td className='border border-slate-400'>{elem.points}</td>
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