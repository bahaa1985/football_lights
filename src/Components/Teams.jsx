import React, { useEffect, useState } from 'react'
import { getTeamByCountry } from '../Translation/teams.js';

const lang =  JSON.parse(localStorage.getItem('user_preferences'))?.lang || 'en';


export const teamsArray=[
    {id:42,name:lang === 'ar' ? getTeamByCountry('England','Arsenal') : 'Arsenal',
        logo:'https://media.api-sports.io/football/teams/42.png'},  
    {id:49,name: lang === 'ar' ? getTeamByCountry('England','Chelsea') : 'Chelsea',
        logo:'https://media.api-sports.io/football/teams/49.png'},
    {id:50,name:lang === 'ar' ? getTeamByCountry('England','Manchester City') : 'Manchester City',
        logo:'https://media.api-sports.io/football/teams/50.png'},
    {id:40,name:lang === 'ar' ? getTeamByCountry('England','Liverpool'):'Liverpool' ,
        logo:'https://media.api-sports.io/football/teams/40.png'},
    {id:33,name:lang === 'ar' ? getTeamByCountry('England','Manchester United'):'Manchester United',
        logo:'https://media.api-sports.io/football/teams/33.png'},
    {id:47,name:lang === 'ar' ? getTeamByCountry('England','Tottenham'):'Tottenham',
        logo:'https://media.api-sports.io/football/teams/47.png'},
    {id:541,name:lang === 'ar' ? getTeamByCountry('Spain','Real Madrid'):'Real Madrid',
        logo:'https://media.api-sports.io/football/teams/541.png'},
    {id:529,name:lang === 'ar' ? getTeamByCountry('Spain','Barcelona'):'Barcelona',
        logo:'https://media.api-sports.io/football/teams/529.png'},
    {id:530,name:lang === 'ar' ? getTeamByCountry('Spain','Atletico Madrid'):'Atletico Madrid',
        logo:'https://media.api-sports.io/football/teams/530.png'},
    {id:157,name:lang === 'ar' ? getTeamByCountry('Germany','Bayern Munich'):'Bayern München',
        logo:'https://media.api-sports.io/football/teams/157.png'},
    {id:165,name:lang === 'ar' ? getTeamByCountry('Germany','Borussia Dortmund'):'Borussia Dortmund',
        logo:'https://media.api-sports.io/football/teams/165.png'},
    {id:85,name:lang === 'ar' ? getTeamByCountry('France','Paris Saint-Germain'):'Paris Saint Germain',
        logo:'https://media.api-sports.io/football/teams/85.png'},
    {id:489,name:lang ==='ar' ? getTeamByCountry('Italy','AC Milan'):'AC Milan',
        logo:'https://media.api-sports.io/football/teams/489.png'},
    {id:505,name:lang ==='ar' ? getTeamByCountry('Italy','Inter Milan'):'Inter Milan',
        logo:'https://media.api-sports.io/football/teams/505.png'},
    {id:496,name:lang ==='ar' ? getTeamByCountry('Italy','Juventus'):'Juventus',
        logo:'https://media.api-sports.io/football/teams/496.png'},
    {id:435,name:lang ==='ar' ? getTeamByCountry('Argentina','River Plate'):'River Plate',
        logo:'https://media.api-sports.io/football/teams/435.png'},
    {id:451,name:lang ==='ar' ? getTeamByCountry('Argentina','Boca Juniors'):'Boca Juniors',
        logo:'https://media.api-sports.io/football/teams/451.png'},
    {id:128,name:lang === 'ar' ? getTeamByCountry('Brazil','Santos'):'Santos',
        logo:'https://media.api-sports.io/football/teams/128.png'},
    {id:127,name:lang ==='ar' ? getTeamByCountry('Brazil','Flamengo'):'Flamengo',
        logo:'https://media.api-sports.io/football/teams/127.png'},
    {id:212,name:lang === 'ar' ? getTeamByCountry('Portugal','FC Porto'):'FC Porto',
        logo:'https://media.api-sports.io/football/teams/212.png'},
    {id:211,name:lang === 'ar' ? getTeamByCountry('Portugal','Benfica'):'Benfica',
        logo:'https://media.api-sports.io/football/teams/211.png'},
    {id:228,name:lang === 'ar' ? getTeamByCountry('Portugal','Sporting CP'):'Sporting CP',
        logo:'https://media.api-sports.io/football/teams/228.png'}
]

export default function Teams(){
    const [isVisible,setVisibility]=useState(true);
    const [screenWidth,setScreenWidth] = useState(0);

    useEffect(()=>{
        setScreenWidth(window.innerWidth);
        return () => {
            setScreenWidth(0);
        }
    })
return(
    <div>
        {/* <div className={`absolute ${isVisible ? 'flex':'hidden'} top-0 left-0 bg-slate-800 py-3 text-white text-center text-xl font-bold`}>{getTranslation('Teams',lang)}</div> */}
            <div className={`${isVisible ? 'flex':'hidden'} flex w-full h-fit flex-row flex-wrap gap-2 justify-between p-6 mb-8 ${screenWidth > 425 ? 'bg-white text-slate-800' : 'bg-slate-800 text-white'} 
            border-r border-l border-b border-slate-400 z-50 overflow-scroll`}>
                    {   teamsArray.map((team,index)=>{
                            return(
                                <a  href={`/teams/${team.id}`} 
                                    onClick={()=>setVisibility(!isVisible)}
                                    className='w-24 sm:w-44 flex-col sm:flex-row justify-center items-center' key={team.id}>
                                <div className='w-auto sm:w-44 flex-col sm:flex-row justify-center items-center' key={team.id}>
                                    <img className='size-8 sm:size-12 mx-auto' src={team.logo} alt={team.name} />
                                    <h3 className='w-28 sm:w-full font-bold text-center'>{team.name}</h3>
                                </div>
                                </a>
                            )
                        })
                    }
            </div>
    </div>
)
}