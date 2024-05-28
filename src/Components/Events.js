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
    const teams=props.teams   
    
    const [events,setEvents]=useState([])  
    // const [teams,setteams]=useState([]);
    const event_div=useRef(HTMLElement);

    useEffect(()=>{
        getEvents(fixture).then((result)=>{
           setEvents( result.data.response )
          
        })        
    },[fixture])

    const eventsHome = events.filter((event)=>event.team.id===teams[0])
    const eventsAway = events.filter((event)=>event.team.id===teams[1])

    const GROUPED_EVENTS=events.reduce((group,elem)=>{
        const TIME=elem.time.elapsed;
        if(group[TIME]==null) group[TIME]=[];
        group[TIME].push(elem);
        return group;
    },[])   

    console.log("grouped events",GROUPED_EVENTS);
    const home_events_div=(player,assist,type,detail,index)=>{
        
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
            </div>)
    }

    const away_events_div=(player,assist,type,detail,index)=>{
        return(
            <div key={index} className="events-away">           
                <div className="div-players">
                    <label className="label-palyer">{type==="subst" ? "Out: " + player : player}</label><br></br>
                    <label className="label-assist">{type==="subst" ? "In: " + assist : assist}</label>
                </div>           
            
                <div>
                    {
                        type==='Goal'&& detail==='Normal Goal' ? 
                        <img alt=''src={goal}></img>:
                        type==='Goal'&& detail==='Penalty' ?
                        <img alt='' src={penalty}></img>:
                        type==='Goal'&& detail=== 'Own Goal' ?
                        <img alt='' src={own_goal}></img>:
                        type==='Goal'&& detail==='Missed Penalty' ?
                        <img alt=''src={missed_penalty}></img>:
                        type==='Card'&& detail==='Yellow Card' ?
                        <img alt=''src={yellow_card}></img>:
                        type==='Card'&& detail==='Red card' ?
                        <img alt=''src={red_card}></img>:
                        type==='subst'?
                        <img alt=''src={substitute}></img>:
                        type==='Var' ?
                            <div style={{display:'block'}}>
                                <div>
                                 <img alt='' src={VAR} title="var icons"></img>
                                </div>
                                <div>{detail}</div>
                            </div>:           
                        null
                    }
                </div> 

            </div>      
            )
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
                                                            
                                    <div key={index} style={{width:'90%',margin:'auto'}}>
                                            {                                        
                                            home_events_div( elem.player.name,elem.assist.name,elem.type,elem.detail,i++)                                            
                                            }                                             
                                    </div>                           
                                    )
                            })
                            }                                                     
                            </div>
                        )})
                            // <div ref={event_div} key={index} style={{display:'flex',justifyContent:'center',margin:'5px auto',width:'100%'}}>
                            //     {
                            //         event.map((event,index)=>{
                            //             return(
                            //             event.team.id===teams[0] && event.time.elapsed===index ? 
                            //             <div style={{width:'45%',float:'left'}}>
                            //             {                                        
                            //             home_events_div( event.player.name,event.assist.name,event.type,event.detail,i++)                                            
                            //             }
                            //             </div>
                            //             :
                            //             event.team.id===teams[1] && event.time.elapsed===index ? 
                            //             <div style={{width:'45%',float:'right'}}>
                            //             {                                        
                            //             away_events_div( event.player.name,event.assist.name,event.type,event.detail,i++)                                            
                            //             }
                            //             </div>
                            //             :null
                            //             )                                        
                            //         })
                            //         <span style={{width:'10%'}}>{index}</span>

                            //         parseInt(event[0].team.id)===teams[0] ?
                            //             <div style={{width:'45%',float:'right'}}>
                            //                 {
                            //                     event.map((event) => {                                        
                            //                         return(
                            //                             event.time.elapsed===index ? 
                            //                             home_events_div( event.player.name,event.assist.name,event.type,event.detail,i++):
                            //                             null
                            //                         )                                                                                                                                
                            //                     })
                            //                 }
                            //             </div>
                            //         :
                            //             <div style={{width:'45%',float:'left'}}>
                            //                 {
                            //                     event.map((event) => {                                                                                
                            //                         return(
                            //                             event.time.elapsed===index ? 
                            //                             away_events_div(event.player.name,event.assist.name,event.type,event.detail,i++):
                            //                             null
                            //                         )                                                                                        
                                                
                            //                     })
                            //                 }
                            //             </div> 
                                    
                            //     }
                                // <span style={{width:'10%'}}>{index}</span>
                            //     {
                            //         parseInt(event[0].team.id)===teams[1] ?
                            //         <div style={{width:'45%',float:'left'}}>
                            //             {
                            //                 event.map((event) => {                                                                                
                            //                     return(
                            //                         event.time.elapsed===index ? 
                            //                         away_events_div(event.player.name,event.assist.name,event.type,event.detail,i++):
                            //                         null
                            //                     )                                                                                        
                                            
                            //                 })
                            //             }
                            //         </div>                              
                            //         :null      
                                // }  
                            // </div>
                //     )
                // })
            }
        </div>
    )}
                        

export default Events