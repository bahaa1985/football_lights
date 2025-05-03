import React,{ ReactDOM } from 'react'
import { useState,useEffect} from 'react'
import getStandings from '../../Api/Standings.js'

function Standings(props){    
    
    let league=props.league;
    let season=props.season

    const [standings,setStandings]=useState([])
    const [standingsGroups,setStandingsGroups]= useState([]);
    const [deviceWidth,setDeviceWidth]=useState(window.innerWidth);
    const [description,setDesccription] = useState([])

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
            const desc_keys =Object.groupBy(result.data.response[0].league.standings[0],function (item){
                if(item.description !== null || item.description !== undefined ) {return item.description}
            });
            setDesccription(Object.keys(desc_keys))
            console.log('descs',description)

            window.addEventListener('resize',()=>{
                setDeviceWidth(window.innerWidth);
            })                                    
    })          
    },[])
    
    return(
        <div className='w-[90%] lg:w-[70%] mx-auto'>
            <div className='w-full flex flex-row justify-start items-center space-x-3 px-2 my-1'>
                <span className='size-6 bg-green-700 rounded-full border-none'></span>
                <span className='border-none w-[70%]'>{description[0]}</span>
            </div>
            <div className='w-full flex flex-row justify-start items-center space-x-3 px-2  my-1'>
                <span className='size-6 bg-green-500 rounded-full border-none'></span>
                <span className='border-none w-[70%]'>{description[1]}</span>
            </div>
            <div className='w-full flex flex-row justify-start items-center space-x-3 px-2  my-1'>
                <span className='size-6 bg-green-300 rounded-full border-none'></span>
                <span className='border-none w-[70%]'>{description[2]}</span>
            </div>
            <div className='w-full flex flex-row justify-start items-center space-x-3 px-2  my-1'>
                <span className='size-6 bg-red-500 rounded-full border-none'></span>
                <span className='border-none w-[70%]'>{description.at(-1)}</span>
            </div>
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
                <thead className='sticky top-16'>
                    <tr className="bg-slate-800 text-slate-50 text-center divide-x-2">
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
                                            <td className='p-2'>
                                            {
                                                elem.description === description[0] ?
                                                <span className='flex justify-center items-center bg-green-700 size-8 p-2 border-none rounded-full mx-2'>{elem.rank}</span>
                                                :elem.description === description[1] ?
                                                <span className='flex justify-center items-center bg-green-500 size-8 p-2 border-none rounded-full mx-2'>{elem.rank}</span>
                                                :elem.description === description[2] ?
                                                <span className='flex justify-center items-center bg-green-300 size-8 p-2 border-none rounded-full mx-2'>{elem.rank}</span>
                                                :elem.description === description.at(-1) ?
                                                <span className='flex justify-center items-center bg-red-500 size-8 p-2 border-none rounded-full mx-2'>{elem.rank}</span>
                                                :<span className='flex justify-center items-center size-8 p-2 border-none mx-2'>{elem.rank}</span>
                                            }
                                            </td>                               
                                            <td className='w-full flex justify-center items-center p-2'>
                                                {
                                                    deviceWidth > 600 ?
                                                    <img src={elem.team.logo} className="size-8 sm:size-10 lg:size-12" alt={elem.team.name}/>
                                                    :null
                                                }
                                                <span className='w-[70%] border-none'>{elem.team.name}</span>
                                            </td>
                                            <td className='p-2'>{elem.all.played}</td>
                                            {
                                                deviceWidth > 600 ?
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