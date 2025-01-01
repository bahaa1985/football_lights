import { useState,useEffect,useMemo,memo } from "react";
import getEvents from '../../Api/getEvents.js'
import '../../styles/events.css'
import goal from '../../images/goal.png'
import penalty from '../../images/letter-p.png'
import own_goal from '../../images/own-goal.png'
import missed_penalty from '../../images/missed-penalty.png'
import yellow_card from'../../images/yellow.png'
import red_card from '../../images/red.png'
import VAR from '../../images/var.png'
import substitute from '../../images/substitute.png'

function Events(props){
    
    const fixtureId = props.fixtureId; 
    const teams= props.teams;
    const [events,setEvents] = useState([])  

    useEffect(()=>{
        getEvents(fixtureId).then((result)=>{
            console.log("events are rendered");
           setEvents( result.data.response )
        })        
    },[])
    
    // console.log("grouped events",events);
    const events_div=(player,assist,type,detail,index,comments)=>{
        
    return(
            <div key={index} className="flex space-x-3 w-64">           
                <div className="w-12">{
                    type==='Goal'&& detail==='Normal Goal' ? 
                    <img alt='' src={goal}></img>:
                    type==='Goal'&& detail==='Penalty' ?
                    <img alt='' src={penalty}></img>:
                    type==='Goal'&& detail=== 'Own Goal' ?
                    <img alt='' src={own_goal}></img>:
                    type==='Goal'&& detail==='Missed penalty' ?
                    <img alt='' src={missed_penalty}></img>:
                    type==='Card'&& detail==='Yellow Card' ?
                    <img alt='' src={yellow_card}></img>:
                    type==='Card'&& detail==='Red Card' ?
                    <img alt='' src={red_card}></img>:
                    type==='subst'?
                    <img alt='' src={substitute}></img>:                    
                    type==='Var'?                        
                    <img alt='' src={VAR}></img>                         
                    :null
                }
                </div>
                            
                <div className="flex flex-col justify-center">
                    <label className="text-xl">{type==="subst" ? "Out: " + player: player}</label>
                    <label className="text-sm">{type==="subst" ? "In: " + assist: assist}</label>
                    {type==="Var"?<span>{detail}</span>: null}
                    {comments ? <span>{comments}</span> : null}
                </div>         
            </div>)
    }

    let i=0;
    return(        
        <div className='events relative top-20 left-[50%] -translate-x-[50%] w-[90%]' > 
            {                    
                events.map((elem,index)=>{
                    return(
                        <div className={`flex space-x-3 ${elem.team.id === teams.home.id ? "justify-start"  :"flex-row-reverse" } my-4 `} key={index}>
                            <span>{elem.time.elapsed}</span>
                            <div>
                            {                                        
                                events_div( elem.player.name,elem.assist.name,elem.type,elem.detail,i++,elem.comments)                                            
                            }  
                            </div>
                        </div>
                    )
                })                   
            }
        </div>
    )}
                        

export default Events