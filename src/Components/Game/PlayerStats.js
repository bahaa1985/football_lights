import React, { useState,useEffect,useContext } from 'react';
// import { TeamsContext } from './Game.js';

function PlayerStats(props) {

    const homePlayers=props.statistics.home;
    const awayPlayers=props.statistics.away;
    // const teams=useContext(TeamsContext);

    let homeShots=[],homeGoals=[],homePasses=[],homeTackles=[],homeDuels=[],homeDribbles=[],
    homeDrawnFouls=[],homeCommittedFouls=[],homeYellowCards=[],homeRedCards=[];
    //
    let awayShots=[],awayGoals=[],awayPasses=[],awayTackles=[],awayDuels=[],awayDribbles=[],
    awayDrawnFouls=[],awayCommittedFouls=[],awayYellowCards=[],awayRedCards=[];

    console.log(homePlayers);
    // console.log('teams',teams);
    

    homePlayers?.map((elem)=>{
        homeShots.push({player:elem.player,shots:elem.statistics[0].shots})
        homeGoals.push({player:elem.player,goals:elem.statistics[0].goals});
        homePasses.push({player:elem.player,passes:elem.statistics[0].passes});
        homeTackles.push({player:elem.player,tackles:elem.statistics[0].tackles});
        homeDuels.push({player:elem.player,duels:elem.statistics[0].duels});
        homeDribbles.push({player:elem.player,dribbles:elem.statistics[0].dribbles});
        homeDrawnFouls.push({player:elem.player,fouls:elem.statistics[0].fouls.drawn});
        homeCommittedFouls.push({player:elem.player,fouls:elem.statistics[0].fouls.committed});
        homeYellowCards.push({player:elem.player,cards:elem.statistics[0].cards.yellow});
        homeRedCards.push({player:elem.player,cards:elem.statistics[0].cards.red});
    })
    //
    awayPlayers?.map((elem)=>{
        awayShots.push({player:elem.player,shots:elem.statistics[0].shots})
        awayGoals.push({player:elem.player,goals:elem.statistics[0].goals});
        awayPasses.push({player:elem.player,passes:elem.statistics[0].passes});
        awayTackles.push({player:elem.player,tackles:elem.statistics[0].tackles});
        awayDuels.push({player:elem.player,duels:elem.statistics[0].duels});
        awayDribbles.push({player:elem.player,dribbles:elem.statistics[0].dribbles});
        awayDrawnFouls.push({player:elem.player,fouls:elem.statistics[0].fouls.drawn});
        awayCommittedFouls.push({player:elem.player,fouls:elem.statistics[0].fouls.committed});
        awayYellowCards.push({player:elem.player,cards:elem.statistics[0].cards.yellow});
        awayRedCards.push({player:elem.player,cards:elem.statistics[0].cards.red});
    })

    homeShots.sort((a,b)=>{return b.shots.total-a.shots.total})
    homeGoals.sort((a,b)=>{return b.goals.total-a.goals.total})
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
    awayPasses.sort((a,b)=>{return b.passes.total-a.passes.total})
    awayTackles.sort((a,b)=>{return b.tackles.total-a.tackles.total})
    awayDuels.sort((a,b)=>{return b.duels.total-a.duels.total})
    awayDribbles.sort((a,b)=>{return b.dribbles.attempts-a.dribbles.attempts})
    awayDrawnFouls.sort((a,b)=>{return b.fouls-a.fouls})
    awayCommittedFouls.sort((a,b)=>{return b.fouls-a.fouls})
    awayYellowCards.sort((a,b)=>{return b.cards-a.cards})
    awayRedCards.sort((a,b)=>{return b.cards-a.cards})

   
    console.log('home drawn:',awayDrawnFouls);
    
    return ( 
        <div>
            <div>
            <div>
                {/* <div>
                    <img src={teams.home.logo} alt={teams.home.name} />
                    <span>{teams.home.name}</span>
                </div>
                <div>
                    <img src={teams.away.logo} alt={teams.away.name} />
                    <span>{teams.away.name}</span>
                </div> */}
            </div>
            <h3>Shots</h3>
            <div>
                <div>
                    <div>
                        {
                         homeShots?.map((elem)=>{
                            if(elem.shots.total !== null)
                             return <p>{elem.player.name} - {elem.shots.total}</p>
                         })   
                        }
                    </div>
                </div>
                <div>
                    <div>
                        {
                            awayShots?.map((elem)=>{
                                if(elem.shots.total !== null)
                                return <p>{elem.player.name} - {elem.shots.total}</p>
                            })   
                        }
                    </div>
                </div>
            </div>
            
                <div></div>
            </div>
        </div>
     );
}

export default PlayerStats;