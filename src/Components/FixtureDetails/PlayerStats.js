import React, { useState,useEffect,useContext } from 'react';
import { TeamsContext } from './Fixture.js';
import PlayerStatsTable from './PlayerStatsTable.jsx';

function PlayerStats(props) {

    const homePlayers=props.statistics.home;
    const awayPlayers=props.statistics.away;
    const teams=useContext(TeamsContext);

    let homeShots=[],homeGoals=[],homeConceded=[],homeAssists=[],homeSaves=[],homePasses=[],homeTackles=[],homeDuels=[],homeDribbles=[],
    homeDrawnFouls=[],homeCommittedFouls=[],homeYellowCards=[],homeRedCards=[];
    //
    let awayShots=[],awayGoals=[],awayConceded=[],awayAssists=[],awaySaves=[],awayPasses=[],awayTackles=[],awayDuels=[],awayDribbles=[],
    awayDrawnFouls=[],awayCommittedFouls=[],awayYellowCards=[],awayRedCards=[];

    console.log('teams',teams);
    

    homePlayers?.map((elem)=>{
        if(elem.statistics[0].shots.total != null)
            homeShots.push({player:elem.player,shots:elem.statistics[0].shots})
        if(elem.statistics[0].goals.total != null)
            homeGoals.push({player:elem.player,goals:elem.statistics[0].goals.total});
        if(elem.statistics[0].goals.conceded != null)
            homeConceded.push({player:elem.player,goals:elem.statistics[0].goals.conceded});
        if(elem.statistics[0].goals.assists != null)
            homeAssists.push({player:elem.player,assists:elem.statistics[0].goals.assists});
        if(elem.statistics[0].goals.saves !=  null)
            homeSaves.push({player:elem.player,saves:elem.statistics[0].goals.saves});
        if(elem.statistics[0].passes.total != null)
            homePasses.push({player:elem.player,passes:elem.statistics[0].passes});
        homeTackles.push({player:elem.player,tackles:elem.statistics[0].tackles});
        if(elem.statistics[0].duels.total != null)
            homeDuels.push({player:elem.player,duels:elem.statistics[0].duels});
        if(elem.statistics[0].dribbles.attempts != null)
            homeDribbles.push({player:elem.player,dribbles:elem.statistics[0].dribbles});
        if(elem.statistics[0].fouls.drawn != null)
            homeDrawnFouls.push({player:elem.player,fouls:elem.statistics[0].fouls.drawn});
        if(elem.statistics[0].fouls.committed != null)
            homeCommittedFouls.push({player:elem.player,fouls:elem.statistics[0].fouls.committed});
        if(elem.statistics[0].cards.yellow != null)
            homeYellowCards.push({player:elem.player,cards:elem.statistics[0].cards.yellow});
        if(elem.statistics[0].cards.red != null)
            homeRedCards.push({player:elem.player,cards:elem.statistics[0].cards.red});
    })
    //
    awayPlayers?.map((elem)=>{ 
        if(elem.statistics[0].shots.total != null)       
            awayShots.push({player:elem.player,shots:elem.statistics[0].shots})
        if(elem.statistics[0].goals.total != null)
            awayGoals.push({player:elem.player,goals:elem.statistics[0].goals});
        if(elem.statistics[0].goals.conceded != null)
            awayConceded.push({player:elem.player,goals:elem.statistics[0].goals.conceded});
        if(elem.statistics[0].goals.assists != null)
            awayAssists.push({player:elem.player,goals:elem.statistics[0].goals.assists});
        if(elem.statistics[0].goals.saves != null)
            awaySaves.push({player:elem.player,goals:elem.statistics[0].goals.saves});
        if(elem.statistics[0].passes.total != null)
            awayPasses.push({player:elem.player,passes:elem.statistics[0].passes});
        if(elem.statistics[0].tackles.total != null)
            awayTackles.push({player:elem.player,tackles:elem.statistics[0].tackles});
        if(elem.statistics[0].duels.total != null)
            awayDuels.push({player:elem.player,duels:elem.statistics[0].duels});
        if(elem.statistics[0].dribbles.attempts != null)
            awayDribbles.push({player:elem.player,dribbles:elem.statistics[0].dribbles});
        if(elem.statistics[0].fouls.drawn != null)
            awayDrawnFouls.push({player:elem.player,fouls:elem.statistics[0].fouls.drawn});
        if(elem.statistics[0].fouls.committed != null)
            awayCommittedFouls.push({player:elem.player,fouls:elem.statistics[0].fouls.committed});
        if(elem.statistics[0].cards.yellow !=null)
            awayYellowCards.push({player:elem.player,cards:elem.statistics[0].cards.yellow});
        if(elem.statistics[0].cards.red != null)
            awayRedCards.push({player:elem.player,cards:elem.statistics[0].cards.red});
    })

    console.log("home goals",homeGoals);    
    debugger;
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
    
    const renderPlayerStats = (title, homeStats, awayStats, statKey, statSubKey) => {
        return (
            <div>
                <h3>{title}</h3>
                <div className='flex justify-around'>
                    <div>
                        {
                            homeStats?.map((elem) => {
                                if (elem[statKey][statSubKey] !== null)
                                    return (
                                        <div className='flex flex-row space-x-2 items-center'>
                                            <img className='w-10 h-10 rounded-full' loading='lazy' src={elem.player.photo} alt={elem.player.name} />
                                            <span className='border-none font-bold'>{elem.player.name} - {elem[statKey][statSubKey]}</span>
                                        </div>
                                    )
                            })
                        }
                    </div>
                    <div>
                        {
                            awayStats?.map((elem) => {
                                if (elem[statKey][statSubKey] !== null)
                                    return (
                                        <div className='flex flex-row-reverse space-x-2 items-center'>
                                            <img className='w-10 h-10 rounded-full' loading='lazy' src={elem.player.photo} alt={elem.player.name} />
                                            <span className='border-none font-bold'>{elem.player.name} - {elem[statKey][statSubKey]}</span>
                                        </div>
                                    )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className='flex flex-row justify-around bg-slate-800'>
                <div className='flex flex-row space-x-2 items-center'>
                    <img className='w-14 h-14 rounded-full' src={teams.home.logo} alt={teams.home.name} />
                    <span className='border-none text-slate-50 font-bold'>{teams.home.name}</span>
                </div>
                <div className='flex flex-row-reverse space-x-2 items-center'>
                    <img className='w-14 h-14 rounded-full' src={teams.away.logo} alt={teams.away.name} />
                    <span className='border-none text-slate-50 font-bold'>{teams.away.name}</span>
                </div>
            </div>
            {renderPlayerStats('Shots (On Goal)', homeShots, awayShots, 'shots', 'total')}
            {renderPlayerStats('Goals Scored', homeGoals, awayGoals, 'goals', 'total')}
            {renderPlayerStats('Goals Conceded', homeGoals, awayGoals, 'goals', 'conceded')}
            {/* Add more calls to renderPlayerStats for other statistics as needed */}
        </div>
    );
}

export default PlayerStats;