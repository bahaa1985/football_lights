import React, { useState,useEffect,useContext } from 'react';
import { TeamsContext } from './Fixture.js';
import PlayerStatsTable from './PlayerStatsTable.jsx';

function PlayerStats(props) {

    const homePlayers=props.statistics.home;
    const awayPlayers=props.statistics.away;
    const teams=useContext(TeamsContext);
    const homeTeam = teams.home;
    const awayTeam = teams.away;
    //set division of the clicked team ( in small screens)
    const [screenWidth,setScreenWidth] = useState(0);
    const [clickedTeam,setClickedTeam] = useState(null);

    useEffect(()=>{
            const handleResize = () => {
                setScreenWidth(window.innerWidth)
                if(screenWidth >=425){
                    setClickedTeam(null);
                }
                else{
                    setClickedTeam(homeTeam.id);
                }
            };
        
            window.addEventListener("resize", handleResize);
            
            // Cleanup function to remove event listener when component unmounts
            return () => window.removeEventListener("resize", handleResize);
        })

    let homeShots=[],homeGoals=[],homeConceded=[],homeAssists=[],homeSaves=[],homePasses=[],homeTackles=[],homeDuels=[],homeDribbles=[],
    homeDrawnFouls=[],homeCommittedFouls=[],homeYellowCards=[],homeRedCards=[];
    //
    let awayShots=[],awayGoals=[],awayConceded=[],awayAssists=[],awaySaves=[],awayPasses=[],awayTackles=[],awayDuels=[],awayDribbles=[],
    awayDrawnFouls=[],awayCommittedFouls=[],awayYellowCards=[],awayRedCards=[];    

    homePlayers?.map((elem)=>{
        if(elem.statistics[0].shots.total != null)
            homeShots.push({player:elem.player,shots:elem.statistics[0].shots})
        if(elem.statistics[0].goals.total != null)
            homeGoals.push({player:elem.player,goals:elem.statistics[0].goals.total});
        if(elem.statistics[0].goals.conceded > 0)
            homeConceded.push({player:elem.player,conceded:elem.statistics[0].goals.conceded});
        if(elem.statistics[0].goals.assists !== null && elem.statistics[0].goals.assists > 0)
            homeAssists.push({player:elem.player,assists:elem.statistics[0].goals.assists});
        if(elem.statistics[0].goals.saves !=  null)
            homeSaves.push({player:elem.player,saves:elem.statistics[0].goals.saves});
        if(elem.statistics[0].passes.total > 0)
            homePasses.push({player:elem.player,passes:elem.statistics[0].passes});
        if(elem.statistics[0].tackles.total !== null && elem.statistics[0].tackles.total > 0)
        homeTackles.push({player:elem.player,tackles:elem.statistics[0].tackles});
        if(elem.statistics[0].duels.total !== null && elem.statistics[0].duels.total > 0)
            homeDuels.push({player:elem.player,duels:elem.statistics[0].duels});
        if(elem.statistics[0].dribbles.attempts > 0)
            homeDribbles.push({player:elem.player,dribbles:elem.statistics[0].dribbles});
        if(elem.statistics[0].fouls.drawn != null)
            homeDrawnFouls.push({player:elem.player,fouls:elem.statistics[0].fouls.drawn});
        if(elem.statistics[0].fouls.committed != null)
            homeCommittedFouls.push({player:elem.player,fouls:elem.statistics[0].fouls.committed});
        if(elem.statistics[0].cards.yellow != null && elem.statistics[0].cards.yellow > 0)
            homeYellowCards.push({player:elem.player,cards:elem.statistics[0].cards.yellow});
        if(elem.statistics[0].cards.red != null && elem.statistics[0].cards.red > 0)
            homeRedCards.push({player:elem.player,cards:elem.statistics[0].cards.red});
    })
    //
    awayPlayers?.map((elem)=>{ 
        if(elem.statistics[0].shots.total != null)       
            awayShots.push({player:elem.player,shots:elem.statistics[0].shots})
        if(elem.statistics[0].goals.total != null)
            awayGoals.push({player:elem.player,goals:elem.statistics[0].goals.total});
        if(elem.statistics[0].goals.conceded > 0)
            awayConceded.push({player:elem.player,conceded:elem.statistics[0].goals.conceded});
        if(elem.statistics[0].goals.assists !== null && elem.statistics[0].goals.assists > 0)
            awayAssists.push({player:elem.player,assists:elem.statistics[0].goals.assists});
        if(elem.statistics[0].goals.saves > 0)
            awaySaves.push({player:elem.player,saves:elem.statistics[0].goals.saves});
        if(elem.statistics[0].passes.total > 0)
            awayPasses.push({player:elem.player,passes:elem.statistics[0].passes});
        if(elem.statistics[0].tackles.total !== null && elem.statistics[0].tackles.total > 0)
            awayTackles.push({player:elem.player,tackles:elem.statistics[0].tackles});
        if(elem.statistics[0].duels.total !== null && elem.statistics[0].duels.total > 0)
            awayDuels.push({player:elem.player,duels:elem.statistics[0].duels});
        if(elem.statistics[0].dribbles.attempts > 0)
            awayDribbles.push({player:elem.player,dribbles:elem.statistics[0].dribbles});
        if(elem.statistics[0].fouls.drawn != null)
            awayDrawnFouls.push({player:elem.player,fouls:elem.statistics[0].fouls.drawn});
        if(elem.statistics[0].fouls.committed != null)
            awayCommittedFouls.push({player:elem.player,fouls:elem.statistics[0].fouls.committed});
        if(elem.statistics[0].cards.yellow !=null && elem.statistics[0].cards.yellow > 0)
            awayYellowCards.push({player:elem.player,cards:elem.statistics[0].cards.yellow});
        if(elem.statistics[0].cards.red != null && elem.statistics[0].cards.red > 0)
            awayRedCards.push({player:elem.player,cards:elem.statistics[0].cards.red});
    })  
    // debugger;
    homeShots.sort((a,b)=>{return b.shots.total-a.shots.total})
    homeGoals.sort((a,b)=>{return b.goals.total-a.goals.total})
    homeConceded.sort((a,b)=>{return b.conceded-a.conceded})
    homeAssists.sort((a,b)=>{return b.assists-a.assists})
    homeSaves.sort((a,b)=>{return b.saves-a.saves})
    homePasses.sort((a,b)=>{return b.passes.total-a.passes.total})
    homeTackles.sort((a,b)=>{return b.tackles.total-a.tackles.total})
    homeDuels.sort((a,b)=>{return b.duels.total-a.duels.total})
    homeDribbles.sort((a,b)=>{return b.dribbles.attempts-a.dribbles.attempts})
    homeDrawnFouls.sort((a,b)=>{return b.fouls-a.fouls})
    homeCommittedFouls.sort((a,b)=>{return b.fouls-a.fouls})
    homeYellowCards.sort((a,b)=>{return b.cards-a.cards})
    homeRedCards.sort((a,b)=>{return b.cards-a.cards})
    //
    awayShots.sort((a,b)=>{return b.shots.total-a.shots.total})
    awayGoals.sort((a,b)=>{return b.goals.total-a.goals.total})
    awayConceded.sort((a,b)=>{return b.conceded-a.conceded})
    awayAssists.sort((a,b)=>{return b.assists-a.assists})
    awaySaves.sort((a,b)=>{return b.saves-a.saves})
    awayPasses.sort((a,b)=>{return b.passes.total-a.passes.total})
    awayTackles.sort((a,b)=>{return b.tackles.total-a.tackles.total})
    awayDuels.sort((a,b)=>{return b.duels.total-a.duels.total})
    awayDribbles.sort((a,b)=>{return b.dribbles.attempts-a.dribbles.attempts})
    awayDrawnFouls.sort((a,b)=>{return b.fouls-a.fouls})
    awayCommittedFouls.sort((a,b)=>{return b.fouls-a.fouls})
    awayYellowCards.sort((a,b)=>{return b.cards-a.cards})
    awayRedCards.sort((a,b)=>{return b.cards-a.cards})

   
    // console.log('home drawn:',awayDrawnFouls);
    function renderStats(source, statKey, statSubKey=null){
        return(
        <div className={`${clickedTeam !== null ? 'w-full': 'w-[45%]'}`}>
            {
                source?.map((elem) => {
                    // if (elem[statKey][statSubKey] !== null)
                        return (
                            <div className={`flex ${statKey === 'passes' ? 'flex-col items-start' : 'flex-row  items-center'} 
                                            mx-auto px-2 justify-between space-x-2 w-[80%] 
                                            ${source.length > 1 ? 'border-b-[1px] border-solid border-slate-400' : ''}`}>
                                {/* Player's name and photo */}
                                <div className = "flex flex-row space-x-2 items-center">
                                    <img className='w-10 h-10 rounded-full' loading='lazy' src={elem.player.photo} alt={elem.player.name} />
                                    <span className='border-none font-semibold'>{elem.player.name}</span>
                                </div>
                                {/* player's statistics */}
                                <div>
                                    <span className='border-none'>
                                    {
                                        statKey !== 'passes' && statKey !== 'shots' ?
                                            (statSubKey !== null ? elem[statKey][statSubKey] : elem[statKey])
                                        : statKey === 'passes' ?
                                            `Total: ${elem.passes.total} - Key: ${elem.passes.key === null ? 0 : elem.passes.key} - Accuracy: ${elem.passes.accuracy}`
                                        : statKey === 'shots' ?
                                            `${elem.shots.total} (${elem.shots.on === null ? 0 : elem.shots.on})`
                                        : null
                                    }
                                    </span>
                                </div>                                                                                        
                            </div>
                        )
                })
            }
        </div>)
    }
    
    const renderPlayerStats = (title, homeStats, awayStats, statKey, statSubKey=null) => {
        return (
            <div className='w-full mx-auto text-center'>
                <h3 className='w-full bg-slate-900 text-slate-50 font-bold'>{title}</h3>
                {
                    clickedTeam === null ?
                    <div className='flex justify-between'>
                        {/* Home Team division */}
                        {renderStats(homeStats, statKey, statSubKey=null)}
                        {/* Away team division */}
                        {renderStats(awayStats, statKey, statSubKey=null)}                    
                    </div>
                    :clickedTeam === homeTeam.id ?
                        renderStats(homeStats, statKey, statSubKey=null)
                    :renderStats(awayStats, statKey, statSubKey=null)
                }
            </div>
        );
    };

    return (
        <div className='w-full mx-auto'>
            <div className='w-full flex flex-row justify-around bg-slate-800'>
                <div className='flex flex-row space-x-2 items-center w-1/2'>
                    <img className='w-14 h-14 rounded-full' src={teams.home.logo} alt={teams.home.name} />
                    <span className='border-none text-slate-50 font-bold'>{teams.home.name}</span>
                </div>
                <div className='flex flex-row-reverse space-x-2 items-center w-1/2'>
                    <img className='w-14 h-14 rounded-full' src={teams.away.logo} alt={teams.away.name} />
                    <span className='border-none text-slate-50 font-bold'>{teams.away.name}</span>
                </div>
            </div>
            {renderPlayerStats('Shots (On Goal)', homeShots, awayShots, 'shots', 'total')}
            {renderPlayerStats('Goals Scored', homeGoals, awayGoals,'goals')}
            {renderPlayerStats('Goals Conceded', homeConceded, awayConceded, 'conceded')}
            {renderPlayerStats('Saves', homeSaves, awaySaves, 'saves')}
            {renderPlayerStats('Assists',homeAssists, awayAssists, 'assists')}
            {renderPlayerStats('Passes', homePasses, awayPasses, 'passes', 'total')}
            {renderPlayerStats('Tackles', homeTackles, awayTackles, 'tackles', 'total')}
            {renderPlayerStats('Duels', homeDuels, awayDuels, 'duels', 'total')}
            {renderPlayerStats('Dribbles', homeDribbles, awayDribbles, 'dribbles', 'attempts')}
            {renderPlayerStats('Fouls Drawn', homeDrawnFouls, awayDrawnFouls, 'fouls')}
            {renderPlayerStats('Fouls Committed', homeCommittedFouls, awayCommittedFouls, 'fouls')}
            {renderPlayerStats('Yellow Cards', homeYellowCards, awayYellowCards, 'cards')}
            {renderPlayerStats('Red Cards', homeRedCards, awayRedCards, 'cards')}
            {/* Add more calls to renderPlayerStats for other statistics as needed */}
        </div>
    );
}

export default PlayerStats;