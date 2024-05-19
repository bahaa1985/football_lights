import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayerStats } from '../Api/getPlayerProfile.js';

function Player(props) {
    const season=props.season;
    const [playerStats,setPlayerStats]=useState([]); 
    const [index,setIndex]=useState(0);
    const params =useParams();
    
    useEffect(()=>{
        getPlayerStats(params.playerId,season)
        .then((result)=>{
            setPlayerStats(result.data.response[0]);   
        });               
       
    },[params.playerId,season])   
    
    // console.log("player",playerStats);

    function func(){
        let arr=[]
        Object.entries(playerStats.statistics[0]).map((elem,index)=>{
            elem.map((elem,index)=>{
                arr.push(elem);
            })
        })
        return  arr
    }
    // function iter(){
    //     let arr=[];
    //     func().map((elem,index)=>{
    //         elem.map((elem,index)=>{
    //             arr.push(elem);
    //         })
    //     })
    //     return  arr
    // }
    function fff(){
        Object.entries(func()).map((element,index) => {
            console.log(element[0],element[1]);
        });      
    }
    // console.log("func all",func());
    // console.log("iter",iter());
    // console.log("fff",fff());


    return ( 
        <div>
            <div>
                <h2>{playerStats?.player?.name}</h2>
                <img src={playerStats?.player?.photo} alt={playerStats?.player?.name}/>
                <select onChange={(e)=>setIndex(parseInt(e.target.value))}>
                {
                    playerStats?.statistics?.map((item,index)=>{                  
                        return(                                
                            <option key={index}  value={index}><div>{item.league.name}<img src={item.league.flag} alt={item.league.name}/></div></option>
                        )
                    })
                }
                </select>
               
            </div>
            <div>
                {
                    playerStats?.statistics? 
                    Object.entries(func()).map((element,index) => {
                        // console.log(element[0],element[1]);
                        
                        return(
                            index > 3 ?
                            <div key={index}>
                                {
                                    index % 2 === 0 ?
                                    <p>{element[1][0].toUpperCase()+element[1].slice(1)}</p>
                                    : 
                                    <div>
                                        {
                                            element.map((elem,index)=>{
                                                return(
                                                    Object.entries(elem).map((ele,index)=>{
                                                      
                                                        // console.log("ele ele",ele)
                                                        
                                                        return(
                                                            <div key={index}> 
                                                            {
                                                                isNaN(ele[0]) ?
                                                                <>
                                                                    <span>{ele[0][0].toUpperCase()+ele[0].slice(1)}</span>
                                                                    {
                                                                        ele[1] === null ?   <span>NA</span> :   <span>{ele[1]}</span>
                                                                    }
                                                                  
                                                                </>
                                                                :null
                                                            }                                                                                                              
                                                            </div>                                                    
                                                        )
                                                      
                                                    })
                                                )
                                            })
                                        }
                                    </div>
                                }
                                {/* <span>{element[1][1]}</span><span></span> */}
                            </div>
                            :null
                        )
                        
                    })
                    
                    // [func(),iter(),
                    // fff().map((elem,index)=>{
                    //     return (
                    //         <div>
                    //             <div>{elem}</div>
                    //         </div>
                    //     )
                    // })]
                    :null
                }
                {/* <div id="games">
                    <h4>Games</h4>
                    {
                        playerStats.statistics?
                        <>
                        <p><span>Appearences</span><span>{playerStats.statistics[index].games.appearences}</span></p>
                        <p><span>Lineups</span><span>{playerStats?.statistics[index].games.lineups}</span></p>
                        <p><span>Minutes</span><span>{playerStats?.statistics[index].games.minutes}</span></p>
                        {
                            playerStats.statistics[index].games.number != null ?
                            playerStats.statistics[index].games.number
                            :null
                        }
                        <p><span>Rating</span><span>{playerStats?.statistics[index]?.games?.rating}</span></p> 
                        </>
                        :null
                    }
                                                           
                                                                                                           
                </div>
                <div id="substitutes">
                    <h4>Substitutes</h4>
                    {                        
                        playerStats.statistics?  
                        <>
                            <p><span>In</span><span>{playerStats?.statistics[index]?.substitutes?.in}</span></p>
                            <p><span>Out</span><span>{playerStats?.statistics[index]?.substitutes?.out}</span></p>
                            <p><span>Bench</span><span>{playerStats?.statistics[index]?.substitutes?.bench}</span></p>
                        </>
                        :null
                    }
                   
                </div>
                <div id="Shots">                 
                    <h4>Shots</h4>
                    {                        
                        playerStats.statistics?
                        <>
                            <p><span>Total</span><span>{playerStats?.statistics[index]?.shots?.total}</span></p>
                            <p><span>on</span><span>{playerStats?.statistics[index]?.shots?.on}</span></p>                        
                        </>
                        :null
                    }
                </div>
                <div id="Goals">
                    <h4>Goals</h4>
                    {                        
                        playerStats.statistics?
                        <>
                            <p><span>Total</span><span>{playerStats.statistics[index].goals.total}</span></p>
                            {

                            }
                            <p><span>Conceded</span><span>{playerStats.statistics[index].goals.conceded}</span></p>                        
                            <p><span>Assists</span><span>{playerStats.statistics[index].goals.assists}</span></p>
                            <p><span>Saves</span><span>{playerStats.statistics[index].goals.saves}</span></p>
                        </>
                        :null
                    }
                </div>
                <div id="passes">
                    <h4>Passes</h4>
                    {
                        playerStats.statistics?
                        <>
                            <p><span>Total</span><span>{playerStats.statistics[index].passes.total}</span></p>
                            <p><span>Key</span><span>{playerStats.statistics[index].passes.key}</span></p>
                            <p><span>Accuracy</span><span>{playerStats.statistics[index].passes?.accuracy}</span></p>                         
                        </>
                        :null
                    }
                </div>
                <div id="tackles">
                    <h4>Tackles</h4>
                    {
                        playerStats.statistics?
                        <>
                            <p><span>Total</span><span>{playerStats.statistics[index].tackles.total}</span></p>
                            <p><span>Blocks</span><span>{playerStats.statistics[index].tackles.blocks}</span></p>
                            <p><span>Interceptions</span><span>{playerStats.statistics[index].tackles.interceptions}</span></p>
                        </>
                        :null
                    }

                </div>
                <div id="duels">
                    <h4>Duels</h4>
                    {
                        playerStats.statistics?
                        <>
                            {
                                playerStats.statistics[index].duels.total != null ?
                                <p><spna>Total</spna><span>{playerStats.statistics[index].duels.total}</span></p>
                                :null
                            }
                            {
                                playerStats.statistics[index].duels.won !=null ?
                                <p><span>Won</span><span>{playerStats.statistics[index].duels.won}</span></p>
                                :null
                            }                                                       
                        </>
                        :null
                    }
                </div>
                <div id="dribbles">
                    <h4>Dribbles</h4>
                    {
                        playerStats.statistics?
                        <>
                            <p><span>Attempts</span><span>{playerStats.statistics[index].dribbles.attempts}</span></p>
                            <p><span>Success</span><span>{playerStats.statistics[index].dribbles.success}</span></p>
                            {
                                playerStats.statistics[index].dribbles.past !=null ?
                                <p><span>Past</span><span>{playerStats.statistics[index].dribbles.past}</span></p>
                                :null
                            }
                        </>
                        :null
                    }
                </div>
                <div id="fouls">
                    <h4>Fouls</h4>
                    {
                        playerStats.statistics?
                        <>
                            <p><span>Drawn</span><span>{playerStats.statistics[index].fouls.drawn}</span></p>
                            <p><span>Committed</span><span>{playerStats.statistics[index].fouls.committed}</span></p>
                        </>
                        :null
                    }
                </div>
                <div id="cards">
                    <h4>Cards</h4>
                    {
                        playerStats.statistics?
                        <>
                            <p><span>Yellow</span><span>{playerStats.statistics[index].cards.yellow}</span></p>
                            <p><span>Yellow Red</span><span>{playerStats.statistics[index].cards.yellowred}</span></p>
                            <p><span>Red</span><span>{playerStats.statistics[index].cards.red}</span></p>

                        </>
                        :null
                    }
                </div>
                <div id="penalty">
                    <h4>Penalty</h4>
                    {
                        playerStats.statistics?
                        <>
                            <p><span>Won</span><span>{playerStats.statistics[index].penalty.won}</span></p>
                            {
                               playerStats.statistics[index].penalty.commited !=null ?
                                <p><span>Commited</span>{playerStats.statistics[index].penalty.commited}<span></span></p>
                                :null
                            }
                            <p><span>Scored</span><span>{playerStats.statistics[index].scored}</span></p>
                            <p><span>Missed</span><span>{playerStats.statistics[index].penalty.missed}</span></p>
                            {
                                playerStats.statistics[index].penalty.saved !=null ? 
                                <p><span>Saved</span><span>{playerStats.statistics[index].penalty.saved}</span></p>
                                : null
                            }
                        </>
                        :null
                    }

                </div> */}
                {
                    // playerStats.statistics ?                    
                    // Object.entries(playerStats.statistics[index])
                    // .map((item,ind)=>{
                    //     return(
                    //         <div>
                    //         {
                    //             ind > 1 ? 
                    //             <>
                    //             <h4>{Object.keys(playerStats.statistics[index])[ind]}</h4>
                    //             {
                    //                 Object.entries(item).map((obj,index)=>{
                    //                     return(
                    //                         <div key={index}>
                    //                             {
                    //                                 Object.entries(obj).map((elem,index)=>{
                    //                                     return(
                    //                                         <p key={index}>
                    //                                             <span>{elem[0]}</span>
                    //                                             <span>{elem[1]}</span>
                    //                                         </p>
                    //                                     )
                                                        
                    //                                 })
                    //                             }
                                                
                                             
                    //                         </div>
                    //                     )
                    //                 })
                    //             }
                    //             </>
                    //             :null
                    //         }
                    //       </div>
                    //     )
                    
                    // })
                    // Object.keys(playerStats.statistics[index]).map((key,index)=>{
                    //     return(
                    //         <>
                    //             <p>{key}</p>
                    //             {
                    //                 playerStats.statistics[index][key].map((item,index)=>{
                    //                     return(
                    //                         <><span>{key}</span><span>{item}</span></>                                         
                    //                     )
                    //                 })
                    //             }
                    //         </>
                    //     )
                    // })
                    // :null
                }
            </div>
            
        </div>
        
     );
}

export default Player;