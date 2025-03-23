import { useState,useEffect,useMemo,memo } from "react";
import getEvents from '../../Api/getEvents.js'
import '../../styles/events.css'
import penalty from '../../icons/penalty.png';
import missed_penalty from '../../icons/missed_penalty.png'
import { faSoccerBall,faRightLeft } from "@fortawesome/free-solid-svg-icons";
import VAR from '../../icons/var.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Events(props){
    
    const fixtureId = props.fixtureId; 
    const teams= props.teams;
    const [events,setEvents] = useState([])  

    useMemo(()=>{
        getEvents(fixtureId).then((result)=>{
            console.log("events are rendered");
           setEvents( result.data.response )
        })        
    },[fixtureId])
    
    const events_div=(teamId,player,assist,type,detail,index,comments)=>{
        
    return(
            <div key={index} className={`flex ${teamId !== teams.home.id ? 'flex-row-reverse':null} items-center`}>           
                <div className="w-8 sm:w-12 px-2 sm:px-3">{
                    type==='Goal'&& detail==='Normal Goal' ? 
                    <FontAwesomeIcon icon={faSoccerBall} size='2x' className="text-xl sm:text-3xl" color="green"/>:
                    type==='Goal'&& detail==='Penalty' ?
                    <img alt='' src={penalty} className="w-8 h-8 sm:w-10 sm:h-10"/>:
                    type==='Goal'&& detail=== 'Own Goal' ?
                    <FontAwesomeIcon icon={faSoccerBall} size="2x" className="text-xl sm:text-3xl" color="red"/>:
                    type==='Goal'&& detail==='Missed penalty' ?
                    <img alt='' src={missed_penalty} className="sm:w-8 sm:h-8"/>:
                    type==='Card'&& detail==='Yellow Card' ?
                    <div className="w-4 h-6 sm:w-8 sm:h-12 bg-yellow-500"></div>:
                    type==='Card'&& detail==='Red Card' ?
                    <div className="w-4 h-6 sm:w-8 sm:h-12 bg-red-700"></div>:
                    type==='subst'?
                    <FontAwesomeIcon icon={faRightLeft} size='2x' className="text-xl sm:text-3xl"/>:                    
                    type==='Var'?                        
                    <img alt='' src={VAR} className="sm:w-8 sm:h-8"/>                         
                    :null
                }
                </div>
                            
                <div className="flex flex-col justify-center">
                    <span className="border-none text-lg sm:text-xl">{type==="subst" ? "Out: " + player: player}</span>
                    <span className="border-none text-sm sm:text-lg">{type==="subst" ? "In: " + assist: assist}</span>
                    {(type==="Var" || (type === "Goal" && detail === "Missed penalty")) ?<span className="border-none text-lg">{detail}</span>: null}
                    {comments ? <span className="border-none text-sm sm:text-lg">{comments}</span> : null}
                </div>         
            </div>)
    }

    let i=0;
    return(        
        <div className='events relative top-20 left-[50%] -translate-x-[50%] w-[90%] sm:w-[60%]' > 
            <p>Penalty icon is created by <a href="https://www.flaticon.com/free-icons/soccer" title="soccer icons">Soccer icons created by Freepik - Flaticon</a></p>
            <p>Var icon is created by <a href="https://www.flaticon.com/free-icons/football-referee" title="football referee icons">Football referee icons created by kosonicon - Flaticon</a></p>
            {                    
                events.map((elem,index)=>{
                    return(
                        <div className={`flex space-x-3 ${elem.team.id === teams.home.id ? "justify-start"  :"flex-row-reverse" } my-4 `} key={index}>
                            <span className="border-none text-bold">`{elem.time.elapsed}</span>
                            <div>
                            {                                        
                                events_div(elem.team.id, elem.player.name,elem.assist.name,elem.type,elem.detail,i++,elem.comments)                                            
                            }  
                            </div>
                        </div>
                    )
                })                   
            }
        </div>
    )}
                        

export default memo(Events)