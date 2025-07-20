import React,{ ReactDOM } from 'react'
import { useState,useEffect} from 'react'
import getStandings from '../../Api/Standings.js'
import { getCookie } from "../../Api/cookie.js";
import { getTranslation } from "../../multi_language_translations.js";
import { getLeagueTranslationByCountry } from '../../leagues.js';

function Standings(props){    
    
    let league=props.league;
    let season=props.season
    
    const [standings,setStandings]=useState([])
    const [standingsGroups,setStandingsGroups]= useState([]);
    const [deviceWidth,setDeviceWidth]=useState(window.innerWidth);
    const [description,setDesccription] = useState([])
    const [country,setCountry] = useState("");

    const lang= getCookie('language').lang || 'en';

    useEffect(()=>{              
        getStandings(league,season).then((result)=>{
            console.log("standings: ",result);         
            setStandings(result.data.response[0].league.standings)

            if(result.data.response[0].league.country !== "World"){
                let groups = result.data.response[0].league.standings.map((group)=>{
                    // console.log("group:",group[0].group);
                    return group[0].group                                
                })
                 setStandingsGroups(groups)
            }
           
            const desc_keys =Object.groupBy(result.data.response[0].league.standings[0],function (item){
                return item.description
            });
            setDesccription(Object.keys(desc_keys))
            // console.log('descs',description)

            setCountry(result.data.response[0].league.country);

            window.addEventListener('resize',()=>{
                setDeviceWidth(window.innerWidth);
            })                                    
        })          
    },[league,season])
    
    return(
        <div className='w-full lg:w-[70%] mx-auto'>

            {/* Qualifiactions colors indicators */}
            {               
                country !== "World" ? 
                // <h1 className='text-2xl font-bold text-center my-2'>{getLeagueTranslationByCountry(country,league)}</h1>               
                [<div className='w-full flex flex-row justify-start items-center gap-3 px-2 my-1'>
                    <span className='size-6 bg-green-700 rounded-full border-none'></span>
                    <span className='border-none w-[70%]'>{lang === 'ar' ? getLeagueTranslationByCountry("World",description[0]) || description[0]:description[0]}</span>
                </div>,

                <div className='w-full flex flex-row justify-start items-center gap-3 px-2  my-1'>
                    <span className='size-6 bg-green-500 rounded-full border-none'></span>
                    <span className='border-none w-[70%]'>{lang === 'ar' ? getLeagueTranslationByCountry("World",description[1]) ||description[1]:description[1]}</span>
                </div>,
                
                description[2] !== "null" ?
                    <div className='w-full flex flex-row justify-start items-center gap-3 px-2  my-1'>
                        <span className='size-6 bg-green-300 rounded-full border-none'></span>
                        <span className='border-none w-[70%]'>{lang === 'ar' ? getLeagueTranslationByCountry("World",description[2]) ||description[2]:description[2]}</span>
                    </div>
                    :null
                ,
                
                description.at(-1) !== "null" ?
                    <div className='w-full flex flex-row justify-start items-center gap-3 px-2  my-1'>
                        <span className='size-6 bg-red-500 rounded-full border-none'></span>
                        <span className='border-none w-[70%]'>{lang === 'ar' ? getLeagueTranslationByCountry("World",description.at(-1)) || description.at(-1):description.at(-1)}</span>
                    </div>
                    :null
                ] 
                :null
            }
            
            

            {/* league group dropdown: */}
            {
                standingsGroups.length > 1 ?
                    <p className='text-sm'>{`*This league contains many stages: ${standingsGroups.map((group)=> group.substring(group.indexOf(':')+2,group.length)).join(', ')}`}</p>
                :null
            }
            {
                deviceWidth < 600 ?
                <p>{getTranslation('Rotate to landscape mode to see all the columns',lang)}</p>
                :null
            }
            <table className='relative top-4 w-full table-auto'>
                <thead className='sticky top-16'>
                    <tr className="bg-slate-800 text-slate-50 text-center divide-x-2">
                        <td className='p-2'>{getTranslation('Rank',lang)}</td>
                        <td className='p-2'>{getTranslation('Team',lang)}</td>
                        <td className='p-2'>{getTranslation('Play',lang)}</td>
                        {
                            deviceWidth > 600 ?
                            <>
                                <td className='p-2'>{getTranslation('Win',lang)}</td>
                                <td className='p-2'>{getTranslation('Draw',lang)}</td>
                                <td className='p-2'>{getTranslation('Lose',lang)}</td>
                                <td className='p-2'>{getTranslation('GF',lang)}</td>
                                <td className='p-2'>{getTranslation('GA',lang)}</td>
                            </>                            
                            :
                            null
                        }
                        <td className='p-2'>{getTranslation('GD',lang)}</td>
                        <td className='p-2'>{getTranslation('Points',lang)}</td>                      
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
                                        <tr key={index} className={`text-center border-b-slate-400 ${index !== group.length-1 ?  'border-solid border':null}`}>
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
                                               null
                                            }
                                            <td className='p-2'>{elem.all.goals.for - elem.all.goals.against}</td>
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