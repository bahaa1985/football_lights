import React, { useRef } from "react";
import getStatistics from "../api/getStatistics.js";
import '../styles/statistics.css'
import { useEffect,useState } from "react";

function Statistics(props){
    // const home_team=props.teams[0]
    // const away_team=props.teams[1]
    const fixture=props.fixture
    const [homeStatistics,setHomeStatistics]=useState([])
    const [awayStatistics,setAwayStatistics]=useState([])
    const progress_div_ref=useRef();
    
    let statistic_obj={
        "home":0,
        "away":0,
        "type":''
    }
    

    
    useEffect(()=>{
        getStatistics(fixture).then((result)=>{
            console.log("re",result);
            setHomeStatistics(result.data.response[0].statistics);
            setAwayStatistics(result.data.response[1].statistics);
        });                                      
        console.log(homeStatistics)
    },[fixture])

    // useEffect(()=>{
    //     getStatistics(fixture.then((result)=>{
    //         setAwayStatistics(result.data.response[1].statistics)
    //     });
    //     console.log('home effect!')
    // },[fixture,away_team])
  
       

    let statistics_arr=[];
    for(let i=0;i<17;i++){
        statistics_arr.push({
            'home':0,'away':0,'type':''
        })
    } 
    
    // console.log(statistics_arr)

    let total=0;

    return(
        <section style={{width:'90%',height: 'auto',margin:'auto',textAlign: 'center'}}>                              
            {homeStatistics.map((item,index)=>{
                statistics_arr[index].type=item.type;
                item.value===null? statistics_arr[index].home=0 :                
                statistics_arr[index].home=item.value;                
            })}
            {awayStatistics.map((item,index)=>{              
                item.value===null? statistics_arr[index].away=0 :
                statistics_arr[index].away=item.value; 
            })}
            
            {statistics_arr.map((item,index)=>{                                
                total=Number.parseInt(item.home)+Number.parseInt(item.away);             
                return(
                    <div key={index} style={{width:'100%',textAlign:'center'}}>
                        <div>{item.type}</div>
                        <div ref={progress_div_ref} style={{display: 'flex',justifyContent:'center',width:'100%'}}>
                            <span>{item.home}</span>
                            <div style={{width:'45%'}}>
                                <progress className="progress-home" max={total} value={Number.parseInt(item.home)}></progress>
                            </div>
                            <div style={{width:'45%'}}>
                                <progress className="progress-away" max={total} value={Number.parseInt(item.away)}></progress>
                            </div>
                            <span>{item.away}</span>
                        </div>
                    </div>
                )
            })}                                      
        </section>
    )
}

export default Statistics