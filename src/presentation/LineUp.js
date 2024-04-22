import React from 'react'
import { useState,useEffect } from 'react'
import getLineUps from '../api/getLineUp.js'
import getPlayers from '../api/getPlayers.js';
import getEvents from '../api/getEvents.js';
// import Player from './Player';
import '../styles/lineup.css';
import goal from '../images/goal.png'
import red from '../images/red.png'
import yellow from '../images/yellow.png'


function PlayerPosition(props){
           const lineup=props.lineup;
           const grid=props.grid.toString(); 
   
           const sp_lineup=lineup.filter((player)=>player.player.grid[0]===grid)
                .sort((playerA,playerB)=>parseInt(playerB.player.grid[2]) - parseInt(playerA.player.grid[2]))                      
             console.log("sp",sp_lineup)          
            let playerNameArr=[],playerName="";           
            return(
                <>
                    {                    
                        sp_lineup.map((player,index)=>{
                            playerNameArr=player.player.name.split(' ');
                            playerNameArr.length> 1 ? playerName= playerNameArr.slice(1) : playerName= playerNameArr[0];
                            return(
                            <div key={index} className='player-card' >                                                                                                                                                  
                                <span className="player-rating" style={{ backgroundColor:player.statistics[0].games.ratingColor}}>
                                    {player.statistics[0].games.rating}
                                </span>                                
                                    {/* {                                        
                                        player.statistics[0].goals.total > 0 ? 
                                            <img  alt='' className='player-action' src={goal}></img>:
                                        player.statistics[0].cards.red > 0 ?
                                            <img alt='' className='player-action' src={red}></img>:
                                        player.statistics[0].cards.yellow > 0 ?
                                        <img alt='' className='player-action' src={yellow}></img>:
                                        // player.statistics[0].
                                        null
                                    } */}
                                                                
                                <img className='player-photo' src={player.player.photo} alt=""></img>
                                <div className='player-info'>
                                    <span className='player-number'>{player.player.number}</span>
                                    <span className='player-name'>
                                        {
                                            playerNameArr.length> 1 ?
                                            playerNameArr.slice(1) :
                                            playerNameArr[0]
                                        }
                                    </span> 
                                </div>
                                                                                                                                                                                                                                                            
                            </div>
                            )
                        })                       
                    }
                </>
            )
                                                   
}

