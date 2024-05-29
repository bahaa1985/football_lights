import { useState,useEffect,useRef } from "react";
import getEvents from '../Api/getEvents.js'
import '../styles/events.css'
import goal from '../images/goal.png'
import penalty from '../images/letter-p.png'
import own_goal from '../images/own-goal.png'
import missed_penalty from '../images/missed-penalty.png'
import yellow_card from'../images/yellow.png'
import red_card from '../images/red.png'
import VAR from '../images/var.png'
import substitute from '../images/substitute.png'

function Events(props){
    
    const fixture=props.fixture 
    
    const [events,setEvents]=useState([])  

    useEffect(()=>{
        getEvents(fixture).then((result)=>{
           setEvents( result.data.response )
        })        
    },[fixture])

    const GROUPED_EVENTS=events.reduce((group,elem)=>{
        const TIME=elem.time.elapsed;
        if(group[TIME]==null) group[TIME]=[];
        group[TIME].push(elem);
        return group;
    },[])   

    console.log("grouped events",GROUPED_EVENTS);
    const events_div=(player,assist,type,detail,index,team)=>{
        
    return(
            <div key={index} className="events-home">           
                <div>{
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
                        <div>
                            <img alt='' src={VAR}></img>
                            <div>{detail}</div>
                        </div>
                    :null
                }
                </div>
                            
                <div className="div-players">
                    <label className="label-palyer">{type==="subst" ? "Out: " + player: player}</label>
                    <br></br>
                    <label className="label-assist">{type==="subst" ? "In: " + assist: assist}</label>
                </div> 

                <img src={team.logo} alt={team.name} />           
            </div>)
    }

    let i=0;
    return(        
        <div className='events' >          
            {                
                
                GROUPED_EVENTS.map((events,index)=>{                    
                    return(                        
                        <div>
                             <span>{index}</span>
                            {
                            events.map((elem,index)=>{
                                return(
                                                            
                                    <div key={index} style={{width:'60%',margin:'auto'}}>
                                            {                                        
                                            events_div( elem.player.name,elem.assist.name,elem.type,elem.detail,i++,elem.team)                                            
                                            }                                      
                                    </div>                           
                                    )
                            })
                            }  
                                                                            
                            </div>
                        )})     
            }
        </div>
    )}
                        

export default Events