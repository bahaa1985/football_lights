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
    },[])
    
    return(
        <div className='w-[90%] md:w-[70%] mx-auto'>
            <table className='w-full table-auto'>
                <thead>
                    <tr className="bg-slate-800 text-slate-50">
                        <td className='p-2'>Rank</td>
                        <td className='p-2'>Team</td>
                        <td className='p-2'>Games</td>
                        <td className='p-2'>Win</td>
                        <td className='p-2'>Draw</td>
                        <td className='p-2'>Lose</td>
                        <td className='p-2'>GF</td>
                        <td className='p-2'>GA</td>
                        <td className='p-2'>Points</td>                      
                    </tr>
                </thead>
                <tbody>
                    {
                        standings.map((group)=>{ 
                            return(
                                group.map((elem,index)=>{
                                    return(
                                        <tr key={index} className='even:bg-slate-200 odd:bg-slate-50'>
                                            <td className='p-2'>{elem.rank}</td>
                                            {/* <td className='border border-slate-400'><img src={elem.team.logo} className="w-10 h-10" alt={elem.team.name}/></td> */}
                                            <td className='flex items-center py-2'>
                                                <img src={elem.team.logo} className="w-10 h-10" alt={elem.team.name}/>{elem.team.name}
                                            </td>
                                            <td className='p-2'>{elem.all.played}</td>
                                            <td className='p-2'>{elem.all.win}</td>
                                            <td className='p-2'>{elem.all.draw}</td>
                                            <td className='p-2'>{elem.all.lose}</td>
                                            <td className='p-2'>{elem.all.goals.for}</td>
                                            <td className='p-2'>{elem.all.goals.against}</td>
                                            <td className='p-2'>{elem.points}</td>
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