function LineUp(props){
    const homeId=props.teams[0];
    const awayId=props.teams[1];
    const fixtureId=props.fixture;
    console.log("line up props:",props);
    const [homeTeam,setHomeTeam]=useState("");
    const [awayTeam,setAwayTeam]=useState("");
    const [homeLineUp,setHomeLineUp]=useState([]);
    const [homeFormation,setHomeFormation]=useState([]);
    const [awayLineUp,setAwayLineUp]=useState([]);
    const [awayFormation,setAwayFormation]=useState([]);
    const [homePlayers,setHomePlayers] =useState([]);   
    const [awayPlayers,setAwayPlayers] =useState([]);
    const [homeCoach,setHomeCoash]=useState({})
    const [awayCoach,setAwayCoash]=useState({})
    const [homeSub,setHomeSub]=useState([])
    const [awaySub,setAwaySub]=useState([]);
    // const [homeEvents,setHomeEvents]=useState([]);
    // const [awayEvents,setAwayEvents]=useState([]);
    let [clickedTeam,setClickedTeam]=useState("");   
    
    useEffect(()=>{ // call formation and line up players:
        getLineUps(fixtureId).then((result)=>{
            console.log("line up:",result);
            setHomeLineUp(result.data.response[0].startXI);
            setHomeFormation(Array.from(result.data.response[0].formation.replaceAll('-','')));
            setHomeTeam(result.data.response[0].team.name);
            setHomeCoash(result.data.response[0].coach)  
            setHomeSub(result.data.response[0].substitutes) 
            setAwayLineUp(result.data.response[1].startXI);
            setAwayFormation(Array.from(result.data.response[1].formation.replaceAll('-','')));
            setAwayTeam(result.data.response[1].team.name);                                           
            setAwayCoash(result.data.response[1].coach)           
            setAwaySub(result.data.response[1].substitutes) 
        })        

        getPlayers(fixtureId).then((result)=>{
            setHomePlayers(result.data.response[0].players);
            setAwayPlayers(result.data.response[1].players);
        });   
        
    //     getEvents(fixtureId).then((result)=>{
    //         setHomeEvents(result.data.response.filter(event=>event.team.id===homeId))   
    //     })
    //     getEvents(fixtureId).then((result)=>{
    //         setAwayEvents(result.data.response.filter(event=>event.team.id===awayId))   
    //     });
    },[homeId,awayId,fixtureId]);

    homeLineUp.forEach((player,index)=>{
        homePlayers.forEach((home_player,index)=>{
            if(player.player.id===home_player.player.id)
            {
                player.player.photo=home_player.player.photo;
                player.statistics=home_player.statistics; 
                if(player.statistics[0].games.rating>=0 && player.statistics[0].games.rating<5) 
                    {player.statistics[0].games.ratingColor='red'}
                else if(player.statistics[0].games.rating>=5 && player.statistics[0].games.rating<7)
                    {player.statistics[0].games.ratingColor='orange'}
                else if(player.statistics[0].games.rating>=7 && player.statistics[0].games.rating<9)
                    {player.statistics[0].games.ratingColor='green'}
                else if(player.statistics[0].games.rating>=9)
                    {player.statistics[0].games.ratingColor='blue'}
            }            
        })           
    })

    awayLineUp.forEach((player,index)=>{
        awayPlayers.forEach((away_player,index)=>{
            if(player.player.id===away_player.player.id)
            {
                player.player.photo=away_player.player.photo;
                player.statistics=away_player.statistics;
                if(player.statistics[0].games.rating>=0 && player.statistics[0].games.rating<5) 
                    {player.statistics[0].games.ratingColor='red'}
                else if(player.statistics[0].games.rating>=5 && player.statistics[0].games.rating<7)
                    {player.statistics[0].games.ratingColor='orange'}
                else if(player.statistics[0].games.rating>=7 && player.statistics[0].games.rating<9)
                    {player.statistics[0].games.ratingColor='green'}
                else if(player.statistics[0].games.rating>=9)
                    {player.statistics[0].games.ratingColor='blue'}                     
            }                
        }) 
    })    

    //get events:
//    useEffect(()=>{
//        getEvents(fixtureId).then((result)=>{
//             setHomeEvents(result.data.response.filter(event=>event.team.id===homeId))   
//         })
//         getEvents(fixtureId).then((result)=>{
//             setAwayEvents(result.data.response.filter(event=>event.team.id===awayId))   
//         })
       
//    },[fixtureId])

//     console.log("homeEvents:",homeEvents);
// console.log("awayEvents:",awayEvents);
    // console.log('Home:',homeSub);
    // console.log('Away:',awayCoach);
    // eslint-disable-next-line no-unused-vars

    
    let playerNameArr=[],playerName="";  
    return(    
        <div>                   
            <div style={{display:'flex',justifyContent:'center',width:'50%',margin:'auto'}}>
                <button onClick={()=>setClickedTeam("home")}>{homeTeam}</button>
                <button onClick={()=>setClickedTeam("away")}>{awayTeam}</button>
            </div>
           
                {                    
                    clickedTeam==="home"?
                    <>
                        <div>Formation: {homeFormation.join('-')}</div>
                        <div className='scoresheet'>                            
                            <div className='pitch'>
                                <div className='line' key={1} >                                   
                                <PlayerPosition lineup={homeLineUp}  grid={"1"}/>
                                </div>
                                
                                <div className='line' key={2} >                                    
                                    <PlayerPosition lineup={homeLineUp} grid={"2"} />                                    
                                </div>
                                
                                <div className='line' key={3} >                                    
                                    <PlayerPosition lineup={homeLineUp} grid={"3"} />                                   
                                </div>
                                
                                <div className='line' key={4}>                                    
                                    <PlayerPosition lineup={homeLineUp} grid={"4"} />                                   
                                </div>
                                {
                                    homeFormation.length>3 ?
                                    <div className='line' key={5} >                                   
                                        <PlayerPosition lineup={homeLineUp} grid={"5"} />                                   
                                    </div>:null
                                }                            
                            </div>
                            <div className='bench'>
                                <div className='coach'>
                                    <img alt='' src={homeCoach.photo}/>                                    
                                    <span>Coach: {homeCoach.name}</span>
                                </div>
                                {/*  */}
                                <div className='substitues'>
                                {
                                    homeSub.map((sub)=>{
                                        // eslint-disable-next-line no-lone-blocks
                                        {
                                            playerNameArr=sub.player.name.split(' ');
                                            playerNameArr.length> 1 ? playerName= playerNameArr.slice(1) : playerName= playerNameArr[0];
                                        }
                                        return(
                                            <div>
                                                <span className='player-number'>{sub.player.number}</span>
                                                <span className='player-name'>
                                                {
                                                    playerNameArr.length> 1 ?
                                                    playerNameArr.slice(1) :
                                                    playerNameArr[0]
                                                }
                                                </span> 
                                                <span>{sub.player.pos}</span>                                                                                            
                                                <span>
                                                    {

                                                    }
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            </div>
                           
                        </div> 
                        
                    </>
                                                                    
                :

                clickedTeam==="away"? 
                <>
                    <div>Formation: {awayFormation.join('-')}</div> 
                    <div className='scoresheet'>
                        <div className='pitch'> 
                            <div className='line' key={1} > 
                                <PlayerPosition lineup={awayLineUp}  grid={"1"}/>
                            </div>
                            
                            <div className='line' key={2}>                                    
                                <PlayerPosition lineup={awayLineUp} grid={"2"} />                                    
                            </div>
                            
                            <div className='line' key={3} >                                    
                                <PlayerPosition lineup={awayLineUp} grid={"3"} />                                   
                            </div>
                            
                            <div className='line' key={4} >                                    
                                <PlayerPosition lineup={awayLineUp} grid={"4"} />                                   
                            </div>
                            {
                                awayFormation.length > 3 ? 
                                    <div className='line' key={5} >                                   
                                        <PlayerPosition lineup={awayLineUp} grid={"5"} />                                   
                                    </div>
                                :null
                            }                   
                        </div>
                        <div className='bench'>
                                <div className='coach'>
                                    <img alt='' src={awayCoach.photo}/>                                    
                                    <span>Coach: {awayCoach.name}</span>
                                </div>
                                {/*  */}
                                <div className='substitues'>
                                {
                                    awaySub.map((sub)=>{                                        
                                        playerNameArr=sub.player.name.split(' ')
                                        playerNameArr.length> 1 ? playerName= playerNameArr.slice(1) : playerName= playerNameArr[0]                                        
                                        
                                        return(
                                            <div>
                                                <span className='player-number'>{sub.player.number}</span>
                                                <span className='player-name'>
                                                {
                                                    // playerNameArr.length> 1 ?
                                                    // playerNameArr.slice(1) :
                                                    // playerNameArr[0]
                                                    playerName
                                                    // sub.player.id
                                                }
                                                </span> 
                                                <span>{sub.player.pos}</span>                                                                                            
                                                <span>
                                                    {
                                                        //event:

                                                    }
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            </div>
                    </div>
                    
                </>                                          
                :
                null  
            }
        </div>
    )
}

export default LineUp
