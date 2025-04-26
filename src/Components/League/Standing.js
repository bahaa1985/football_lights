import React,{ ReactDOM } from 'react'
import { useState,useEffect} from 'react'
import getStandings from '../../Api/getStandings.js'

function Standings(props){    
    
    let league=props.league;
    let season=props.season

    const [standings,setStandings]=useState([])
    const [standingsGroups,setStandingsGroups]= useState([]);
    const [deviceWidth,setDeviceWidth]=useState(window.innerWidth);

    useEffect(()=>{              
        getStandings(league,season).then((result)=>{
            console.log("standings: ",result);         
            setStandings(result.data.response[0].league.standings)
            // if(standings?.length > 0 ){
            let groups = result.data.response[0].league.standings.map((group)=>{
                console.log("group:",group[0].group);
                return group[0].group                
                
            })
            setStandingsGroups(groups)
            //
            window.addEventListener('resize',()=>{
                setDeviceWidth(window.innerWidth);
            })                                    
    })          
    },[])
    
    return(
        <div className='w-[90%] lg:w-[70%] mx-auto'>
            {/* league group dropdown: */}
            {
                standingsGroups.length > 1 ?
                    <p className='text-sm'>{`*This league contains many stages: ${standingsGroups.map((group)=> group.substring(group.indexOf(':')+2,group.length)).join(', ')}`}</p>
                :null
            }
            {
                deviceWidth < 600 ?
                <p>Rotate to landscape mode to see all the columns</p>
                :null
            }
            <table className='relative top-0 w-full table-auto'>
                <thead className='sticky top-20'>
                    <tr className="bg-slate-800 text-slate-50 text-center">
                        <td className='p-2'>Rank</td>
                        <td className='p-2'>Team</td>
                        <td className='p-2'>Play</td>
                        {
                            deviceWidth > 600 ?
                            <>
                                <td className='p-2'>Win</td>
                                <td className='p-2'>Draw</td>
                                <td className='p-2'>Lose</td>
                                <td className='p-2'>GF</td>
                                <td className='p-2'>GA</td>
                            </>                            
                            :
                            <>
                                <td className='p-2'>GD</td>
                            </>
                        }
                        <td className='p-2'>Points</td>                      
                    </tr>
                </thead>
                <tbody>
                    {
                        standings.map((group)=>{
                            return(
                                [standingsGroups.length > 1 ? 
                                    <tr className=' bg-blue-600 '><td colSpan={9}>{group[0].group}</td></tr> 
                                    : null, 
                                group.map((elem,index)=>{
                                    return(
                                        <tr key={index} className='bg-slate-100 text-center border-b-slate-400 border-solid border'>
                                            <td className='p-2'>{elem.rank}</td>                               
                                            <td className='flex items-center py-2'>
                                                {
                                                    deviceWidth > 600 ?
                                                    <img src={elem.team.logo} className="w-10 h-10" alt={elem.team.name}/>
                                                    :null
                                                }
                                                {elem.team.name}
                                            </td>
                                            <td className='p-2'>{elem.all.played}</td>
                                            {
                                                deviceWidth > 500 ?
                                                <>
                                                    <td className='p-2'>{elem.all.win}</td>
                                                    <td className='p-2'>{elem.all.draw}</td>
                                                    <td className='p-2'>{elem.all.lose}</td>
                                                    <td className='p-2'>{elem.all.goals.for}</td>
                                                    <td className='p-2'>{elem.all.goals.against}</td>
                                                </>
                                                :
                                                <td className='p-2'>{elem.all.goals.for - elem.all.goals.against}</td>
                                            }
                                            <td className='p-2'>{elem.points}</td>
                                        </tr> 
                                    )
                                }
                            )]                                           
                        )                     
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Standings